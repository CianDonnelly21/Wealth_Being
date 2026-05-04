"use client";


import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import useRequireAuth from '../hooks/useRequireAuth';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    borderRadius: '12px'
  }),
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

// icons for rating
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize: 40 }} />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" sx={{ fontSize: 40 }} />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" sx={{ fontSize: 40 }} />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" sx={{ fontSize: 40 }} />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" sx={{ fontSize: 40 }} />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


export default function page() {
  const isCheckingAuth = useRequireAuth();

    // set default value for each icon to be 3
  const [ratings, setRatings] = useState({Question1:3, Question2:3, Question3:3, Question4: 4, Question5:5});

  const [user, setUsersName] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/session/me', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.fullName) {
          setUsersName(data.fullName);
        }
      });

  }, []);

  if (isCheckingAuth) {
    return null;
  }

  // button action to submit results to backend
  const handleSubmit = async() => {
     const res = await fetch('http://localhost:8000/moodtracker/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          Question1: ratings.Question1,
          Question2: ratings.Question2,
          Question3: ratings.Question3,
          Question4: ratings.Question4,
          Question5: ratings.Question5,
          date: new Date().toISOString(),
      }),
    });
    
    const data = await res.json();
    if (data.valid) {
      alert('Your answers have been saved!');
    } else {
      alert('Please try again');
    }

  }


    return(
        <Box sx={{minHeight: '100vh', backgroundColor: '#FDF3EC', display:'flex', flexDirection: 'column' }}>
            <Header />

       <Box sx={{backgroundColor: '#fff', borderBottom: '1px solid #E65100'}}> 
        <Typography variant="h4" sx={{color: '#883203', textAlign: 'left', marginLeft: 5, marginTop: 4, marginBottom: 4}}>
          How would you rate your mood today, {user}? 
        </Typography>
        </Box>     
      
      <Stack spacing={2} sx={{ maxWidth: 1000, margin: '0 auto', padding: 4}}>
        <Item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            
            <Typography variant="h6"  sx={{color: '#E65100', marginBottom: '8px', fontSize: '30px'}}>
              How would you rate your stress today?
            </Typography>
            <StyledRating
                name="Question1"
                value={ratings.Question1}  
                onChange={(_, newValue) => setRatings((prev) => ({...prev, Question1: newValue}))}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
            />
        </Item>

        <Item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
             <Typography variant="h6"  sx={{color: '#E65100', marginBottom: '8px', fontSize: '30px'}}>
              How would you rate your energy today?
            </Typography>
             <StyledRating
                name="Question2"
                value={ratings.Question2}
                onChange={(_, newValue) => setRatings((prev) => ({...prev, Question2: newValue}))}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
              />
        </Item>

        <Item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
             <Typography variant="h6"  sx={{color: '#E65100', marginBottom: '8px', fontSize: '30px'}}>
              How would you rate your overall mood today?
            </Typography>
             
             <StyledRating
                name="Question3"
                value={ratings.Question3}
                onChange={(_, newValue) => setRatings((prev) => ({...prev, Question3: newValue}))}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
            />
        </Item>

        <Item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
             <Typography variant="h6"  sx={{color: '#E65100', marginBottom: '8px', fontSize: '30px'}}>
              How would you rate your sleep quality last night?
            </Typography>
             <StyledRating
                name="Question4"
                value={ratings.Question4}
                onChange={(_, newValue) => setRatings((prev) => ({...prev, Question4: newValue}))}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
              />
        </Item>

        <Item sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
             <Typography variant="h6"  sx={{color: '#E65100', marginBottom: '8px', fontSize: '30px'}}>
              How would you rate your productivity today?
            </Typography>
             <StyledRating
                name="Question5"
                value={ratings.Question5}
                onChange={(_, newValue) => setRatings((prev) => ({...prev, Question5: newValue}))}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
              />
        </Item>
      </Stack>
      <Box sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}
        sx={{ backgroundColor: '#E65100', px: 4, py: 2, fontcolor: '#FDF3EC',  '&:hover': {backgroundColor: '#E65100', borderRadius: '4px',
          px: 6, py: 2, fontSize: '16px', fontWeight: 'bold', color: 'white'
        }}}> Save progress</Button>
      </Box>

      </Box>

    );
 
}