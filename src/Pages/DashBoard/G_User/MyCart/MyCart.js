import React, { useEffect, useState } from 'react';
import UseMyCartsData from '../../../../Hooks/UseMyCartsData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, LinearProgress, Typography } from '@mui/material';
import MyCartTable from './MyCartTable';
import { useNavigate } from 'react-router-dom';
import UseAuth from '../../../../FireBase/UseAuth';



const MyCart = () => {
    const { carts, cartsProgress, cartBuffer } = UseMyCartsData()
    const { user } = UseAuth()
    const navigate = useNavigate()
    const [cart, setCart] = useState(carts)
    useEffect(() => {
        setCart(carts)
    }, [carts])



    const gdTotal = cart?.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)

    // making object for sending db
    const CartDetails = {
        email: `${user?.email}`,
        name: `${user?.displayName}`,
        carts: carts,
        totalPrice: parseFloat(gdTotal),
        payment: 'pending',
        activeStatus: 0
    }
    const handlePayments = () => {
        fetch('https://sleepy-dawn-01844.herokuapp.com/payments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(CartDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log("added to payment page successfully")
                }
            });
        console.log('submitted')
        const url = `https://sleepy-dawn-01844.herokuapp.com/allCarts/${user?.email}`
        console.log(url);
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.deletedCount)
                if (data.deletedCount > 0) {
                    setCart([]);
                    navigate('/dashboard/myPayments')

                }
            });




    }

    return (
        <>
            <LinearProgress variant="buffer" value={cartsProgress} valueBuffer={cartBuffer} />
            <Typography variant='h3' style={{ textAlign: 'center', marginTop: '20px' }}>
                My Cart
            </Typography>

            {
                cart.length === 0 ? (<h1 style={{ textAlign: 'center' }} >Sir u donot have any cart</h1>) : (<div style={{ display: "flex", justifyContent: 'center', marginTop: '50px' }}>
                    <TableContainer style={{ width: '1000px', }} component={Paper}>
                        <Table sx={{ minWidth: 700, }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" >Picture</TableCell>
                                    <TableCell align="center">Product Name</TableCell>
                                    <TableCell align="center">Count</TableCell>
                                    <TableCell align="center">Total</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((row) => <MyCartTable key={row?._id} row={row} setCart={setCart} cart={cart}></MyCartTable>)}
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center" >Subtotal = $ {gdTotal} </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center">Tax 10% = $ {((gdTotal / 100) * 10)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center">Total = $ {((gdTotal / 100) * 10) + parseFloat(gdTotal)}</TableCell>
                                    {/* <TableCell colSpan={2}>Total = {row?.price}</TableCell> */}
                                    {/* <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell> */}
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button variant='contained' onClick={handlePayments} >Complete PayMent</Button>
                    </TableContainer>
                </div>)
            }


        </>

    );
};

export default MyCart;