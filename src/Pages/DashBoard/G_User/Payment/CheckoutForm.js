import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, CircularProgress, Container } from '@mui/material';
import UseAuth from '../../../../FireBase/UseAuth';
const CheckoutForm = ({ payments }) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = UseAuth()
    const { totalPrice, _id } = payments
    const price = parseInt(totalPrice)
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        fetch('https://sleepy-dawn-01844.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            setError(error.message);
            setSuccess('');
        }
        else {
            setError('');
            console.log(paymentMethod);
        }
        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: `${user?.displayName}`,
                        email: `${user?.email}`
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('Your payment processed successfully.')
            console.log(paymentIntent);
            setProcessing(false);
            // save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            console.log(payment)
            const url = `https://sleepy-dawn-01844.herokuapp.com/payments/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => console.log(data));
        }

    }
    return (
        <Container  >
            <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '20px', }}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '2rem',
                                color: '#F4828F',
                                '::placeholder': {
                                    color: '#F4828F',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {processing ? <CircularProgress></CircularProgress> : <Button align='center' variant="contained" size="large" type="submit" disabled={!stripe || success}>
                    Pay ${totalPrice}
                </Button>}
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
        </Container>
    );
};

export default CheckoutForm;