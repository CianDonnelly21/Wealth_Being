'use client';

import Header from '../components/Header';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useRequireAuth from '../hooks/useRequireAuth';


export default function page() {
    const isCheckingAuth = useRequireAuth();

    if (isCheckingAuth) {
        return null;
    }

    return(
          <Box sx={{minHeight: '100vh', backgroundColor: '#E9F1EC', display:'flex', flexDirection: 'column' }}>
        <Header />
        </Box>

    )
 
}