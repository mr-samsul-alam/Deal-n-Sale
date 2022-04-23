import React, { useEffect, useState } from 'react';
import UseAuth from '../FireBase/UseAuth';

const UseWish = () => {
    const { user } = UseAuth()
    const [wishes, setWishes] = useState([]);
    const [WishProgress, setProgress] = React.useState(20);
    const [wishBuffer, setBuffer] = React.useState(30);
    useEffect(() => {
        setBuffer(40)
        setProgress(50)
        fetch(`http://localhost:5000/wishes/${user?.email}`)
            .then(res => res.json())
            .then(data => setWishes(data))
        setBuffer(100)
        setProgress(100)


    }, [user?.email])
    return { wishes, WishProgress, wishBuffer }
};

export default UseWish;