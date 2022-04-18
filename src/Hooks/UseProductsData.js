import React, { useEffect, useState } from 'react';

const UseProductsData = () => {
    const [products, setProducts] = useState([]);
    const [progress, setProgress] = React.useState(20);
    const [buffer, setBuffer] = React.useState(30);
    useEffect(() => {
        const hello = async () => {
            setBuffer(40)
            setProgress(50)
            await fetch('/fake_products_json.json')
                .then(res => res.json())
                .then(data => setProducts(data))
                setBuffer(100)
                setProgress(100)
        }
        hello()
    }, [])
    return { products,progress,buffer }
};

export default UseProductsData;