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



export default function Page() {
  const isCheckingAuth = useRequireAuth();

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

  const quoteOfTheDay = positiveQuotes[Math.floor(Date.now() / minute) % positiveQuotes.length];
  return (

      <Box sx={{minHeight: '100vh', backgroundColor: '#E9F1EC', display:'flex', flexDirection: 'column' }}>
        <Header />
        <Container maxWidth="lg" sx={{ backgroundColor: '#FAFBF8', padding: 4, borderRadius: 2, mt: 2 }}>
          <Typography component="h1" variant="h3" sx={{ color: '#5fa3a6', textAlign: 'center', mb: 3 }} className={`${pacifico.className} font-pacifico`}>"{quoteOfTheDay.text}"</Typography>

      <Grid container spacing={3} justifyContent="center">
      {/* diary*/}
      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 400, margin: 'auto', borderRadius: 2 }}>
          <CardActionArea>
          <Box sx={{
            height: 150,
            backgroundColor: '#E9F1EC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ArticleIcon sx={{ fontSize: 80, color: '#5FA3A6' }} />
          </Box>
          <CardContent sx={{ color: '#5FA3A6'} }>
            <Typography gutterBottom variant="h5" component="div">Diary</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Write down your thoughts and how you were feeling throughout your day today.</Typography>
          </CardContent>
          </CardActionArea>
          <CardActions>
            <Link href="/client/diary" >
            <Button size="small" sx={{ color: '#5FA3A6', fontWeight: 'bold'}}>
              Visit
            </Button>
            </Link>
            </CardActions>
        </Card>
      </Grid>
      {/* chatbot*/}
      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardActionArea>
         <Box sx={{
          height: 150,
          backgroundColor: '#E9F1EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
          }}>
          <ChatIcon sx={{ fontSize: 80, color: '#5FA3A6' }} />
        </Box>
        <CardContent sx={{ color: '#5FA3A6'}}>
        <Typography gutterBottom variant="h5" component="div">Chatbot</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Talk to our supportive chatbot and get feedback to improve your experience.</Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href="/client/chatbot" >
          <Button size="small" sx={{ color: '#5FA3A6', fontWeight: 'bold'}}>
            Visit
          </Button>
          </Link>
          </CardActions>
        </Card>
      </Grid>

    {/* analytics*/}      
    <Grid item xs={12} md={6}>
      <Card sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardActionArea>
          <Box sx={{
          height: 150,
          backgroundColor: '#E9F1EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
          }}>
          <InsightsIcon sx={{ fontSize: 80, color: '#5FA3A6' }} />
        </Box>
        <CardContent sx={{ color: '#5FA3A6'}}>
        <Typography gutterBottom variant="h5" component="div">Analytics</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>View a graph of your feelings overtime to see how you are progressing.</Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href="/client/analytics" >
          <Button size="small" sx={{ color: '#5FA3A6', fontWeight: 'bold'}}>
            Visit
          </Button>
          </Link>
          </CardActions>
        </Card>
      </Grid>

    {/* moodtracker*/}
    <Grid item xs={12} md={6}>
      <Card sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardActionArea>
          <Box sx={{
          height: 150,
          backgroundColor: '#E9F1EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <MoodIcon sx={{ fontSize: 80, color: '#5FA3A6' }} />
        </Box>
        <CardContent sx={{ color: '#5FA3A6'}}>
        <Typography gutterBottom variant="h5" component="div">Mood Tracker</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Document your mood on a scale of 1 - 5 and choose your mood to best represent how you felt today. </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href="/client/moodtracker" >
          <Button size="small" sx={{ color: '#5FA3A6', fontWeight: 'bold'}}>
            Visit
          </Button>
          </Link>
          </CardActions>
        </Card>
      </Grid>
      </Grid>
  </Container>
  </Box>

  )
}