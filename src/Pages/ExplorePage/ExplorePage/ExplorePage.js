import { Container, Grid, LinearProgress } from '@mui/material';
import React from 'react';
import UseProductsData from '../../../Hooks/UseProductsData';
import ProductsOnSaleCard from '../../HomePage/ProductsOnSaleCard/ProductsOnSaleCard';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';

const ExplorePage = () => {
    const { products, progress, buffer } = UseProductsData()
    return (
        <>
            <NavigationBar></NavigationBar>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            <Container>
                <Grid container spacing={2}>
                    {
                        products.map(product => <ProductsOnSaleCard key={product?._id} product={product} ></ProductsOnSaleCard>)
                    }
                </Grid>
            </Container>
        </>

    );
};

export default ExplorePage;