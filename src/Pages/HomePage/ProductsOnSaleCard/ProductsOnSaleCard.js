import React, { useState } from 'react';
import { ButtonBase, Grid, Paper, Rating, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const cardOnHover = ({ hover }) => ({
    borderBottom: '3px solid',
    borderTop: '3px solid',
    borderRight: '3px solid',
    borderLeft: '3px solid',
    borderBottomColor: '#D8C3A5',
    borderTopColor: hover ? '#D8C3A5' : 'white',
    borderRightColor: hover ? '#D8C3A5' : 'white',
    borderLeftColor: hover ? '#D8C3A5' : 'white',
})
const ProductsOnSaleCard = (props) => {
    const navigate = useNavigate();
    const { _id, subCategory, productName, mainPicture, rating, price } = props.product || []
    console.log(productName)
    const [hover, setHover] = useState(false)
    // const id_by_subCategory = false
    const goToDetails = (id) => {
        navigate(`/product/${subCategory}`)
    }
    return (
        <Grid item xs={12} md={4} style={{ paddingTop: "30px", }}   >
            {/* <Box sx={{ mx: '2px', transform: 'scale(0.8)' }}> */}
            {
                subCategory ? (<ButtonBase onClick={() => goToDetails(_id)} >
                    {/* elevation={24} variant='elevation' */}
                    <Card style={cardOnHover({ hover })}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}  >


                        <CardMedia
                            component="img"
                            height="100%"
                            image={mainPicture}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography sx={{ textAlign: 'center' }} component="div">
                                {productName}
                            </Typography>

                            <Typography style={{ display: 'flex', justifyContent: "space-between", marginTop: "20px" }} component="div">
                                <Typography  >
                                    <Rating name="half-rating-read" style={{ color: '#D8C3A5' }} defaultValue={parseFloat(rating)} precision={0.5} readOnly />
                                </Typography>
                                <Typography style={{ fontSize: "1.5rem" }} >
                                    <b>${price}</b>
                                </Typography>
                            </Typography>

                        </CardContent>
                    </Card>

                </ButtonBase >) : <ButtonBase onClick={() => goToDetails(_id)} >
                    {/* elevation={24} variant='elevation' */}
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

export default ProductsOnSaleCard;