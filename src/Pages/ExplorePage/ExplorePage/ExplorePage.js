import { Container, Grid, LinearProgress } from '@mui/material';
import React from 'react';
import UseAuth from '../../../FireBase/UseAuth'; 
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import ProductsCard from '../../Shared/ProductsCard/ProductsCard';

const ExplorePage = () => {
    const { products, progress, buffer } = UseAuth()
    return (
        <>
            <NavigationBar></NavigationBar>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            <Container>
                <Grid container spacing={2}>
                    {
                        products.map(product => <ProductsCard key={product?._id} product={product} ></ProductsCard>)
                    }
                </Grid>
            </Container>
        </>

    );
};

export default ExplorePage;