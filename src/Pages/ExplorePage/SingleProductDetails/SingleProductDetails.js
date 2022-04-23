import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, ButtonGroup, Container, Grid, Paper, Rating, Skeleton, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import { addToDb } from '../../../Utilities/SavedToLocalStorage';
import { Box } from '@mui/system';
import AddToCart from '../AddToCart/AddToCart';
import UseAuth from '../../../FireBase/UseAuth';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
const SingleProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = React.useState(false);
    const [wishSuccess, setWishSuccess] = React.useState(false);
    const { user, products, progress, buffer } = UseAuth()
    const { id } = useParams()
    //filtering product by getting product code  
    const product = products.find(product => (product?.id_by_category === id));

    // initial price coming from db
    const [newPrice, setPrice] = useState(product?.price);
    const [livePicture, setPicture] = useState(product?.mainPicture);
    //updating quantity and price and also showing live price on site according to quantity 
    const upDate = (prop, quantity) => {
        if (quantity >= 1) {
            if (prop === "plus") {
                setQuantity(quantity + 1);
                const price = product?.price;
                let newPrice = price * (quantity + 1);
                setPrice(newPrice)
            }
            else {
                setQuantity(quantity - 1)
                const price = product?.price;
                let newPrice = price * (quantity - 1);
                console.log(newPrice);
                setPrice(newPrice)
            }

        }
        else if (quantity >= 0) {
            if (prop === "plus") {
                setQuantity(quantity + 1);
                const price = product?.price;
                let newPrice = price * quantity;
                console.log(newPrice);
                setPrice(newPrice)
            }
        }
    }
    const navigate = useNavigate()

    // making object for sending db
    const CartDetails = {
        name: `${user?.displayName}`,
        email: `${user?.email}`,
        productCode: `${product?.productCode}`,
        productName: `${product?.productName}`,
        productImg: `${product?.mainPicture}`,
        quantity: `${quantity}`,
        price: `${product?.price}`,
        paymentStatus: 'pending'
    }
    const goToMyCart = () => {
        navigate('/dashboard/myCarts')
    }

    const goToMyWish = () => {
        navigate('/dashboard/myWishlists')
    }
    const handleClick = (link) => {
        setPicture(link)
    }
    return (
        <div>
            <NavigationBar></NavigationBar>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            <Container>
                {
                    product ? (<Grid container spacing={2} style={{ margin: '2px solid red', marginTop: '50px' }}>
                        <Grid item xs={12} md={6}>
                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <Paper elevation={24} variant='elevation' style={{ display: 'flex', justifyContent: 'center', width: '300px', marginTop: '50px', marginBottom: '50px' }}>
                                    {
                                        livePicture ? <img src={livePicture} width="300px" alt="" /> : <img src={product?.mainPicture} width="300px" alt="" />
                                    }
                                </Paper>
                            </Box>

                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <Box onClick={() => handleClick(product?.picture2)} sx={{ border: '5px solid #F89800', margin: '5px' }}>
                                    <img src={product?.picture2} width="100px" style={{ padding: '2px' }} alt="" />
                                </Box>
                                <Box onClick={() => handleClick(product?.picture3)} sx={{ border: '5px solid #F89800', margin: '5px' }}>
                                    <img src={product?.picture3} width="100px" alt="" style={{ padding: '2px' }} /></Box>
                                <Box onClick={() => handleClick(product?.picture4)} sx={{ border: '5px solid #F89800', margin: '5px' }}>
                                    <img src={product?.picture4} width="100px" alt="" style={{ padding: '2px' }} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography style={{ fontWeight: 'bolder', fontSize: '2rem' }}>{product?.productName}</Typography>
                            <Typography sx={{ margin: '5px' }}>
                                {product?.description}
                            </Typography>
                            <Typography sx={{ margin: '5px', alignItems: 'center' }} >
                                <b> {product?.pd_quantity}</b> Piece left
                            </Typography>
                            <Typography sx={{ margin: '5px', alignItems: 'center' }} >
                                <b>Rating</b>  <Rating name="half-rating-read" style={{ color: '#F89800' }} defaultValue={parseFloat(product?.rating)} precision={0.5} readOnly />
                            </Typography>
                            <Typography sx={{ margin: '5px' }}>
                                {
                                    newPrice ? <b>${newPrice}</b> : <b> ${product?.price}</b>
                                }

                            </Typography>
                            <ButtonGroup sx={{ margin: '5px' }} variant="outlined" aria-label="outlined button group">
                                <Button onClick={() => upDate("mynas", quantity)}>-</Button>
                                <Button>{quantity}</Button>
                                <Button onClick={() => upDate("plus", quantity)}>+</Button>
                            </ButtonGroup>
                            <AddToCart newPrice={newPrice} CartDetails={CartDetails} setSuccess={setSuccess} success={success} setWishSuccess={setWishSuccess} wishSuccess={wishSuccess} ></AddToCart>
                            {
                                wishSuccess && <Button style={{ margin: '10px' }} variant="contained" size="large" onClick={goToMyWish}>My Wish <CardGiftcardIcon /> </Button>
                            }
                            {
                                success ? (<Button style={{ margin: '10px' }} variant="contained" size="large" onClick={goToMyCart}>Check Cart <ShoppingCartCheckoutIcon /></Button>) : ''
                            }
                        </Grid>

                    </Grid>) : (<Grid container spacing={2} style={{ margin: '2px solid red' }}>
                        <Grid item xs={12} md={6}>
                            <Skeleton variant="rectangular" width={200} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography ><Skeleton variant="text" /></Typography>
                            <Typography  >
                                <Skeleton variant="text" />
                            </Typography>
                            <Typography>
                                <Skeleton variant="text" />
                            </Typography>

                            <Typography  >
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                            </Typography>

                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Skeleton variant="text" />
                            </ButtonGroup>
                        </Grid>
                    </Grid>)
                }
            </Container>

        </div>
    );
};

export default SingleProductDetails;