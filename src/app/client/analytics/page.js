'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useRequireAuth from '../hooks/useRequireAuth';

export default function page() {
    const isCheckingAuth = useRequireAuth();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/moodtracker/history", {
            credentials: "include",
        })
        .then(res => res.json())
        .then(resData => {
            if (resData.valid) {
                const entries = resData.data;

                const now = new Date();
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());

                const filtered = entries.filter(entry =>
                    new Date(entry.date) >= startOfWeek
                );

                const sorted = filtered.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );

                const formatted = sorted.map(entry => ({
                    day: new Date(entry.date).toLocaleDateString('en-IE', {
                        weekday: 'short'
                    }),
                    mental: entry.Question3 * 2,
                    physical: entry.Question2 * 2,
                    emotional: entry.Question1 * 2
                }));

                setData(formatted);
            }
        });
    }, []);

    if (isCheckingAuth) return null;

    // WEEKLY AVERAGES
    const avgMentalScore = data.length
        ? data.reduce((sum, d) => sum + d.mental, 0) / data.length
        : 0;

    const avgPhysicalScore = data.length
        ? data.reduce((sum, d) => sum + d.physical, 0) / data.length
        : 0;

    const avgEmotionalScore = data.length
        ? data.reduce((sum, d) => sum + d.emotional, 0) / data.length
        : 0;

    const finalScoreDisplay = data.length
        ? Math.round(((avgMentalScore + avgPhysicalScore + avgEmotionalScore - 6) / 24) * 100)
        : 0;

    return (
        <Box sx={{
            minHeight: '50vh',
            width: '100%',
            backgroundColor: '#E9F1EC',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />

            <Typography
                variant='h4'
                sx={{
                    mb: 3,
                    color: '#1F2937',
                    textAlign: 'center',
                    marginTop: 2
                }}
            >
                Weekly Results
            </Typography>

            {/* WEEKLY GRAPH */}
            <LineChart
                dataset={data}
                xAxis={[{ scaleType: "point", dataKey: "day" }]}
                series={[
                    { dataKey: "mental", label: "Mental", color: "#14b8a6" },
                    { dataKey: "physical", label: "Physical", color: "#60a5fa" },
                    { dataKey: "emotional", label: "Emotional", color: "#f87171" },
                ]}
                height={320}
            />

            {/* WEEKLY SCORE */}
            <Box sx={{
                background: 'white',
                padding: 3,
                borderRadius: 3,
                marginBottom: 3,
                textAlign: 'center'
            }}>
                <Typography variant='h6'>Weekly Wellness Score</Typography>
                <Typography variant='h3' sx={{ color: '#14b8a6', fontWeight: 700 }}>
                    {finalScoreDisplay}%
                </Typography>
            </Box>

            {/* WEEKLY AVERAGES */}
            <Typography variant='h6' sx={{ textAlign: 'center', paddingBottom: 2 }}>
                Weekly Averages
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
                <Box sx={{ p: 2, background: 'white', borderRadius: 2 }}>
                    🧠 Mental: {avgMentalScore.toFixed(1)}
                </Box>
                <Box sx={{ p: 2, background: 'white', borderRadius: 2 }}>
                    🏃 Physical: {avgPhysicalScore.toFixed(1)}
                </Box>
                <Box sx={{ p: 2, background: 'white', borderRadius: 2 }}>
                    😪 Emotional: {avgEmotionalScore.toFixed(1)}
                </Box>
            </Box>
        </Box>
    );
}