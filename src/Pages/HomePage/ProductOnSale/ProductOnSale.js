import React, { useEffect, useState } from 'react';
import { Container, Grid, Skeleton, Typography } from '@mui/material';
import UseAuth from '../../../FireBase/UseAuth';
import ProductsCard from '../../Shared/ProductsCard/ProductsCard';
import UseProductsData from '../../Shared/Shared/UseProductsData';
import GetProductData from '../../../Hooks/GetProductData';


const ProductOnSale = () => {

    const { products } = GetProductData()
    const [productData, setProductData] = useState([])

    // console.log(products)
    useEffect(() => {
        setProductData(products)
    }, [products])
    const productSliced = productData.slice(0, 3)
    return (
        <Container style={{ marginTop: '70px' }}>
            <Typography variant="div" style={{ textAlign: 'center', }}>
                <Typography >
                    Today's Deal
                </Typography>
                <hr style={{ width: "50px" }} />
                <Typography variant='h3' style={{ fontWeight: "bolder", marginBottom: '70px' }}>
                    <span style={{ color: '#FE9C00' }}> PRODUCTS</span> <span style={{ color: '#283442' }} >ON SALE </span>
                </Typography>
            </Typography>
            <Grid container spacing={2}>
                {
                    productSliced.length === 0 ? (<>
                        <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                        <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                        <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} /></>) : (productSliced.map(product => <ProductsCard key={product._id} product={product} ></ProductsCard>))
                }

            </Grid>
        </Container>
    );
};

export default ProductOnSale;