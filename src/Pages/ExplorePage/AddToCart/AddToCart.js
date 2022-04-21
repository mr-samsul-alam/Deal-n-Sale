import React from 'react';
import { addToDb } from '../../../Utilities/SavedToLocalStorage';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Container, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../../AuthenticationPage/PrivateRoute/PrivateRoute';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddToCart = (props) => {
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [wishSuccess, setWishSuccess] = React.useState(false);
    const handleClose = () => setOpen(false);
    const { productName, productImg, quantity, price } = props?.CartDetails || []
    const navigate = useNavigate()

    //Sending Data To Cart Details
    const handleAddToCart = () => {
        setOpen(false)
        fetch('http://localhost:5000/carts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(props.CartDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess(true);
                }
            });
        console.log('submitted')

    }
    const handleSuccessClose = () => {
        setSuccess(false);
    };
    const handleAddToCartBtn = () => {
        setOpen(true)
    }
    //Sending data to local storage
    const handleWish = () => {
        fetch('http://localhost:5000/wishes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(props.CartDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setWishSuccess(true);
                }
            });
        console.log('wished added submitted')
    }

    const goToMyCart = () => {
        navigate('/dashboard/myCarts')
    }
    const goToMyWish = () => {
        navigate('/dashboard/myWishlists')
    }
    return (
        <div>
            {
                success ? (<Button style={{ display: 'block', margin: '10px' }} variant="contained" size="large" onClick={goToMyCart}>Check Cart <ShoppingCartCheckoutIcon /></Button>) : ''
            }
            <Button style={{ display: 'block', margin: '10px' }} variant="contained" size="large" onClick={handleAddToCartBtn}>Add to Cart</Button>
            {
                wishSuccess && <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    wishes Added successfully!
                </Alert>
            }
            {
                wishSuccess ? (<Button style={{ display: 'block', margin: '10px' }} variant="contained" size="large" onClick={goToMyWish}>My Wish <CardGiftcardIcon /> </Button>) : ''
            }
            <Button style={{ display: 'block', margin: '10px' }} variant="contained" size="large" onClick={handleWish}>Add to Wish</Button>
            {/* modal's code  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} >
                        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mx: 1 }}>
                                Add To Cart
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                                <img src={productImg} width="50%" alt="" />
                            </Typography>
                            <Typography id="transition-modal-description"  >
                                Product Name : {productName}
                            </Typography>
                            <Typography id="transition-modal-description"  >
                                Product Quantity : {quantity}
                            </Typography>
                            <Typography id="transition-modal-description"  >
                                Net Price : {price}
                            </Typography>
                            {
                                <PrivateRoute><Button onClick={handleAddToCart} variant="contained">ok</Button></PrivateRoute>
                            }

                        </Container>
                    </Box>
                </Fade>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={success}
                autoHideDuration={6000}
                onClose={handleSuccessClose}
                style={{ marginTop: '80px', marginRight: '80px' }}
            >
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Added Product successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddToCart;