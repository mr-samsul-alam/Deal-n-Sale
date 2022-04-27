import { Container, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReviewsCard from './ReviewsCard';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-dawn-01844.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])

    return (
        <Container style={{ marginTop: '80px' }} >
            <Typography variant="div" style={{ textAlign: 'center', }}>

                <hr style={{ width: "50px" }} />
                <Typography variant='h3' style={{ fontWeight: "bolder", marginBottom: '50px' }}>
                    <span style={{ color: '#FE9C00' }}> People</span> <span style={{ color: '#283442' }} > Reviews </span>
                </Typography>
            </Typography>
            <Grid container spacing={2} style={{ padding: '50px' }}>
                {
                    reviews.length === 0 ? (<>
                        <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                        <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                        <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} /></>) : (reviews.map(review => <ReviewsCard key={review._id} review={review} ></ReviewsCard>))
                }

            </Grid>


        </Container>
    );
};

export default Reviews;