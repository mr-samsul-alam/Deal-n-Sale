import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
const stripePromise = loadStripe('pk_test_51KjqhVAs7LB5d2bHhO4vqZpqsv9hAcmRLHH5eepXFCB915KAU6hxdb2Pqbnkz8KCazVxALye9wjsTLEIZpsGJtHt00V9kkrAYh')


const Payment = () => {
    const [pendingPayment, setPendingPayment] = useState([])
    const price = pendingPayment[0]?.totalPrice;
    const carts = pendingPayment[0]?.carts;
    // const email = pendingPayment[0]?.email
    console.log(carts);
    useEffect(() => {
        fetch(`http://localhost:5000/payments/contactsamsulalam@gmail.com`)
            .then(res => res.json())
            .then(data => setPendingPayment(data))
    }, [])
    return (
        <Container>
            <Typography variant='h3' style={{ display: "flex", justifyContent: 'center', marginTop: '20px' }}>
                My Payments
            </Typography>

            <Box style={{ border: '2px solid red' }}>
                {
                    pendingPayment?.map(payments => <Grid container spacing={2} style={{ border: '2px solid red' }}>
                        <Grid item xs={12} md={6}>
                            {
                                payments.carts?.map(cart => <Card sx={{ maxWidth: 200, m: 'auto', mt: 2 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image={cart?.productImg}
                                            alt="green iguana"
                                            style={{ border: '2px solid red' }}
                                        />
                                        <CardContent>
                                            <Typography style={{ display: "flex", justifyContent: 'center', }}>
                                                product Name:{cart?.productName} quantity: {cart?.quantity}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                )
                            }
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Box >
                                <Typography style={{ display: "flex", justifyContent: 'center', }}>
                                    Name: <b> {payments?.name}</b>
                                </Typography>
                                <Typography style={{ display: "flex", justifyContent: 'center', }}>
                                    Email: <b> {payments?.email}</b>
                                </Typography>
                                <Typography style={{ display: "flex", justifyContent: 'center', }}>
                                    Total:<b> $ {payments?.totalPrice}</b>
                                </Typography>
                                <Box >
                                    {
                                        price && <Elements stripe={stripePromise}>
                                            <CheckoutForm
                                                pendingPayment={pendingPayment}
                                            />
                                        </Elements>
                                    }
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    )
                }
            </Box>

            {/* {
              carts?.map(cart=> <h1>helloe</h1> )
            } */}


        </Container>
    );
};

export default Payment;