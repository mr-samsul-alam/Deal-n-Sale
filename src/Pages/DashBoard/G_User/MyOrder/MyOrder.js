import { Backdrop, Box, Button, Container, Fade, Modal, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';
import UseAuth from '../../../../FireBase/UseAuth';

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

const steps = [
    'payment Done',
    'Order On packaging',
    'Order On Ship',
    'Order Complete'
];
const MyOrder = () => {
    const { user } = UseAuth()
    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {
        fetch(`https://sleepy-dawn-01844.herokuapp.com/payments/${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Container>
                <h1 style={{ textAlign: 'center' }} >Order's Update Page</h1>
                {orders.length === 0 ? (<h1 style={{ textAlign: 'center' }} >Sir u do not have any order</h1>) : (orders.map(order => order.payment !== 'pending' && (<Box
                    style={{
                        border: "2px solid blue",
                        padding: '20px'
                    }}
                >

                    <Box style={{ display: 'flex', justifyContent: 'center', }}>
                        <Box >
                            <p>Name:{order?.name}</p>
                            <p>Email:{order?.email}</p>
                        </Box>
                        <Box>
                            <Button variant='contained' onClick={handleOpen}>Details</Button>
                        </Box>

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
                                <Box sx={style}>
                                    {
                                        (order?.carts).map(cart => <Box>
                                            <img src={cart?.productImg} width='50%' alt="" />
                                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                                Products Name:<b>{cart?.productName}</b>
                                            </Typography>
                                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                                Quantity : <b>{cart?.quantity}</b>
                                            </Typography>
                                        </Box>)
                                    }
                                </Box>
                            </Fade>
                        </Modal>
                    </Box>
                    <Stepper activeStep={order?.activeStatus} alternativeLabel >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}

                    </Stepper>

                </Box>)))}

            </Container>
        </>
    );
};

export default MyOrder;