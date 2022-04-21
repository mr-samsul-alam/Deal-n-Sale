import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';  
import UseAuth from '../../../FireBase/UseAuth';
const SignIn = () => {
    const { signUsingGoogle, loginUser, user, isLoading, authError } = UseAuth()
    const [loginData, setLoginData] = useState({});
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const location = useLocation();
    // const history = useNavigate();

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location)
        e.preventDefault();
        console.log(location);
    }

    const handleGoogleLogin = () => {
        signUsingGoogle(location)
        console.log(location);
    }
    const navigate = useNavigate();
    return (
        <>
            <NavigationBar></NavigationBar>
            <Container>
                <Typography variant='h3' style={{ textAlign: 'center', fontWeight: "bolder", color: '#236F97B3', justifyContent: "center", marginTop: '100px' }}>
                    Sign In
                </Typography>
                <Typography variant='h3' style={{ textAlign: 'center', color: '#236F97B3', justifyContent: "center", marginTop: '100px' }}>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            label="Your Email"
                            name="email"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}

                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <Button sx={{ width: '75%', m: 1 }} type="submit" style={{ backgroundColor: '#236F97B3' }} variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none', display: "block" }}
                            to="/signUp">
                            <Button variant="text">New User? Please Register</Button>
                        </NavLink>
                        {isLoading && <CircularProgress sx={{ mx: 'auto' }} />}
                        {user?.email && <Alert severity="success">Login successfully!</Alert>}
                        {user?.email && navigate('/')}
                        {user?.email && (<NavLink
                            style={{ textDecoration: 'none', display: "block" }}
                            to="/home">
                            <Button variant="contained">Go To Home</Button>
                        </NavLink>)}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </form>
                    <Typography>
                        <Button onClick={handleGoogleLogin} variant="contained" style={{ margin: "50px", backgroundColor: '#236F97B3' }} >Google SignIn</Button>
                    </Typography>

                </Typography>

            </Container>
        </>
    );
};

export default SignIn;