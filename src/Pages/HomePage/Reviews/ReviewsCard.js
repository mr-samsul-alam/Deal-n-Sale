import { Grid, Paper, Rating } from '@mui/material';
import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const ReviewsCard = (props) => {
    const { photo, name, rating, review } = props.review
    return (
        <Grid item xs={12} md={6} lg={4} style={{ paddingTop: "30px" }}   >
            <Paper elevation={24} variant='elevation' sx={{ maxWidth: 345, maxHeight: 450, padding: '20px', textAlign: 'center', alignItems: 'center', borderRadius: '25px' }}>

                <CardContent>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardMedia
                            style={{ borderRadius: "50%", width: "150px" }}
                            component="img"
                            image={photo}
                            alt="green iguana"
                        />
                    </Box>
                    <Box style={{ alignItems: 'center' }} >
                        <Typography>
                            <Rating name="read-only" value={parseFloat(rating)} readOnly />
                        </Typography>
                        <Typography variant='h6' style={{ display: 'block' }}>
                            {name}
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={11} md={11} variant="body2" color="text.secondary">
                            <div style={{ width: "100%", height: 150, overflowY: "auto" }}>
                                {review}
                            </div>
                        </Grid>
                        <Grid item xs={1} md={1} color="text.secondary" >
                            <Typography variant='h1'>
                                ”
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>

            </Paper>
        </Grid>

    );
};

export default ReviewsCard;