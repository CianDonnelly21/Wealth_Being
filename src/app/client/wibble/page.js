'use client';

import { useRef, useState } from 'react';
import Header from '../components/Header';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import useRequireAuth from '../hooks/useRequireAuth';

export default function WibblePage() {
    const isCheckingAuth = useRequireAuth();
        const [draft, setDraft] = useState('');
        const [isSending, setIsSending] = useState(false); // shows loading while waiting for backend response
        const [messages, setMessages] = useState([
            {
                role: 'assistant',
                text: 'Hi, I am Wibble. Tell me what is on your mind today.'
            }
        ]);
        const endOfMessagesRef = useRef(null);

        const scrollToBottom = () => {
            setTimeout(() => {
                if (endOfMessagesRef.current) {
                    endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        };

        const handleSend = async (event) => {
            event.preventDefault();

            const trimmed = draft.trim();

            // prevent invalid data from being sent or messages sent twice
            if (!trimmed || isSending) {
                return;
            }

            const userMessage = { role: 'user', text: trimmed };
            const nextMessages = [...messages, userMessage]; // copy previous messages array and add user message
            setMessages(nextMessages);
            setDraft('');
            setIsSending(true);
            scrollToBottom();

            try {
                const response = await fetch('/server/wibble/chat', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ messages: nextMessages })
                });

                const result = await response.json();

                if (!response.ok || !result.valid) {
                    throw new Error(result?.error || `Unable to get AI response (${response.status})`);
                }
                // add assistant response to previous messages array
                setMessages((prev) => [...prev, { role: 'assistant', text: result.reply }]);
            } catch (error) {
                console.error('Wibble chat error:', error);
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        text: 'I could not reach the AI service right now. Please try again in a moment.'
                    }
                ]);
            } finally {
                setIsSending(false);
                scrollToBottom();
            }
        };

    if (isCheckingAuth) {
        return null;
    }

        return (
            <Box sx={{ minHeight: '100vh', backgroundColor: '#E9F1EC', display: 'flex', flexDirection: 'column' }}>
        <Header />
                <Container maxWidth="md" sx={{ mt: 2, mb: 3 }}>
                    <Paper elevation={0} sx={{ backgroundColor: '#FAFBF8', borderRadius: 2, p: 3, border: '1px solid #D8E8DF' }}>
                        <Typography variant="h4" sx={{ color: '#5FA3A6', fontWeight: 700, mb: 2 }}>
                            Talk To Wibble
                        </Typography>

                        <Paper
                            variant="outlined"
                            sx={{
                                height: { xs: 420, md: 500 },
                                overflowY: 'auto',
                                borderColor: '#D8E8DF',
                                borderRadius: 2,
                                p: 2,
                                bgcolor: '#FFFFFF',
                                mb: 2
                            }}
                        >
                            <Stack spacing={2}>
                                {/* map to render each message */}
                                {messages.map((message, index) => {
                                    const isUser = message.role === 'user';

                                    return (
                                        <Stack
                                            key={`${message.role}-${index}`}
                                            direction="row"
                                            spacing={1.25}
                                            sx={{ justifyContent: isUser ? 'flex-end' : 'flex-start', alignItems: 'flex-end' }} // align messages to right for user messages and left for wibble messages
                                        >
                                            {/* avatar for wibble messages */}
                                            {!isUser && (
                                                <Avatar sx={{ bgcolor: '#5FA3A6', width: 34, height: 34 }}>
                                                    <SmartToyRoundedIcon fontSize="small" />
                                                </Avatar>
                                            )}

                                            <Box
                                                sx={{
                                                    maxWidth: { xs: '84%', md: '72%' },
                                                    px: 1.5,
                                                    py: 1.2,
                                                    borderRadius: 2,
                                                    bgcolor: isUser ? '#5FA3A6' : '#E9F1EC', // set background color based on message role i.e. user or wibble
                                                    color: isUser ? '#FFFFFF' : '#294640'
                                                }}
                                            >
                                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                                    {message.text}
                                                </Typography>
                                            </Box>

                                            {/* avatar for user messages */}
                                            {isUser && (
                                                <Avatar sx={{ bgcolor: '#79B7BA', width: 34, height: 34 }}>
                                                    <PersonRoundedIcon fontSize="small" />
                                                </Avatar>
                                            )}
                                        </Stack>
                                    );
                                })}
                                {isSending && (
                                    <Stack direction="row" spacing={1.25} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: '#5FA3A6', width: 34, height: 34 }}>
                                            <SmartToyRoundedIcon fontSize="small" />
                                        </Avatar>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1.2, borderRadius: 2, bgcolor: '#E9F1EC', color: '#294640' }}>
                                            <CircularProgress size={16} sx={{ color: '#5FA3A6' }} />
                                            <Typography variant="body2">Wibble is typing...</Typography> 
                                        </Box>
                                    </Stack>
                                )}
                                <div ref={endOfMessagesRef} />
                            </Stack>
                        </Paper>

                        {/*container for user interaction*/}
                        <Box component="form" onSubmit={handleSend} sx={{ display: 'flex', gap: 1 }}>
                            {/* text field for user input */}
                            <TextField
                                fullWidth
                                placeholder="Type your message..."
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                disabled={isSending}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#FFFFFF'
                                    }
                                }}
                            />
                            {/* send button */}
                            <IconButton
                                type="submit"
                                disabled={!draft.trim() || isSending}
                                sx={{
                                    bgcolor: '#5FA3A6',
                                    color: '#FFFFFF',
                                    width: 52,
                                    height: 52,
                                    '&:hover': { bgcolor: '#4E8F92' },
                                    '&.Mui-disabled': { bgcolor: '#B7CFCA', color: '#EDF4F1' }
                                }}
                                aria-label="Send message"
                            >
                                <SendRoundedIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        );
}