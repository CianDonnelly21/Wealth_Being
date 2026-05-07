'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useRequireAuth from '../hooks/useRequireAuth';

export default function page() {
    const isCheckingAuth = useRequireAuth(); // Checks if user has a valid session

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

                const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

                const formatted = weekDays.map(day => {
                const entry = sorted.find(e =>
                    new Date(e.date).toLocaleDateString('en-IE', {
                        weekday: 'short'
                    }) === day
                );

                const formatted = weekDays.map(day => {
                    const entry = sorted.find(e =>
                        new Date(e.date).toLocaleDateString('en-IE', {
                            weekday: 'short'
                        }) === day
                    );

                return {
                    day,
                    mental: entry && entry.Question3 * 2,
                    physical: entry && entry.Question2 * 2,
                    emotional: entry && entry.Question1 * 2,

                    total: entry && (
                        entry.Question1 +
                        entry.Question2 +
                        entry.Question3 +
                        entry.Question4 +
                        entry.Question5
                    ) * 4
                };
            });

            setData(formatted);
            }
        });
    }, []);

    if (isCheckingAuth) return null; // While checking user logged in display nothing

    // WEEKLY AVERAGES
    let avgMentalScore = 0;
    let avgPhysicalScore = 0;
    let avgEmotionalScore = 0;

    if (data.length > 0) {
        avgMentalScore =
            data.reduce((sum, d) => sum + d.mental, 0) / data.length;

        avgPhysicalScore =
            data.reduce((sum, d) => sum + d.physical, 0) / data.length;

        avgEmotionalScore =
            data.reduce((sum, d) => sum + d.emotional, 0) / data.length;
    }

    const finalScoreDisplay = Math.round(data.reduce((sum, d) => sum + d.total, 0) / data.length);

    return (
        <Box sx={{
            minHeight: '50vh',
            width: '100%',
            backgroundColor: '#FFF6F2',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Header />

            <Typography
                variant='h4'
                sx={{
                    mb: 3,
                    color: '#8A4B2E',
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
                    { dataKey: "mental", label: "Mental", color: "#E65100" },
                    { dataKey: "physical", label: "Physical", color: "#C96A34" },
                    { dataKey: "emotional", label: "Emotional", color: "#8A4B2E" },
                ]}
                height={320}
            />

            {/* WEEKLY SCORE */}
            <Box sx={{
                background: '#FFF8F6',
                padding: 3,
                borderRadius: 3,
                marginBottom: 3,
                textAlign: 'center',
                border: '1px solid #F3D7CC'
            }}>
                <Typography variant='h6' sx={{ color: '#8A4B2E' }}>Weekly Wellness Score</Typography>
                <Typography variant='h3' sx={{ color: '#E65100', fontWeight: 700 }}>
                    {finalScoreDisplay}%
                </Typography>
            </Box>

            {/* WEEKLY AVERAGES */}
            <Typography variant='h6' sx={{ textAlign: 'center', paddingBottom: 2, color: '#8A4B2E' }}>
                Weekly Averages
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
                <Box sx={{ p: 2, background: '#FFF8F6', borderRadius: 2, border: '1px solid #F3D7CC', color: '#5A4238' }}>
                    🧠 Mental: {avgMentalScore.toFixed(1)}
                </Box>
                <Box sx={{ p: 2, background: '#FFF8F6', borderRadius: 2, border: '1px solid #F3D7CC', color: '#5A4238' }}>
                    🏃 Physical: {avgPhysicalScore.toFixed(1)}
                </Box>
                <Box sx={{ p: 2, background: '#FFF8F6', borderRadius: 2, border: '1px solid #F3D7CC', color: '#5A4238' }}>
                    😪 Emotional: {avgEmotionalScore.toFixed(1)}
                </Box>
            </Box>
        </Box>
    );
}