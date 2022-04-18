import React, { useEffect, useState } from 'react';

const UseProductsData = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const hello = async () => {
            await fetch('/fake_products_json.json')
                .then(res => res.json())
                .then(data => setProducts(data))
        }
        hello()
    }, [])
    return { products }
};

export default UseProductsData;