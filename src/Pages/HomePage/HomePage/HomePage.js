import React from 'react';
import Header from '../Header/Header';
import ProductOnSale from '../ProductOnSale/ProductOnSale';
import Reviews from '../Reviews/Reviews';

const HomePage = () => {
    return (
        <div>
            <Header></Header>
            <ProductOnSale></ProductOnSale>
            <Reviews></Reviews>
        </div>
    );
};

export default HomePage;