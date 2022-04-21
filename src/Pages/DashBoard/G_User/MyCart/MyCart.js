import React, { useEffect, useState } from 'react';
import UseMyCartsData from '../../../../Hooks/UseMyCartsData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, LinearProgress, TextField, Typography } from '@mui/material';
import MyCartTable from './MyCartTable';



const MyCart = () => {
    const { carts, cartsProgress, cartBuffer } = UseMyCartsData()
    const [cart, setCart] = useState(carts)




    useEffect(() => {
        setCart(carts)
    }, [carts])
    return (
        <>
            <LinearProgress variant="buffer" value={cartsProgress} valueBuffer={cartBuffer} />
            <Typography variant='h3' style={{ display: "flex", justifyContent: 'center', marginTop: '20px' }}>
                My Cart
            </Typography>
            <div style={{ display: "flex", justifyContent: 'center', marginTop: '50px' }}>
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
                            {cart.map((row) => <MyCartTable row={row} setCart={setCart} cart={cart}></MyCartTable>)}
                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell align="center" colSpan={2}>Subtotal</TableCell>
                                {/* <TableCell align="center">{row?.price}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell>Tax</TableCell>
                                {/* <TableCell align="center">{`${(row?.price / 100)?.toFixed(0)} %`}</TableCell> */}
                                {/* <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell> */}
                            </TableRow>
                            <TableRow>
                                {/* <TableCell colSpan={2}>Total = {row?.price}</TableCell> */}
                                {/* <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell> */}
                            </TableRow>


                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>

    );
};

export default MyCart;