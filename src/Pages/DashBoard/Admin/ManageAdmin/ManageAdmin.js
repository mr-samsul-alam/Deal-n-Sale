import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, CardContent, CardMedia, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import { Box } from '@mui/system';
import ManageAdminCard from './ManageAdminCard';

const ManageAdmin = () => {
    const [addingBox, setAddingBox] = useState(false)
    const [submitInfo, setSubmitInfo] = useState({});
    const [adminData, setAdminData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...submitInfo };
        newInfo[field] = value;
        setSubmitInfo(newInfo);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    useEffect(() => {
        fetch('https://sleepy-dawn-01844.herokuapp.com/admin')
            .then(res => res.json())
            .then(data => setAdminData(data))
    }, [])

    const handleBookingSubmit = e => {
        // send to the server
        console.log(submitInfo)
        fetch('https://sleepy-dawn-01844.herokuapp.com/admin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(submitInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setOpen(true);
                    setAddingBox(false)
                    e.target.reset();
                }
            });

        e.preventDefault();
    }

    return (
        <Container style={{ border: '2px solid  #FFE7D9', backgroundColor: '#FFFFFF', paddingTop: '20px', paddingBottom: '30px' }}>
            <Typography variant='h4' style={{ textAlign: 'center', justifyContent: "center", padding: '10px' }}>
                Welcome Back MR. Super Admin
            </Typography>
            <Divider />
            <Divider />
            <Box style={{ textAlign: 'center', justifyContent: "center", padding: '10px' }}>
                <Button onClick={() => setAddingBox(true)}>
                    Add admin <AddModeratorOutlinedIcon style={{ margins: '15px' }} />
                </Button>
            </Box>
            {
                addingBox ? (<> <form onSubmit={handleBookingSubmit} style={{ padding: '10px' }}>
                    <TextField
                        required
                        sx={{ width: '96%', m: 1 }}
                        id="outlined-size-small"
                        name="adminPicture"
                        label="Admin Picture Link"
                        onBlur={handleOnBlur}
                        size="small"
                    />
                    <TextField
                        required
                        sx={{ width: '31%', m: 1 }}
                        id="outlined-size-small"
                        name="adminName"
                        label="Admin Name"
                        onBlur={handleOnBlur}
                        size="small"
                    />
                    <TextField
                        required
                        sx={{ width: '31%', m: 1 }}
                        id="outlined-size-small"
                        name="adminEmail"
                        label="Admin Email"
                        onBlur={handleOnBlur}
                        size="small"
                    />
                    <TextField
                        required
                        sx={{ width: '31%', m: 1 }}
                        id="outlined-size-small"
                        name="adminPhone"
                        label="Admin Phone"
                        onBlur={handleOnBlur}
                        size="small"
                    />

                    <Button sx={{ display: 'block', mx: 'auto', paddingX: 3, marginTop: 4 }} type="submit" variant="contained">Submit</Button>
                </form>
                </>) : ('')
            }
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                style={{ marginTop: '80px', marginRight: '80px' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Admin Added Successfully!
                </Alert>
            </Snackbar>
            <Divider />
            <Divider />
            <Grid container spacing={2}>
                {
                    adminData.map(data => <ManageAdminCard key={data._id} data={data}></ManageAdminCard>)
                }
            </Grid>

        </Container >

    );
};

export default ManageAdmin;