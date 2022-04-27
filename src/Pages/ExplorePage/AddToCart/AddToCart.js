import React from 'react';
import { addToDb } from '../../../Utilities/SavedToLocalStorage';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Container, Snackbar } from '@mui/material';
import PrivateRoute from '../../AuthenticationPage/PrivateRoute/PrivateRoute';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
    const [wishModal, setWishModal] = React.useState(false);
    const { productName, productImg, quantity, price } = props?.CartDetails || []

    //Sending Data To Cart Details
    const handleAddToCart = () => {
        setOpen(false)
        fetch('https://sleepy-dawn-01844.herokuapp.com/carts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(props.CartDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    props?.setSuccess(true);
                }
            });
        console.log('submitted')

    }
    const handleClose = () => setOpen(false);
    const handleWishClose = () => setWishModal(false);

    const handleSuccessClose = () => {
        props?.setSuccess(false);
    };
    const handleWishesClose = () => {
        props?.setWishSuccess(false);
    };
    const handleAddToCartBtn = () => {
        setOpen(true)
    }
    const handleWishBtn = () => {
        setWishModal(true)

    }
    //Sending data to local storage
    const handleWish = () => {
        setWishModal(false)
        fetch('https://sleepy-dawn-01844.herokuapp.com/wishes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(props.CartDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    props?.setWishSuccess(true);
                }
            });
        console.log('wished added submitted')
    }


    return (
        <div style={{display:'flex',justifyContent:'center'}}>

            <div style={{display:'flex', justifyContent:'space-between',width:"200px"}}>
                <Button style={{ margin: '10px' }} variant="contained" size="large" onClick={handleAddToCartBtn}> <AddShoppingCartIcon /> </Button>

                <Button style={{ margin: '10px' }} variant="contained" size="large" onClick={handleWishBtn}><FavoriteBorderIcon /> </Button>
            </div>
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
                                Net Price : $ {props?.newPrice}
                            </Typography>
                            <Typography>
                                {
                                    <PrivateRoute><Button onClick={handleAddToCart} variant="contained">Add</Button></PrivateRoute>
                                }
                            </Typography>


                        </Container>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={wishModal}
                onClose={handleWishClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={wishModal}>
                    <Box sx={style} >
                        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mx: 1 }}>
                                Add To Wish
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
                                Net Price : $ {props?.newPrice}
                            </Typography>
                            <Typography>
                                {
                                    <PrivateRoute><Button onClick={handleWish} variant="contained">Wish</Button></PrivateRoute>
                                }
                            </Typography>


                        </Container>
                    </Box>
                </Fade>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={props?.success}
                autoHideDuration={6000}
                onClose={handleSuccessClose}
                style={{ marginTop: '80px', marginRight: '80px' }}
            >
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Added <b>Cart</b> successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={props?.wishSuccess}
                autoHideDuration={6000}
                onClose={handleWishesClose}
                style={{ marginTop: '80px', marginRight: '80px' }}
            >
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>

                    Added <b>Wish</b> successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddToCart;