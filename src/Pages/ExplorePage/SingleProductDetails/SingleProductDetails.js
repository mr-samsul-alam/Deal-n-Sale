import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, ButtonGroup, Container, Grid, Rating, Skeleton, Typography } from '@mui/material';
import UseProductsData from '../../../Hooks/UseProductsData';
import LinearProgress from '@mui/material/LinearProgress';
import UseFireBase from '../../../Hooks/UseFireBase';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import { addToDb } from '../../../Utilities/SavedToLocalStorage';
import { Box } from '@mui/system';
const SingleProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const { user } = UseFireBase()
    const { id } = useParams()
    //getting product data from useContext
    const { products, progress, buffer } = UseProductsData()
    //filtering product by getting product code  
    const product = products.filter(product => (product?.subCategory === id));
    const singleProduct = product[0]

    // initial price coming from db
    const [newPrice, setPrice] = useState(singleProduct?.price);
    const [livePicture, setPicture] = useState(singleProduct?.mainPicture);
    //updating quantity and price and also showing live price on site according to quantity 
    const upDate = (prop, quantity) => {
        if (quantity >= 1) {
            if (prop === "plus") {
                setQuantity(quantity + 1);
                const price = singleProduct?.price;
                let newPrice = price * (quantity + 1);
                console.log(newPrice);
                setPrice(newPrice)
            }
            else {
                setQuantity(quantity - 1)
                const price = singleProduct?.price;
                let newPrice = price * (quantity - 1);
                console.log(newPrice);
                setPrice(newPrice)
            }

        }
        else if (quantity >= 0) {
            if (prop === "plus") {
                setQuantity(quantity + 1);
                const price = singleProduct?.price;
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
        productName: `${singleProduct?.productName}`,
        productImg: `${singleProduct?.mainPicture}`,
        quantity: `${quantity}`,
        perUnit: `${singleProduct?.price}`,
        status: 'pending'
    }
    //Sending data to local storage
    const handleWish = () => {
        console.log(singleProduct?.id_by_subCategory);
        addToDb(singleProduct?.id_by_subCategory, quantity)
    }


    //Sending Data To Cart Details
    const handleAddToCart = () => {
        // liveNetPrice()
        console.log(singleProduct?.id_by_subCategory);
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
                    singleProduct ? (<Grid container spacing={2} style={{ margin: '2px solid red' }}>
                        <Grid item xs={12} md={6}>
                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    livePicture ? <img src={livePicture} width="200px" alt="" /> : <img src={singleProduct?.mainPicture} width="200px" alt="" />
                                }
                            </Box>

                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <Box onClick={() => handleClick(singleProduct?.picture2)}>
                                    <img src={singleProduct?.picture2} width="100px" alt="" />
                                </Box>
                                <Box onClick={() => handleClick(singleProduct?.picture3)}>
                                    <img src={singleProduct?.picture3} width="100px" alt="" /></Box>
                                <Box onClick={() => handleClick(singleProduct?.picture4)}>
                                    <img src={singleProduct?.picture4} width="100px" alt="" />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography style={{ fontWeight: 'bolder', fontSize: '2rem' }}>{singleProduct?.productName}</Typography>
                            <Typography  >
                                <Rating name="half-rating-read" style={{ color: '#D8C3A5' }} defaultValue={4} precision={0.5} readOnly />
                            </Typography>
                            <Typography>
                                {
                                    newPrice ? <Typography>{newPrice}</Typography> : <Typography>{singleProduct?.price}</Typography>
                                }

                            </Typography>

                            <Typography  >
                                {singleProduct?.description}
                            </Typography>

                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Button onClick={() => upDate("mynas", quantity)}>-</Button>
                                <Button>{quantity}</Button>
                                <Button onClick={() => upDate("plus", quantity)}>+</Button>
                            </ButtonGroup>
                            <Button onClick={handleAddToCart}>Add to Cart</Button>
                            <Button onClick={handleWish}>Add to Wish</Button>
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