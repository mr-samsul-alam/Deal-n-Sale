import { Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UseWish from '../../../../Hooks/UseWish';
import MyWishListTable from './MyWishListTable';

const MyWishLists = () => {
    const { wishes, WishProgress, wishBuffer } = UseWish()
    const [wish, setWish] = useState(wishes)



    useEffect(() => {
        setWish(wishes)
    }, [wishes])
    return (
        <>
            <LinearProgress variant="buffer" value={WishProgress} valueBuffer={wishBuffer} />
            <Typography variant='h3' style={{ display: "flex", justifyContent: 'center', marginTop: '20px' }}>
                My wishes
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
                            {wish.map((row) => (<MyWishListTable row={row} setWish={setWish} wish={wish} ></MyWishListTable>))}
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

export default MyWishLists;