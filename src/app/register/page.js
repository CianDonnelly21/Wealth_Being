'use client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function registerPage() {

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const fullName = data.get("fullName");
        const email = data.get("email");
        const confirmEmail = data.get("confirmEmail");
        const createPassword = data.get("createPassword");
        const verifyPassword = data.get("verifyPassword");

        //Empty Field Text
        if (!fullName || !email || !confirmEmail || !createPassword || !verifyPassword) {
            alert("Please fill in all fields");
            return;
        }

        //Passsword Check
        if (createPassword !== verifyPassword) {
            alert("Passwords don't match!");
            return;
        }

        //Email Check
        if (email !== confirmEmail) {
            alert("Emails don't match!");
            return;
        }

        runDBCallAsync(`http://127.0.0.1:8000/api/register?fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(createPassword)}`)
    };

    async function runDBCallAsync(url) {

        const res = await fetch(url);
        const data = await res.json();

        if (data.valid) {
            window.location.href = "/login";
        } else {
            alert(data.message || "Registration failed");
        }
    }


   //*****************************************************************************************************************
   //Line 10:
       //When an occurence happens in the browser (event), the browser looks for something that is
           //Designed to handle it then calls the function

   //Line 14:
       //Create an object to use the in built tool (FormData) so that when the event currentTarget (current form)
             //Is submitted the email and password are retrieved (FormData) and printed to the console once submitted
   //*****************************************************************************************************************

                       return (

                           <Box sx = {{
                                   backgroundImage: "url('/images/Background_Img.png')",
                                   backgroundSize: 'cover',
                                   opacity: 0.8
                               }}
                           >

                           <Container maxWidth = "sm">

                               {/* Centers everything on the screen */}
                               <Box sx = {{
                                       height: '100vh',
                                       display: 'flex',
                                       flexDirection: 'column',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                   }}
                               >

                               {/* Form submit handler */}
                               <Box component = "form" onSubmit = {handleSubmit} noValidate sx = {{
                                       position: 'relative',
                                       width: '100%',
                                       maxWidth: 400,
                                       borderRadius: 2,
                                       overflow: 'auto',
                                       padding: 4,
                                       display: 'flex',
                                       flexDirection: 'column',
                                       alignItems: 'center'
                                   }}
                               >

                               {/* Background of/and form inputs */}
                               <Box sx = {{ position: 'relative' }}>

                                   {/* Form Background */}
                                       <Box sx = {{
                                           position: 'absolute',
                                           inset: 0,
                                           backgroundColor: '#212121',
                                           opacity: 0.4,
                                           zIndex: 0,
                                           borderRadius: 2
                                       }}
                                   />

                                   {/* Header for form */}
                                   <h1 style = {{
                                       padding: 2,
                                       textAlign: 'center'
                                   }}>
                                       Register Below
                                   </h1>

                                   {/* Spacing for background of form */}
                                   <Box sx = {{
                                           position: 'relative',
                                           zIndex: 1,
                                           padding: 4
                                       }}
                                   >

                                   {/* Text field positioning */}
                                   <Box sx = {{
                                           width: '100%',
                                           textAlign: 'center',
                                       }}
                                   >

                                       {/* Full name input field */}
                                       <TextField sx = {{ backgroundColor: '#ffff' }}
                                           margin = "normal"
                                           required
                                           name = "fullName"
                                           label = "Full Name"
                                           type = "fullName"
                                           id = "fullName"
                                           autoComplete = "fullName"
                                       />

                                       {/* Email input field */}
                                       <TextField sx = {{ backgroundColor: '#ffff' }}
                                           margin = "normal"
                                           required
                                           name = "email"
                                           label = "Email"
                                           id = "email"
                                           type = "email"
                                           autoComplete = "email"
                                       />


                                       {/* Confirm email input field */}
                                       <TextField sx = {{ backgroundColor: '#ffff' }}
                                           margin = "normal"
                                           required
                                           name = "confirmEmail"
                                           label = "Confirm Email"
                                           type = "confirmEmail"
                                           id = "confirmEmail"
                                           autoComplete = "confirmEmail"
                                       />

                                       {/* Create password input field */}
                                       <TextField sx = {{ backgroundColor: '#ffff' }}
                                           margin = "normal"
                                           required
                                           name = "createPassword"
                                           label = "Create Password"
                                           type = "password"
                                           id = "createPassword"
                                           autoComplete = "createPassword"
                                       />

                                       {/* Verify password input field */}
                                       <TextField sx = {{ backgroundColor: '#ffff' }}
                                           margin = "normal"
                                           required
                                           name = "verifyPassword"
                                           label = "Verify Password"
                                           type = "password"
                                           id = "verifyPassword"
                                           autoComplete = "verifyPassword"
                                       />

                                   </Box>

                                   {/* Register button positioning */}
                                   <Box sx = {{
                                           width: '100%',
                                           textAlign: 'center'
                                       }}
                                   >

                                       {/* Register button positioning */}
                                       <Button type="submit" fullWidth variant="contained" sx={{
                                                   marginTop: 5,
                                                   backgroundColor:'#18A558',
                                                   width: 190,
                                                   fontSize: '18px',
                                                   borderRadius: 2
                                               }}
                                           >
                                               REGISTER
                                           </Button>
                                       </Box>

                                       {/* Login button positioning */}
                                       <Box sx={{
                                               width: '100%',
                                               textAlign: 'center'
                                           }}
                                       >
                                           <p style={{
                                                   marginTop: 100,
                                                   fontSize: '22px'
                                               }}
                                           >
                                               Already have an account ?
                                           </p>

                                       <Button type="button" variant="contained" sx={{
                                               marginBottom: 5,
                                               marginTop: 2,
                                               backgroundColor:'#18A558',
                                               width: 190,
                                               fontSize: '15px',
                                               borderRadius: 2
                                           }}
                                           onClick={() => window.location.href = "/login"}
                                       >
                                           LOGIN HERE
                                       </Button>
                                   </Box>
                               </Box>
                           </Box>
                       </Box>
                   </Box>
               </Container>
           </Box>
       );
   }