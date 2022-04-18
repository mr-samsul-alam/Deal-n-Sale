import React from 'react';
import Header from '../Header/Header';
import ProductOnSale from '../ProductOnSale/ProductOnSale';

const HomePage = () => {
    return (
        <div>
            <Header></Header>
            <ProductOnSale></ProductOnSale>
            <h1>This is Home page</h1>
        </div>
    );
};

export default HomePage;