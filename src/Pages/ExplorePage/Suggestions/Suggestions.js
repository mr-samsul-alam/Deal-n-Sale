import { Grid, Typography } from '@mui/material';
import React from 'react';
import ProductsCard from '../../Shared/ProductsCard/ProductsCard';

const Suggestions = (props) => {
    const { category, products, id } = props
    const sgProducts = products.filter(product => (product?.category.toLowerCase() === category.toLowerCase()))
    const suggestionProducts = sgProducts.filter(product => (product?.id_by_category !== id))
     
    return (
        <div>
            <Typography style={{ textAlign: 'center' }}>
                {
                    suggestionProducts.length === 0 ? '' : <Typography style={{ fontSize: "2rem" }}>
                        <b> More Collection of {category}</b>
                    </Typography>
                }

            </Typography>
            <Grid container spacing={2}>
                {
                    suggestionProducts?.map(product => <ProductsCard key={product?._id} product={product} ></ProductsCard>)
                }
            </Grid>
        </div>
    );
};

export default Suggestions;