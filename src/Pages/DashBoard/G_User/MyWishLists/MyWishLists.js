import React, { useEffect } from 'react';
import UseProductsData from '../../../../Hooks/UseProductsData';
import { getStoredCart } from '../../../../Utilities/SavedToLocalStorage';

const MyWishLists = () => {
    const { products, progress, buffer } = UseProductsData()

    useEffect(() => {
        const savedWish = getStoredCart();
        for (const key in savedWish) {
            console.log(key);
            const product = products.find(product => product?.productCode === key)
            console.log(key, product);
        }
    }, [])


    //filtering product by getting product code  
    // const product = products.filter(product => (product?.subCategory === id));
    return (
        <div>
            <h1>MyWishLists</h1>
        </div>
    );
};

export default MyWishLists;