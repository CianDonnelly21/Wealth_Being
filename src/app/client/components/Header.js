'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MoodIcon from '@mui/icons-material/Mood';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';



import { pacifico } from '../fonts/fonts';

export default function Header() {

   const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const handleLogout = async () => {
      try {
        await fetch('/server/logout', {
          method: 'POST',
          credentials: 'include',
        });
      } finally {
        window.location.href = '/client/login';
      }
    };

    const navLinks = [
      {text: 'Home', href: '/client/dashboard'},
      {text: 'Diary', href: '/client/diary'},
      {text: 'Mood Tracker', href: '/client/moodtracker'},
      {text: 'Analytics', href: '/client/analytics'}
    ]

    const DrawerList = (
    <Box sx={{ width: 175 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navLinks.map(({ text, href }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={href}>
              <ListItemText primary={text} primaryTypographyProps={{ sx: { color: '#E65100', fontSize: 20 } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
    )

  return (
    
    
    <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1, minHeight: '80px' }}>
      <Toolbar sx={{ minHeight: '80px !important', padding: '0 24px' }}>

        <Button onClick={toggleDrawer(true)}>
          <DensityMediumIcon sx={{fontSize: 35, color: '#E65100'}}></DensityMediumIcon>
          </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        </Drawer>

        {/* logo */}
        <Typography variant="h3" className={`${pacifico.className} font-pacifico`} sx={{ flexGrow: 1, color: '#E65100', fontFamily: 'Pacifico, cursive', fontSize: '2.5rem' }}>
          <Box component="span" sx={{color: '#E65100'}}>
          Wealth
          </Box>
          
          <Box component="span" sx={{color: '#883203'}}>Being</Box>
        </Typography>

        {/* icons */}
        <Box>
          <IconButton href="/client/dashboard" sx={{ padding: '12px', margin: '0 8px' }}>
            <HomeIcon sx={{fontSize: 40, color: '#E65100'}}></HomeIcon>
          </IconButton>
          <Button onClick={handleLogout} sx={{ color: '#E65100', fontWeight: 'bold' }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

  );
}