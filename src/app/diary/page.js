'use client';

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Header from '../components/Header';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



export default function DiaryPage() {

    const [entry, setEntry] = useState('');
    const [pastEntries, setPastEntries] = useState([]);

    // Fetch entries from db
    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await fetch('/api/diary');
            const result = await response.json();
            if (result.valid) {
                setPastEntries(result.entries);
            }
        } catch (error) {
            console.log("Error fetching entries:", error);
        }
    };

    // Submit diary entry to db
    const handleSubmit = async (event) => {
        console.log("Handling Submit");
        event.preventDefault();
        if (!entry) {return;}

        const payload = {
            data: entry.trim(),
            timestamp: new Date().toISOString(), // current timestamp in ISO format (YY-MM-DDTHH:mm:ss.sssZ)
          };

        await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
        
        // Refresh entries from database
        fetchEntries();
        
        console.log("Diary Entry Submitted: " + entry); //debug log
        setEntry('');
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#E9F1EC', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container maxWidth="md" sx={{ backgroundColor: '#FAFBF8', padding: 4, borderRadius: 2, mt: 2 }}>
                <Typography variant="h2" gutterBottom sx={{ fontSize: '3rem', mb: 4 }}>
                    Daily Entry
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="How are you feeling today?"
                        multiline
                        rows={6}
                        fullWidth
                        value={entry}
                        onChange={(e) => setEntry(e.target.value)} //updates the react state variable to keep data in sync
                        sx={{ 
                            '& .MuiInputBase-root': { fontSize: '1.25rem', padding: '16px' },
                            '& .MuiInputLabel-root': { fontSize: '1.1rem' }
                        }}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 3, py: 2, px: 4, fontSize: '1.2rem' }}>Submit</Button>
                </form>
                
                {/* Past Entries */}
                <div style={{ marginTop: '64px' }}>
                    <Typography variant="h2" gutterBottom sx={{ fontSize: '2.5rem', mb: 4 }}>
                        Past Entries
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            overflowX: 'auto',
                            paddingBottom: '16px',
                        }}
                        className="scrollbar-custom"
                    >
                        {pastEntries.map((pastEntry) => (
                            <Card
                                key={pastEntry._id}
                                sx={{
                                    minWidth: 300,
                                    borderRadius: '16px',
                                    border: '1px solid #ddd',
                                    boxShadow: 2,
                                    padding: 2,
                                }}
                            >
                                <CardContent sx={{ padding: '24px' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, fontSize: '1.1rem' }}>
                                        {pastEntry.data.length > 80 ? 
                                            pastEntry.data.substring(0, 80) + '...' : 
                                            pastEntry.data}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                                        {new Date(pastEntry.timestamp).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </Box>
    )
}