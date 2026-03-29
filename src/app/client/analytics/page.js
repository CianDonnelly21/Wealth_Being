'use client';

import Header from '../components/Header';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useRequireAuth from '../hooks/useRequireAuth';

const data = [
    { day: 'Mon', mental: 6, physical: 7, emotional: 4 },
    { day: 'Tue', mental: 7, physical: 6, emotional: 5 },
    { day: 'Wed', mental: 5, physical: 5, emotional: 6 },
    { day: 'Thu', mental: 8, physical: 7, emotional: 3 },
    { day: 'Fri', mental: 6, physical: 8, emotional: 4 },
    { day: 'Sat', mental: 7, physical: 9, emotional: 2 },
    { day: 'Sun', mental: 6, physical: 7, emotional: 3 }
];

export default function page(){
    const isCheckingAuth = useRequireAuth();

    if (isCheckingAuth) {
        return null;
    }

    const avgMentalScore =
    data.reduce((sum, d) => sum + d.mental, 0) / data.length;

    const avgPhysicalScore =
    data.reduce((sum, d) => sum + d.physical, 0) / data.length;

    const avgEmotionalScore =
    data.reduce((sum, d) => sum + d.emotional, 0) / data.length;

    const finalScoreCalculation =
        ((avgMentalScore + avgPhysicalScore + avgEmotionalScore) / 3) * 10

    const finalScoreDisplay =
        Math.round(finalScoreCalculation);

    return(
        <Box sx = {{
            minHeight: '50vh',
            width: '100%',
            backgroundColor: '#E9F1EC',
            display:'flex',
            flexDirection: 'column',
            }}
        >
            <Header/>

            {/* Analytics Graph */}
            <Typography
                variant = 'h4'
                sx = {{
                    mb: 3,
                    color: '#1F2937',
                    textAlign: 'center',
                    marginTop: 2
                }}
            >
                Your Results
            </Typography>

            <LineChart sx = {{
                marginRight: 8,
            }}
                dataset = {data}
                xAxis = {[{ scaleType: "point", dataKey: "day" }]}
                series = {[
                    {
                        dataKey: "mental",
                        label: "Mental",
                        color: "#14b8a6",
                        curve: "monotone",
                        showMark: false
                    },
                    {
                        dataKey: "physical",
                        label: "Physical",
                        color: "#60a5fa",
                        curve: "monotone",
                        showMark: false
                    },
                    {
                        dataKey: "emotional",
                        label: "Emotional",
                        color: "#f87171",
                        curve: "monotone",
                        showMark: false
                    },
                ]}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'top', horizontal: 'middle' },
                        sx: {
                            justifyContent: 'center',
                            width: '50%',
                        },
                    },
                }}
                height = {320}
                grid = {{horizontal: true}}
                margin = {{top: 20, bottom: 40, left: 40, right: 20}}
            />

            <Box sx = {{
                    background: 'white',
                    padding: 3,
                    borderRadius: 3,
                    marginBottom: 3,
                    textAlign: 'center'
                }}
            >
                <Typography variant = 'h6'>Wellness Score</Typography>
                <Typography variant = 'h3' sx={{ color: '#14b8a6', fontWeight: 700 }}>
                    {finalScoreDisplay}%
                </Typography>
            </Box>

            <Typography variant = 'h6' sx = {{textAlign: 'center', paddingBottom: 2}}>Overall Results</Typography>
            <Box sx = {{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
            <Box sx = {{ p: 2, background: 'white', borderRadius: 2 }}>🧠 Mental: {avgMentalScore.toFixed(1)}</Box>
            <Box sx = {{ p: 2, background: 'white', borderRadius: 2 }}>🏃‍➡️ Physical: {avgPhysicalScore.toFixed(1)}</Box>
            <Box sx = {{ p: 2, background: 'white', borderRadius: 2 }}>😪 Emotional: {avgEmotionalScore.toFixed(1)}</Box>
            </Box>
        </Box>
    );
}