import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductsOnSaleCard from '../ProductsOnSaleCard/ProductsOnSaleCard';
import UseProductsData from '../../../Hooks/UseProductsData';


const ProductOnSale = () => {
    const { products } = UseProductsData() 
    const productSliced = products.slice(0, 3) 
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
                    productSliced.map(product => <ProductsOnSaleCard key={product._id} product={product} ></ProductsOnSaleCard>)
                }
            </Grid>
        </Container>
    );
};

export default ProductOnSale;