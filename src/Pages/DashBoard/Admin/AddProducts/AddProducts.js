import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, Container, Divider, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddProducts = () => {
    const [bookingInfo, setBookingInfo] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookingInfo(newInfo);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleBookingSubmit = e => {
        // send to the server
        console.log(bookingInfo)
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setOpen(true);
                    e.target.reset();
                }
            });

        e.preventDefault();
    }

    return (
        <Container style={{ border: '2px solid  #FFE7D9',backgroundColor:'#FFFFFF' , paddingTop: '20px', paddingBottom: '30px' }}>
            <Typography variant='h4' style={{ textAlign: 'center', justifyContent: "center", padding: '10px' }}>
                Add Product's
            </Typography>
            <Divider />
            <Divider />
            <form onSubmit={handleBookingSubmit} style={{padding:'10px'}}>

                <TextField
                    // required
                    sx={{ width: '96%', m: 1 }}
                    id="outlined-size-small"
                    name="mainPicture"
                    label="Main Picture Link"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    name="picture2"
                    label="2nd Picture"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    name="picture3"
                    label="3'rd Picture"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    name="picture4"
                    label="4'th Picture"
                    onBlur={handleOnBlur}
                    size="small"
                />

                <TextField
                    // required
                    sx={{ width: '96%', m: 1 }}
                    id="outlined-size-small"
                    label="Products Name"
                    name="productName"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    label="Brand Name"
                    name="brand"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    label="Category"
                    name="category"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    label="Sub Category"
                    name="subCategory"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    label="Product Id By Category"
                    name="id_by_category"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    label="Product Id By Sub Category"
                    name="subCategory"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    type="number"
                    sx={{ width: '31%', m: 1 }}
                    id="outlined-size-small"
                    name="price"
                    label=" Product Price"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    type="number"
                    sx={{ width: '47%', m: 1 }}
                    id="outlined-size-small"
                    name="quantity"
                    label=" Product Quantity"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    type="number"
                    sx={{ width: '47%', m: 1 }}
                    id="outlined-size-small"
                    name="rating"
                    label=" Product Rating"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <TextField
                    // required
                    sx={{ width: '96%', m: 1 }}
                    id="outlined-size-small"
                    label="Description"
                    name="description"
                    onBlur={handleOnBlur}
                    size="small"
                />
                <Button sx={{ display: 'block', mx: 'auto', paddingX: 3, marginTop: 4 }} type="submit" variant="contained">Submit</Button>
            </form>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                style={{ marginTop: '80px', marginRight: '80px' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Added Product successfully!
                </Alert>
            </Snackbar>
        </Container >
    );
};

export default AddProducts;