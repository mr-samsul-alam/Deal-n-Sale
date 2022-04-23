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
            <Typography variant='h3' style={{ textAlign: 'center', marginTop: '20px' }}>
                My wishes
            </Typography>
            {
                wish.length === 0 ? (<h1 style={{ textAlign: 'center' }} >Sir u do not have any wish</h1>) : (<div style={{ display: "flex", justifyContent: 'center', marginTop: '50px' }}>
                    <TableContainer style={{ width: '1000px', }} component={Paper}>
                        <Table sx={{ minWidth: 700, }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" >Picture</TableCell>
                                    <TableCell align="center">Product Name</TableCell>
                                    <TableCell align="center">Count</TableCell>
                                    <TableCell align="center">Per Unit</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {wish.map((row) => (<MyWishListTable row={row} setWish={setWish} wish={wish} ></MyWishListTable>))}

                                <Button>Proceed to payment</Button>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>)
            }

        </>
    );
};

export default MyWishLists;