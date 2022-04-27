import { Container, Grid, LinearProgress, Skeleton } from '@mui/material';
import React from 'react';
import UseAuth from '../../../FireBase/UseAuth';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import ProductsCard from '../../Shared/ProductsCard/ProductsCard';
import UseProductsData from '../../Shared/Shared/UseProductsData';

const ExplorePage = () => {
    const { products, progress, buffer } = UseProductsData()
    return (
        <>
            <NavigationBar></NavigationBar>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            <Container>
                <Grid container spacing={2}>
                    {
                        products.length === 0 ? (<>
                            <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                            <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                            <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                            <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                            <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} />
                            <Skeleton variant="rectangular" width={345} height={500} style={{ margin: '20px' }} /></>) : (products.map(product => <ProductsCard key={product?._id} product={product} ></ProductsCard>))
                    }
                </Grid>
            </Container>
        </>

    );
};

export default ExplorePage;