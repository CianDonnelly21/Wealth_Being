import Header from '../components/Header';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function page() {
    return(
          <Box sx={{minHeight: '100vh', backgroundColor: '#E9F1EC', display:'flex', flexDirection: 'column' }}>
        <Header />
        </Box>

    )
 
}