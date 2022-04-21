import { Button, ButtonGroup, TableCell, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react';

const MyCartTable = ({ row, cart, setCart }) => {
    const [quantity, setQuantity] = useState(parseFloat(row?.quantity));
    console.log(row)
    const deleteCart = (productCode) => {
        alert('R u Sure U wanna Delete')
        console.log(productCode);
        const url = `http://localhost:5000/cart/${productCode}`
        console.log(url);
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.deletedCount)
                if (data.deletedCount > 0) {
                    alert('Deleted successfully');
                    const remainingUsers = cart.filter(user => user.productCode !== productCode);
                    setCart(remainingUsers);
                }
            });

    }
    //updating quantity and price and also showing live price on site according to quantity 
    const upDate = (prop, quantity) => {
        if (quantity >= 1) {
            if (prop === "plus") {
                setQuantity(quantity + 1);
                // const price = product?.price;
                // let newPrice = price * (quantity + 1);
                // setPrice(newPrice)
            }
            else {
                setQuantity(quantity - 1)
                // const price = product?.price;
                // let newPrice = price * (quantity - 1);
                // console.log(newPrice);
                // setPrice(newPrice)
            }

        }
        else if (quantity >= 0) {
            if (prop === "plus") {
                setQuantity(quantity + 1);
                // const price = product?.price;
                // let newPrice = price * quantity;
                // console.log(newPrice);
                // setPrice(newPrice)
            }
        }
    }
    return (
        <TableRow key={row?._id}>
            <TableCell width="150px" ><img width="100%" src={row?.productImg} alt="" /></TableCell>
            <TableCell align="center">{row?.productName}</TableCell>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick={() => upDate("mynas", quantity)}>-</Button>
                <Button>{quantity}</Button>
                <Button onClick={() => upDate("plus", quantity)}>+</Button>
            </ButtonGroup>

            <TableCell align="center">{row?.price * row?.quantity}</TableCell>


            <TableCell align="center">{row?.paymentStatus}</TableCell>
            <TableCell align="center"> <Button
                onClick={() => deleteCart(row?.productCode)} >Delete</Button> </TableCell>
            {/* <TableCell align="right">{ccyFormat(row?.price)}</TableCell> */}
        </TableRow>
    );
};

export default MyCartTable;