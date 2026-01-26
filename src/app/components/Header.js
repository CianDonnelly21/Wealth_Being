'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { pacifico } from '../fonts/fonts';

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1, minHeight: '80px' }}>
      <Toolbar sx={{ minHeight: '80px !important', padding: '0 24px' }}>
        <Typography variant="h3" className={`${pacifico.className} font-pacifico`} sx={{ flexGrow: 1, color: '#5fa3a6', fontFamily: 'Pacifico, cursive', fontSize: '2.5rem' }}>
          WealthBeing 
        </Typography>
        <Box>
          <IconButton href="/" sx={{ padding: '12px', margin: '0 8px' }}>
            <Image src="/images/icons/homeIcon.png" alt="Home" width={48} height={48} />
          </IconButton>
          <IconButton href="/stats" sx={{ padding: '12px', margin: '0 8px' }}>
            <Image src="/images/icons/analyticsIcon.png" alt="Stats" width={48} height={48} />
          </IconButton>
          <IconButton href="/mood" sx={{ padding: '12px', margin: '0 8px' }}>
            <Image src="/images/icons/moodIcon.png" alt="Mood" width={48} height={48} />
          </IconButton>
          <IconButton href="/diary" sx={{ padding: '12px', margin: '0 8px' }}>
            <Image src="/images/icons/diaryIcon.png" alt="Diary" width={48} height={48} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}