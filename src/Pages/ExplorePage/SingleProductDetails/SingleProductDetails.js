import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, ButtonGroup, Container, Grid, Rating, Skeleton, Typography } from '@mui/material';
import UseProductsData from '../../../Hooks/UseProductsData';
import LinearProgress from '@mui/material/LinearProgress';
import UseFireBase from '../../../Hooks/UseFireBase';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import { addToDb } from '../../../Utilities/SavedToLocalStorage';
const SingleProductDetails = () => {
    const [quantity, setQuantity] = useState(1);

    const { user } = UseFireBase()

    const { id } = useParams()
    const { products } = UseProductsData()

    const product = products.filter(product => (product?.id_by_subCategory === id));
    const singleProduct = product[0]
    const [newPrice, setPrice] = useState(singleProduct?.price);




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
    // const liveNetPrice = () => {
    //     const price = singleProduct?.price;
    //     let newPrice = price * quantity;
    //     console.log(newPrice);
    //     setPrice(newPrice)
    // }
    console.log(newPrice);
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
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Container>
                {
                    singleProduct ? (<Grid container spacing={2} style={{ margin: '2px solid red' }}>
                        <Grid item xs={12} md={6}>
                            <img src={singleProduct?.mainPicture} width="200px" alt="" />
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

                <Button onClick={handleWish}>Add to Wish</Button>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
            </Container>

        </div>
    );
};

export default SingleProductDetails;