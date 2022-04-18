import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { NavLink, useLocation } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material'; 
import useFireBase from '../../../Hooks/UseFireBase';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';

const theme = createTheme();

const SignUp = () => {
    const location = useLocation();
    const { user, registerUser, isLoading, authError } = useFireBase();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const name1 = data.get('name1');
        const name2 = data.get('name2');
        let fullName = name1.concat(" ", name2)
        registerUser(email, password, fullName, location)


    };
    return (
        <>
            <NavigationBar></NavigationBar>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgColor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name1"
                                        required
                                        fullWidth
                                        id="name1"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name2"
                                        label="Last Name"
                                        name="name2"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                {isLoading && <CircularProgress sx={{ mx: 'auto' }} />}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {user?.email && <Alert severity="success">User Created successfully!</Alert>}
                                    {user?.email && (<NavLink
                                        style={{ textDecoration: 'none', }}
                                        to="/home">
                                        <Button variant="contained">Go To Home</Button>
                                    </NavLink>)}
                                </div>
                                {authError && <Alert severity="error">{authError}</Alert>}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink
                                        style={{ textDecoration: 'none' }}
                                        to="/signIn">
                                        <Button variant="text">Already Registered? Please Login</Button>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider></>
    );
};

export default SignUp;