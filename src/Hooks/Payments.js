import React, { useEffect, useState } from 'react';
import UseAuth from '../FireBase/UseAuth';

const Payments = () => {
    const { user } = UseAuth()
    const [pendingPay, setPendingPayment] = useState([]);
    const [progress, setProgress] = React.useState(20);
    const [buffer, setBuffer] = React.useState(30);
    useEffect(() => {
        setBuffer(40)
        setProgress(50)
        fetch(`http://localhost:5000/payments/${user?.email}`)
            .then(res => res.json())
            .then(data => setPendingPayment(data))
        setBuffer(100)
        setProgress(100)
    }, [user?.email])
    return { pendingPay, progress, buffer }
};

export default Payments;