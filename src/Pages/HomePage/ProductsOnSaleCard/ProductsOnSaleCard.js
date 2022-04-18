import React, { useState } from 'react';
import { ButtonBase, Grid, Paper, Rating } from '@mui/material';
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
    // const { _id, rating } = props.product
    const { _id, id_by_subCategory,  mainPicture } = props.product || [] 
    const [hover, setHover] = useState(false)

    const goToDetails = (id) => {
        navigate(`/product/${id_by_subCategory}`)
    }
    return (
        <Grid item xs={12} md={4} style={{ paddingTop: "30px", }}   >
            {/* <Box sx={{ mx: '2px', transform: 'scale(0.8)' }}> */}
            <ButtonBase onClick={() => goToDetails(_id)} >
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
                            {/* {name} */}
                        </Typography>

                        <Typography style={{ display: 'flex', justifyContent: "space-between", marginTop: "20px" }} component="div">
                            <Typography  >
                                {/* <Rating name="half-rating-read" style={{ color: '#D8C3A5' }} defaultValue={parseFloat(rating)} precision={0.5} readOnly /> */}
                            </Typography>
                            <Typography style={{ fontSize: "1.5rem" }} >
                                {/* <b>${price}</b> */}
                            </Typography>
                        </Typography>

                    </CardContent>
                </Card>

            </ButtonBase >
            {/* </Box> */}

        </Grid >
    );
};

export default ProductsOnSaleCard;