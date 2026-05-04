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
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import useRequireAuth from '../hooks/useRequireAuth';



export default function DiaryPage() {
    const isCheckingAuth = useRequireAuth();

    const [entry, setEntry] = useState('');
    const [pastEntries, setPastEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Fetch entries from db
    useEffect(() => {
        if (isCheckingAuth) {
            return;
        }
        fetchEntries();
    }, [isCheckingAuth]);

    const fetchEntries = async () => {
        try {
            const response = await fetch('/server/diary/entries');
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

        await fetch('/server/diary/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
        
        // Refresh entries from database
        fetchEntries();
        
        console.log("Diary Entry Submitted: " + entry); //debug log
        setEntry('');
    }

    if (isCheckingAuth) {
        return null;
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF6F2', display: 'flex', flexDirection: 'column', pb: 6 }}>
            <Header />
            <Container maxWidth="md" sx={{ backgroundColor: '#fffcf7', padding: 4, borderRadius: 3, mt: 3, border: '1px solid #E65100' }}>

                <Box sx={{ mb: 1 }}>
                    <Typography variant="h4" sx={{ color: '#883203', fontSize: '1.8rem', fontWeight: 600 }}>
                        Daily Entry
                    </Typography>
                </Box>

                <Typography sx={{ color: '#883203', mb: 2, fontSize: 20}}>How are you feeling today?</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        value={entry}
                        placeholder="Write your thoughts here..."
                        onChange={(e) => setEntry(e.target.value)} // updates the react state with the current value of the text field
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            '& .MuiInputBase-root': { fontSize: '1rem', padding: '12px' },
                            border: '1px solid #EAD9D2'
                        }}
                    />

                    <Button type="submit" variant="outlined" sx={{ mt: 3, py: 1, px: 3, borderRadius: 2, textTransform: 'none', borderColor: '#E2C9BF', color: '#fff', backgroundColor: '#E65100' }}>Submit Entry</Button>
                </form>

                {/* Past entries */}
                <Box sx={{ mt: 6 }}>
                    <Typography sx={{ color: '#883203', fontSize: '1.5rem', fontWeight: 600, mb: 3 }}>Past Entries</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {pastEntries.length === 0 && (
                            <Typography color="text.secondary">No entries yet.</Typography>
                        )}

                        {pastEntries.map((pastEntry) => (
                            <Box key={pastEntry._id} onClick={() => setSelectedEntry(pastEntry)} sx={{ border: '1px solid #F1D7D0', borderRadius: 2, backgroundColor: '#FFF', p: 2, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { backgroundColor: '#FFF2ED', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' } }}> {/*hover effect for past entries to show clickable*/}
                                <Typography sx={{ color: '#E65100', fontSize: '0.85rem', fontWeight: 700 }}>{new Date(pastEntry.timestamp).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
                                <Typography sx={{ mt: 1, color: '#883203' }}>{pastEntry.data.length > 120 ? pastEntry.data.substring(0, 120) + '...' : pastEntry.data}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>

            {/* modal for viewing full entry */}
            <Modal open={!!selectedEntry} onClose={() => setSelectedEntry(null)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ backgroundColor: '#FFF8F6', borderRadius: 3, border: '1px solid #F3D7CC', padding: 4, maxWidth: 600, width: '90%', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}>
                    <IconButton onClick={() => setSelectedEntry(null)} sx={{ position: 'absolute', top: 8, right: 8, color: '#8A4B2E' }}>
                        <CloseIcon />
                    </IconButton>
                    {selectedEntry && (
                        <Box>
                            <Typography sx={{ color: '#E65100', fontSize: '0.85rem', fontWeight: 700, mb: 2 }}>{new Date(selectedEntry.timestamp).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
                            <Typography sx={{ color: '#5A4238', fontSize: '1rem', lineHeight: 1.6 }}>{selectedEntry.data}</Typography>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    )
}