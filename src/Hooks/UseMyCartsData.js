import React, { useEffect, useState } from 'react';
import UseAuth from '../FireBase/UseAuth';

const UseMyCartsData = () => {
    const { user } = UseAuth()
    const [carts, setCarts] = useState([]);
    const [cartsProgress, setCartsProgress] = React.useState(20);
    const [cartBuffer, setCartBuffer] = React.useState(30);
    useEffect(() => {
        setCartBuffer(40)
        setCartsProgress(50)
        fetch(`https://sleepy-dawn-01844.herokuapp.com/carts/${user?.email}`)
            .then(res => res.json())
            .then(data => setCarts(data))
        setCartBuffer(100)
        setCartsProgress(100)


    }, [user?.email])
    return { carts, cartsProgress, cartBuffer }
};

export default UseMyCartsData;