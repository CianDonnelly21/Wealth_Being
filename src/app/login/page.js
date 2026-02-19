'use client';

import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import FormControlLabel from '@mui/material/FormControlLabel';

import Link from '@mui/material/Link';

import Container from '@mui/material/Container';

import Box from '@mui/material/Box';

export default function loginPage() {

    const handleSubmit = (event) => {
    console.log("Handling Submit");
    event.preventDefault();


    const data = new FormData(event.currentTarget);

    let email = data.get("email")
    let password = data.get("password")

    console.log("Sent Email: " + email)
    console.log("Sent Password: ******")

    //Empty Field Text
     if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    runDBCallAsync(`/api/login?email=${email}&password=${password}`)

};

    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res.json();

        if (data.valid) {
            console.log("login is valid!");
            window.location.href = "/dashboard";
        }

        else {
            console.log("not valid");
            alert("Invalid email or password");
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
                                        Login Below
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

                                        {/* Email input field */}
                                        <TextField sx = {{ backgroundColor: '#ffff' }}
                                            required
                                            id = "email"
                                            label = "Email"
                                            name = "email"
                                            autoComplete = "email"
                                            autoFocus
                                        />

                                        {/* Password input field */}
                                        <TextField sx = {{ backgroundColor: '#ffff' }}
                                            margin = "normal"
                                            required
                                            name = "password"
                                            label = "Password"
                                            type = "password"
                                            id = "password"
                                            autoComplete = "current-password"
                                        />

                                    </Box>

                                    {/* Login button positioning */}
                                    <Box sx = {{
                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                    >

                                        {/* Login button positioning */}
                                        <Button type = "submit" fullWidth variant = "contained" sx = {{
                                                marginTop: 5,
                                                backgroundColor:'#18A558',
                                                width: 190,
                                                fontSize: '18px',
                                                borderRadius: 2
                                            }}
                                        >
                                            LOGIN
                                        </Button>
                                    </Box>

                                        {/* Register button positioning */}
                                        <Box sx = {{
                                                width: '100%',
                                                textAlign: 'center'
                                            }}
                                        >
                                        <p style = {{
                                            marginTop: 100,
                                            fontSize: '22px'
                                            }}
                                        >
                                            Don't have an account ?
                                        </p>

                                        <Button type = "button" variant = "contained" sx = {{
                                            marginBottom: 5,
                                            marginTop: 2,
                                            backgroundColor:'#18A558',
                                            width: 190,
                                            fontSize: '15px',
                                            borderRadius: 2
                                        }}
                                            onClick={() => window.location.href = "/register"}
                                        >
                                            REGISTER HERE
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