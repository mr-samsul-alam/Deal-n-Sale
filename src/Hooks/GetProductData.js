import React, { useEffect, useState } from 'react'; 

const GetProductData = () => { 
    const [products, setProducts] = useState([]);
    const [progress, setProgress] = React.useState(20);
    const [buffer, setBuffer] = React.useState(30);
    useEffect(() => {
        setBuffer(40)
        setProgress(50)
        fetch('https://sleepy-dawn-01844.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
        setBuffer(100)
        setProgress(100)


    }, [])
    return { products, progress, buffer }
};

export default GetProductData;