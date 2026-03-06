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


export default function Page() {
  return (

      <Box sx={{minHeight: '100vh', backgroundColor: '#E9F1EC', display:'flex', flexDirection: 'column' }}>
        <Header />
        <Container maxWidth="lg" sx={{ backgroundColor: '#FAFBF8', padding: 4, borderRadius: 2, mt: 2 }}>
          <Typography component="h1" variant="h3" sx={{ color: '#5fa3a6', textAlign: 'center', mb: 3 }} className={`${pacifico.className} font-pacifico`}>Quote of the Day</Typography>

      <Grid container spacing={3} justifyContent="center">

      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 400, margin: 'auto', borderRadius: 2 }}>
          <CardActionArea>
          <CardMedia
          component="img"
          height="250"
          image="/images/diaryIcon.jpeg"
          alt="diary icon"
          />
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

      <Grid item xs={12} md={6}>
        <Card sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image="/images/chatbotIcon.jpeg"
            alt="chatbot icon"
          />
        <CardContent sx={{ color: '#5FA3A6'}}>
        <Typography gutterBottom variant="h5" component="div">Chatbot</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Talk to our supportive chatbot and get feedback to improve your experience.</Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href="/chatbot" >
          <Button size="small" sx={{ color: '#5FA3A6', fontWeight: 'bold'}}>
            Visit
          </Button>
          </Link>
          </CardActions>
        </Card>
      </Grid>


    <Grid item xs={12} md={6}>
      <Card sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image="/images/goalsIcon.jpeg"
            alt="goals icon"
          />
        <CardContent sx={{ color: '#5FA3A6'}}>
        <Typography gutterBottom variant="h5" component="div">Analytics</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>View a graph of your feelings overtime to see how you are progressing.</Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href="/analytics" >
          <Button size="small" sx={{ color: '#5FA3A6', fontWeight: 'bold'}}>
            Visit
          </Button>
          </Link>
          </CardActions>
        </Card>
      </Grid>

    <Grid item xs={12} md={6}>
      <Card sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image="/images/MoodTrackerIcn.jpeg"
            alt="mood tracker icon"
          />
        <CardContent sx={{ color: '#5FA3A6'}}>
        <Typography gutterBottom variant="h5" component="div">Mood Tracker</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Document your mood on a scale of 1 - 5 and choose your mood to best represent how you felt today. </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href="/moodTracker" >
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