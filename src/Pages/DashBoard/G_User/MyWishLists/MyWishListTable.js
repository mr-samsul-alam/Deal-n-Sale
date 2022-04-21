import { Button, TableCell, TableRow, TextField } from '@mui/material';
import React from 'react';

const MyWishListTable = ({ row, wish, setWish }) => {
    const deleteCart = (id) => {
        alert('R u Sure U wanna Delete')
        console.log(id);
        const url = `http://localhost:5000/wishes/${id}`
        console.log(url);
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.deletedCount)
                if (data.deletedCount > 0) {
                    alert('Deleted successfully');
                    const remainingUsers = wish.filter(user => user._id !== id);
                    setWish(remainingUsers);
                }
            });

    }
    return (
        <TableRow key={row?._id}>
            <TableCell width="150px" ><img width="100%" src={row?.productImg} alt="" /></TableCell>
            <TableCell align="center">{row?.productName}</TableCell>
            <TableCell width="100px" align="center">
                <TextField
                    type="number" defaultValue={row?.quantity}
                />
            </TableCell>
            <TableCell align="center">{row?.price}</TableCell>
            <TableCell align="center">{row?.paymentStatus}</TableCell>
            <TableCell align="center"> <Button onClick={() => deleteCart(row?._id)} >Delete</Button> </TableCell>
            {/* <TableCell align="right">{ccyFormat(row?.price)}</TableCell> */}
        </TableRow>

    );
};

export default MyWishListTable;