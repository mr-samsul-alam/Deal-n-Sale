import React, { useEffect, useState } from 'react';
import UseFireBase from './UseFireBase';

const UseMyCartsData = () => {
    const { user } = UseFireBase()
    const [carts, setCarts] = useState([]);
    const [progress, setProgress] = React.useState(20);
    const [buffer, setBuffer] = React.useState(30);
    useEffect(() => {
        setBuffer(40)
        setProgress(50)
        fetch(`http://localhost:5000/carts/${user?.email}`)
            .then(res => res.json())
            .then(data => setCarts(data))
        setBuffer(100)
        setProgress(100)


    }, [user?.email])
    return { carts, progress, buffer }
};

export default UseMyCartsData;