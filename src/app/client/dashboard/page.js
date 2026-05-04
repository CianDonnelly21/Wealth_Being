'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { pacifico } from '../fonts/fonts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Header from '../components/Header';
import Grid from '@mui/material/Grid';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import InsightsIcon from '@mui/icons-material/Insights';
import MoodIcon from '@mui/icons-material/Mood';
import { Insights } from '@mui/icons-material';
import useRequireAuth from '../hooks/useRequireAuth';
import { useState, useEffect } from 'react';



export default function Page() {
  const isCheckingAuth = useRequireAuth();


    const [user, setUsersName] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/session/me', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("SESSION DATA:", data);
        if (data.fullName) {
          setUsersName(data.fullName);
        }
      });

  }, []);

  

  if (isCheckingAuth) {
    return null;
  }

  const positiveQuotes = [
    {text: "The greatest wealth is health."},
    {text: "Life is a journey."},
    {text:"Everyday is a new beginning."},
    {text:"The happiness of your life depends on the quality of your thoughts."},
    {text:"The only way to do great work is to love what you do."},
    {text:"You don't have to see the whole staircase, just take the first step."}
  ]

  


  var daily = 86400000;
  var minute = 60000; {/*debug*/}

  const cardStyle = {
    borderRadius: 3,
    border: '3px solid #E65100',
    outline: '1.5px solid #E65100',
    boxShadow: 'none',
    overflow: 'hidden',
    backgroundColor: '#fff'
  }

  const iconBoxStyle = (bg) =>({
    width: 50,
    height: 50,
    borderRadius: 3,
    backgroundColor: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });

  const quoteOfTheDay = positiveQuotes[Math.floor(Date.now() / minute) % positiveQuotes.length];
  return (

      <Box sx={{minHeight: '100vh', backgroundColor: '#FDF3EC', display:'flex', flexDirection: 'column' }}>
        <Header />

      <Box sx={{backgroundColor: '#fff', borderBottom: '1px solid #E65100'}}> 
        <Typography variant="h4" sx={{color: '#883203', textAlign: 'left', marginLeft: 5, marginTop: 4, marginBottom: 4}}>
          How are you feeling today, {user}? 
        </Typography>
        </Box>

        <Container maxWidth="lg" sx={{ backgroundColor: '#FDF3EC', padding: 4, borderRadius: 2, mt: 2 }}>
          <Typography component="h1" variant="h3" sx={{ fontsize: '12px',color: '#883203', textAlign: 'center', mb: 3, fontFamily: "Playwrite IT Moderna",}} className={`${pacifico.className} font-pacifico`}>"{quoteOfTheDay.text}"</Typography>

      <Grid container spacing={3} justifyContent="center">
      {/* diary*/}

      <Grid item xs={12} md={6}>
        <Card sx={{cardStyle}}>
          <CardActionArea component={Link} href="/client/diary">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 2,
            borderBottom: '1px solid #F5E6D8'
          }}>
            <Box sx={iconBoxStyle('#E65100')}>
              <ArticleIcon sx={{ fontSize: 26, color: '#fff' }} />
            </Box>
            <Box>
            <Typography sx={{ fontSize: '20px', color: '#3D1A06'}}>Diary</Typography>
            <Typography sx={{ fontSize: '15px', color: '#8B3A1A'}}>Daily Journal</Typography>
            </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#8B3A1A', fontsize: '13px', flex: 1, marginRight: 8.5 }}>
                Write about how you feel and what you did today
              </Typography>
              <Box sx={{ width: 30, heigh: 30, borderRadius: '50%', backgroundColor: '#FDF0E6', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#E65100', fontSize: '15px'
              }} >→
              </Box>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>

      {/* chatbot*/}
      <Grid item xs={12} md={6}>
        <Card sx={{ cardStyle }}>
        <CardActionArea component={Link} href="/client/wibble">
         <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 2,
            borderBottom: '1px solid #F5E6D8'
          }}>
            <Box sx={iconBoxStyle('#C8430D')}>
          <ChatIcon sx={{ fontSize: 26, color: '#fff' }} />
        </Box>

        <Box>
           <Typography sx={{ fontSize: '20px', color: '#3D1A06'}}>Wibble</Typography>
          <Typography sx={{ fontSize: '15px', color: '#8B3A1A'}}>Supportive ChatBot</Typography>
          </Box>
          </Box>
           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#8B3A1A', fontsize: '13px', flex: 1, marginRight: 25}}>
                Talk to Wibble about your feelings!
              </Typography>
              <Box sx={{ width: 30, heigh: 30, borderRadius: '50%', backgroundColor: '#FDF0E6', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#E65100', fontSize: '15px'
              }} >→
              </Box>
              </Box>
        </CardActionArea>
        </Card>
      </Grid>

    {/* analytics*/}      
    <Grid item xs={12} md={6}>
      <Card sx={{ cardStyle }}>
        <CardActionArea component={Link} href="/client/analytics">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 2,
            borderBottom: '1px solid #F5E6D8'
          }}>
             <Box sx={iconBoxStyle('#a23409')}>
          <InsightsIcon sx={{ fontSize: 25, color: '#fff' }} />
          </Box>
        
        <Box>
        <Typography sx={{  fontSize: '20px', color: '#3D1A06'}}>Analytics</Typography>
        <Typography sx={{ fontSize: '15px', color: '#8B3A1A'}}>View your health progress</Typography>
        </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#8B3A1A', fontsize: '13px', flex: 1, marginRight: 2.3}}>
                View your tracked mood on a graph over the current week
              </Typography>
              <Box sx={{ width: 30, heigh: 30, borderRadius: '50%', backgroundColor: '#FDF0E6', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#E65100', fontSize: '15px'
              }} >→
              </Box>
              </Box>
        </CardActionArea>
        </Card>
      </Grid>

    {/* moodtracker*/}
    <Grid item xs={12} md={6}>
       <Card sx={{ cardStyle }}>
        <CardActionArea component={Link} href="/client/moodtracker">
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 2,
            borderBottom: '1px solid #F5E6D8'
          }}>
           <Box sx={iconBoxStyle('#78290a')}>
          <MoodIcon sx={{ fontSize: 25, color: '#fff' }} />
        </Box>

        <Box>
        <Typography sx={{ fontSize: '20px', color: '#3D1A06'}}>Mood Tracker</Typography>
        <Typography sx={{ fontSize: '15px', color: '#8B3A1A'}}>Document your mood today</Typography>
        </Box>
        </Box>
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#8B3A1A', fontsize: '13px', flex: 1, marginRight:25}}>
                Rate your mood on a 1-5 scale 
              </Typography>
              <Box sx={{ width: 30, heigh: 30, borderRadius: '50%', backgroundColor: '#FDF0E6', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#E65100', fontSize: '15px'
              }} >→
              </Box>
              </Box>
              </CardActionArea>
        </Card>
      </Grid>
      </Grid>
  </Container>
  </Box>

  )
}