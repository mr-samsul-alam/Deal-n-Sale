import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, ButtonGroup, Container, Grid, Rating, Skeleton, Typography } from '@mui/material';
import UseProductsData from '../../../Hooks/UseProductsData';
import LinearProgress from '@mui/material/LinearProgress';
import UseFireBase from '../../../Hooks/UseFireBase';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import { addToDb } from '../../../Utilities/SavedToLocalStorage';
import { Box } from '@mui/system';
import AddToCart from '../AddToCart/AddToCart';
const SingleProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const { user } = UseFireBase()
    const { id } = useParams()
    //getting product data from useContext
    const { products, progress, buffer } = UseProductsData()
    //filtering product by getting product code  
    const product = products.find(product => (product?.subCategory === id)); 

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

    // making object for sending db
    const CartDetails = {
        name: `${user?.displayName}`,
        email: `${user?.email}`,
        productCode: `${product?.productCode}`,
        productName: `${product?.productName}`,
        productImg: `${product?.mainPicture}`,
        quantity: `${quantity}`,
        price: `${newPrice ? (newPrice) : (product?.price)}`,
        paymentStatus: 'pending'
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
                    product ? (<Grid container spacing={2} style={{ margin: '2px solid red' }}>
                        <Grid item xs={12} md={6}>
                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    livePicture ? <img src={livePicture} width="200px" alt="" /> : <img src={product?.mainPicture} width="200px" alt="" />
                                }
                            </Box>

                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <Box onClick={() => handleClick(product?.picture2)}>
                                    <img src={product?.picture2} width="100px" alt="" />
                                </Box>
                                <Box onClick={() => handleClick(product?.picture3)}>
                                    <img src={product?.picture3} width="100px" alt="" /></Box>
                                <Box onClick={() => handleClick(product?.picture4)}>
                                    <img src={product?.picture4} width="100px" alt="" />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography style={{ fontWeight: 'bolder', fontSize: '2rem' }}>{product?.productName}</Typography>
                            <Typography  >
                                <Rating name="half-rating-read" style={{ color: '#D8C3A5' }} defaultValue={4} precision={0.5} readOnly />
                            </Typography>
                            <Typography>
                                {
                                    newPrice ? <Typography>{newPrice}</Typography> : <Typography>{product?.price}</Typography>
                                }

                            </Typography>

                            <Typography  >
                                {product?.description}
                            </Typography>

                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Button onClick={() => upDate("mynas", quantity)}>-</Button>
                                <Button>{quantity}</Button>
                                <Button onClick={() => upDate("plus", quantity)}>+</Button>
                            </ButtonGroup>
                            <AddToCart CartDetails={CartDetails} ></AddToCart>
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