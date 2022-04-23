import React, { useState } from 'react';
import { Button, CardContent, CardMedia, Container, Divider, Grid, Paper, Typography } from '@mui/material';
const ManageAdminCard = ({ data }) => {
    const [value, setValue] = useState(3)
    const deleteAdmin = (id) => {
        const url = `http://localhost:5000/adminDelete/${id}`
        console.log(url);
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.deletedCount)
                if (data.deletedCount > 0) {
                    console.log('admin deleted')

                }
            });
    }
    return (
        <Grid item xs={12} md={4} style={{ paddingTop: "30px", }}>
            <Paper elevation={value} variant='elevation' onPointerOver={() => setValue(24)}
                onPointerOut={() => setValue(3)}
                style={{
                    height: "400px",
                    width: "345px"
                }}>

                <CardContent>
                    <CardMedia
                        component="img"
                        height="200px"
                        width="245px"
                        image={data?.adminPicture}
                        alt="green iguana"
                    />
                    <Typography style={{ textAlign: 'center', paddingTop: '10px' }} component="div">
                        <b>{data?.adminName}</b>
                    </Typography>
                    <Typography style={{ paddingTop: '10px' }} component="div">
                        Admin ID :<b>{data?._id}</b>
                    </Typography>
                    <Typography style={{ paddingTop: '10px' }} component="div">
                        Admin Email :<b>{data?.adminEmail}</b>
                    </Typography>
                    <Typography style={{ paddingTop: '10px' }} component="div">
                        Phone : <b>{data?.adminPhone}</b>
                    </Typography>
                    <Button onClick={() => deleteAdmin(data?._id)}>Delete</Button>
                </CardContent>
            </Paper >
        </Grid>
    );
};

export default ManageAdminCard;