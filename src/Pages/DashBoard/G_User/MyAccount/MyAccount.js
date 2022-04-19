import React, { useEffect, useState } from 'react';
import UseFireBase from '../../../../Hooks/UseFireBase';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid, IconButton, Input, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
const MyAccount = () => {
    const { user } = UseFireBase()
    const [userData, setUserData] = useState({});
    const [editView, setEditView] = useState(true);
    const [progress, setProgress] = React.useState(20);
    const [buffer, setBuffer] = React.useState(30);
    useEffect(() => {
        setBuffer(40)
        setProgress(50)
        fetch(`http://localhost:5000/users/contactsamsulalam@gmail.com`)
            .then(res => res.json())
            .then(data => setUserData(data))
        setBuffer(100)
        setProgress(100)

    }, [user?.email])
    console.log(userData)

    const editViewing = () => {
        setEditView(false)
    }
    return (
        <>
            <Container style={{ marginTop: '30px', border: '2px solid  #FFE7D9', backgroundColor: '#FBFBFB' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10px', paddingBottom: '10px' }}>
                    <Typography variant='h4'>
                        My Profile
                    </Typography>
                    <Button onClick={editViewing}><ModeEditOutlinedIcon />Edit</Button>
                </Box>
                <Divider />
                {editView ? (<>

                    <Grid container spacing={2} style={{ paddingTop: '20px', paddingBottom: "20px" }} >
                        <Grid item xs={12} md={4}>
                            {
                                userData?.photoURL ? <img src={userData?.photoURL} style={{ borderRadius: '50%' }} alt="" /> : <AccountCircleOutlinedIcon />
                            }
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant='h6'>
                                Full name :
                            </Typography >
                            <Typography variant='h5'>
                                <b style={{ color: '#646464' }}>{userData?.displayName}</b>
                            </Typography>
                            <Typography variant='h6'>
                                Email Address:
                            </Typography>
                            <Typography variant='h6'>
                                <b style={{ color: '#646464' }}> {userData?.email}</b>
                            </Typography>
                            <Typography variant='h6'>
                                Customer Id:
                            </Typography>
                            <Typography variant='h5'>
                                <b style={{ color: '#646464' }}>{userData?._id}</b>
                            </Typography>
                        </Grid>

                    </Grid></>) : (<>

                        <Grid container spacing={2} style={{ paddingTop: '20px', paddingBottom: "20px" }} >
                            <Grid item xs={12} md={4}>
                                {
                                    userData?.photoURL ? <img src={userData?.photoURL} style={{ borderRadius: '50%' }} alt="" /> : <AccountCircleOutlinedIcon />
                                }
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" component="span">
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant='h6'>
                                    Full name :
                                </Typography >
                                <Typography variant='h5'>
                                    <TextField defaultValue={userData?.displayName} />
                                </Typography>
                                <Typography variant='h6'>
                                    Email Address:
                                </Typography>
                                <Typography variant='h6'>
                                    <b style={{ color: '#646464' }}> {userData?.email}</b>
                                </Typography>
                                <Typography variant='h6'>
                                    Customer Id:
                                </Typography>
                                <Typography variant='h5'>
                                    <b style={{ color: '#646464' }}>{userData?._id}</b>
                                </Typography>
                            </Grid>

                        </Grid>
                        <Box style={{ display: 'flex', justifyContent: 'center' ,paddingTop:'50px',paddingBottom:'30px'}} >
                            <Button variant="contained" >Saved</Button>
                        </Box>
                    </>)}
            </Container>
        </>

    );
};

export default MyAccount;