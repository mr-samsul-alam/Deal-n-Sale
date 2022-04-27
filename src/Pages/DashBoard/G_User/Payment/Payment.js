import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import UseAuth from '../../../../FireBase/UseAuth';
const stripePromise = loadStripe('pk_test_51KjqhVAs7LB5d2bHhO4vqZpqsv9hAcmRLHH5eepXFCB915KAU6hxdb2Pqbnkz8KCazVxALye9wjsTLEIZpsGJtHt00V9kkrAYh')


const Payment = () => {
    const [progress, setProgress] = React.useState(20);
    const [buffer, setBuffer] = React.useState(30);
    const [pendingPayment, setPendingPayment] = useState([])
    const price = pendingPayment[0]?.totalPrice;
    const { user } = UseAuth()

    useEffect(() => {
        setBuffer(40)
        setProgress(50)
        fetch(`https://sleepy-dawn-01844.herokuapp.com/payments/${user?.email}`)
            .then(res => res.json())
            .then(data => setPendingPayment(data))
        setBuffer(100)
        setProgress(100)
    }, [user?.email])

    return (
        <Container>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            <Typography variant='h3' style={{ textAlign: "center", marginTop: '20px' }}>
                My Payments
            </Typography>
            {
                pendingPayment.length === 0 && <Typography variant='h6' style={{ textAlign: "center", marginTop: '20px' }}>
                    No order for payments
                </Typography>
            }
            <Box style={{ marginTop: '50px', }}>
                {
                    pendingPayment?.map(payments => <Grid container spacing={2} style={{ marginBottom: '50px', border: "5px solid black" }}> 
                        <Grid item xs={12} md={6}> 
                            <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }}>
                                {
                                    payments.carts?.map(cart => <Grid item xs={12} md={6}>
                                        <Card sx={{ maxWidth: 200, m: 'auto', mt: 2 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    image={cart?.productImg}
                                                    alt="green iguana"
                                                    style={{ border: '2px solid #F89800' }}
                                                />
                                                <CardContent>
                                                    <Typography style={{ display: "flex", justifyContent: 'center', }}>
                                                        product Name:{cart?.productName} quantity: {cart?.quantity}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                    )
                                }
                            </Grid>

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
                                    Email: <b> {payments?.pd_quantity}</b>
                                </Typography>
                                <Typography style={{ display: "flex", justifyContent: 'center', }}>
                                    Total:<b> $ {payments?.totalPrice}</b>
                                </Typography>
                                {
                                    payments?.payment === "pending" ? (<Box >
                                        {
                                            price && <Elements stripe={stripePromise}>
                                                <CheckoutForm
                                                    payments={payments}
                                                />
                                            </Elements>
                                        }
                                    </Box>) : (<h1><b>Payment SuccessFull</b></h1>)
                                }


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