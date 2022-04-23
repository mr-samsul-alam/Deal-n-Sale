import React, { useState } from 'react';
import { ButtonBase, Grid, Paper, Rating, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AddToCart from '../../ExplorePage/AddToCart/AddToCart';
import UseAuth from '../../../FireBase/UseAuth';


const ProductsCard = (props) => {
    const [success, setSuccess] = React.useState(false);
    const [wishSuccess, setWishSuccess] = React.useState(false);
    const navigate = useNavigate();
    const { user } = UseAuth()
    const { _id, id_by_category, productName, mainPicture, rating, productCode, price, pd_quantity } = props.product || []
    const [hover, setHover] = useState(false)
    const [value, setValue] = useState(3)

    // making object for sending db
    const CartDetails = {
        name: `${user?.displayName}`,
        email: `${user?.email}`,
        productCode: `${productCode}`,
        productName: `${productName}`,
        productImg: `${mainPicture}`,
        quantity: `${1}`,
        price: `${price}`,
        paymentStatus: 'pending'
    }


    const newPrice = price
    const goToDetails = (id) => {
        navigate(`/product/${id_by_category}`)
    }
    return (
        <Grid item xs={12} md={4} style={{ paddingTop: "30px", }}   >
            {
                id_by_category ? (
                    <Paper elevation={value} variant='elevation' onPointerOver={() => setValue(24)}
                        onPointerOut={() => setValue(3)}
                        style={{
                            height: "500px",
                            width: "345px"
                        }}>
                        <ButtonBase onClick={() => goToDetails(_id)} >

                            <CardContent>
                                <CardMedia  
                                    component="img"
                                    height="300px"
                                    width="345px"
                                    image={mainPicture}
                                    alt="green iguana"
                                />
                                <Typography sx={{ textAlign: 'center', paddingTop: '5px' }} component="div">
                                    <b>{productName}</b>
                                </Typography>
                                <Typography sx={{ textAlign: 'center', }} component="div">
                                    <Rating name="half-rating-read" style={{ color: '#F89800' }} defaultValue={parseFloat(rating)} precision={0.5} readOnly />
                                </Typography>

                                <Typography style={{ display: 'flex', justifyContent: "space-between", marginTop: "5px" }} component="div">
                                    <Typography  >
                                        <b>{pd_quantity}</b> piece left
                                    </Typography>
                                    <Typography style={{ fontSize: "1.5rem" }} >
                                        <b>${price}</b>
                                    </Typography>
                                </Typography>
                            </CardContent>

                        </ButtonBase >
                        <AddToCart newPrice={newPrice} CartDetails={CartDetails} setSuccess={setSuccess} success={success} setWishSuccess={setWishSuccess} wishSuccess={wishSuccess} ></AddToCart>
                    </Paper >) : <ButtonBase onClick={() => goToDetails(_id)} >
                    <Card style={{ padding: '20px' }}>
                        <Skeleton variant="rectangular" height="360px" width="320px" />
                        <CardContent>
                            <Typography sx={{ textAlign: 'center' }} component="div">
                                <Skeleton variant="text" />
                            </Typography>
                            <Typography component="div">
                                <Typography  >
                                    <Skeleton variant="text" />
                                </Typography>
                                <Typography style={{ fontSize: "1.5rem" }} >
                                    <Skeleton variant="text" />
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>

                </ButtonBase >
            }
            {/* </Box> */}

        </Grid >
    );
};

export default ProductsCard;