import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AlignHorizontalRightOutlinedIcon from '@mui/icons-material/AlignHorizontalRightOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import {
    Outlet,
    NavLink,
    useNavigate
} from "react-router-dom";
import { Avatar, Badge, Button, ButtonGroup, Menu, MenuItem } from '@mui/material';
import UseMyCartsData from '../../../Hooks/UseMyCartsData';
import UseAuth from '../../../FireBase/UseAuth';
import UseWish from '../../../Hooks/UseWish';
import ReviewsIcon from '@mui/icons-material/Reviews';
const drawerWidth = 250;

function Dashboard(props) {
    let navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { carts } = UseMyCartsData()
    const { wishes } = UseWish()
    const { adminStatus, adminSuperStatus, user, logout } = UseAuth();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    //jbjb
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        console.log('user icon clicked');
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    //hvbhgyhbj
    const goToMyAccount = () => {
        navigate('/dashboard/myAccount')
    }
    const notifitionCLick = () => {
        console.log('notification clicked')
    }
    const handleLogOut = () => {
        logout()
    }


    const drawer = (
        <div>

            <Typography variant="h4" component="div" sx={{ p: 1 }} gutterBottom  >
                Dashboard
            </Typography>

            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', margin: '10px', borderRadius: '25px', backgroundColor: '#DFDFDF' }}>
                <Box>
                    {
                        user.photoURL ? (<img src={user.photoURL} style={{ borderRadius: "50%", width: "50%" }} alt="User" />)
                            :
                            (<Avatar style={{ color: 'black' }} {...stringAvatar(user?.displayName)} />)
                    }
                </Box>
                <Box>
                    {user?.displayName}
                </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ display: 'flex', flexDirection: 'column', }}>

                <NavLink
                    style={{ textDecoration: 'none', display: "block" }}
                    to="/home">
                    <Button variant="text" style={{ color: '#283442' }} > <ArrowLeftOutlinedIcon style={{ margin: '15px' }} /> Home</Button>
                </NavLink>
                <NavLink
                    style={{ textDecoration: 'none', display: "block" }}
                    to="/dashboard">
                    <Button variant="text" style={{ color: '#283442' }} > <DashboardIcon style={{ margin: '15px' }} /> Dashboard</Button>
                </NavLink>

                <NavLink
                    style={{ textDecoration: 'none', display: "block" }}
                    to="/dashboard/myCarts">
                    <Button variant="text" style={{ color: '#283442' }}> <Badge badgeContent={carts?.length} color="warning" style={{ margin: '15px' }}>
                        <ShoppingCartOutlinedIcon color="action" />
                    </Badge>My Cart</Button>
                </NavLink>

                <NavLink
                    style={{ textDecoration: 'none', display: "block" }}
                    to="/dashboard/myWishlists">
                    <Button variant="text" style={{ color: '#283442' }}>
                        <Badge badgeContent={wishes?.length} color="warning" style={{ margin: '15px' }}>
                            <FavoriteBorderOutlinedIcon color="action" />
                        </Badge>My WishList</Button>
                </NavLink>
                <NavLink
                    style={{ textDecoration: 'none', display: "block" }}
                    to="/dashboard/myPayments">
                    <Button variant="text" style={{ color: '#283442' }} > <PaymentOutlinedIcon style={{ margin: '15px' }} /> My Payments</Button>
                </NavLink>
                <NavLink
                    style={{ textDecoration: 'none', display: "block" }}
                    to="/dashboard/myOrders">
                    <Button variant="text" style={{ color: '#283442' }}> <ShoppingBagOutlinedIcon style={{ margin: '15px' }} /> My Order</Button>
                </NavLink>
                <NavLink
                    style={{ textDecoration: 'none', display: "block" }}
                    to="/dashboard/myAccount">
                    <Button variant="text" style={{ color: '#283442' }}  > <AccountCircleOutlinedIcon style={{ margin: '15px' }} />MY Account</Button>
                </NavLink>
                <NavLink
                    style={{ textDecoration: 'none', display: "block" }}
                    to="/dashboard/giveReviews">
                    <Button variant="text" style={{ color: '#283442' }}  > <ReviewsIcon style={{ margin: '15px' }} />Give Review</Button>
                </NavLink>
                <Divider></Divider>
                {adminStatus && <Box>
                    <NavLink
                        style={{ textDecoration: 'none', display: "block" }}
                        to="/dashboard/addProducts">
                        <Button variant="text" style={{ color: '#283442' }} > <AddBoxIcon style={{ margin: '15px' }} />Add Products</Button>
                    </NavLink>
                    <NavLink
                        style={{ textDecoration: 'none', display: "block" }}
                        to="/dashboard/manageOrder">
                        <Button variant="text" style={{ color: '#283442' }} > <ManageHistoryIcon style={{ margin: '15px' }} />Manege Order</Button>
                    </NavLink>
                </Box>}
                {adminSuperStatus && <Box>
                    <NavLink
                        style={{ textDecoration: 'none', display: "block" }}
                        to="/dashboard/admins">
                        <Button variant="text" style={{ color: '#283442' }} > <PersonAddAltIcon style={{ margin: '15px' }} /> Manage Admins</Button>
                    </NavLink>
                </Box>}
                <Button variant="text" onClick={handleLogOut} > <LogoutIcon style={{ margin: '15px' }} />Sign Out</Button>
            </ButtonGroup>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    function stringAvatar(name) {
        return {
            children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
        };
    }
    return (
        <Box sx={{ display: 'flex', backgroundColor: '#CFF1FE' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }, backgroundColor: '#283442'
                }}
            >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <AlignHorizontalRightOutlinedIcon />

                    </IconButton>

                    <Typography>
                        Welcome Back
                    </Typography>
                    <Box style={{ padding: '1px', margin: '10px', borderRadius: '25px', backgroundColor: '#DFDFDF', width: '150px', height: '70x' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>





                            <Button>
                                <Badge badgeContent={1} color="warning"  >
                                    <NotificationsActiveOutlinedIcon style={{ color: 'black' }} onClick={notifitionCLick} />
                                </Badge>
                            </Button>
                            <Button onClick={handleClick}>
                                {
                                    user.photoURL ? (<img src={user.photoURL} style={{ borderRadius: "50%", width: "75%" }} alt="User" />)
                                        :
                                        (<Avatar style={{ color: 'black' }} {...stringAvatar(user?.displayName)} />)
                                }
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={goToMyAccount} > <AccountCircleOutlinedIcon style={{ margin: '5px' }} />My Account</MenuItem>
                                <MenuItem onClick={handleLogOut}><LogoutIcon style={{ margin: '8px' }} /> Logout</MenuItem>
                            </Menu>
                        </Box>

                    </Box>
                </Toolbar>

            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet></Outlet>
            </Box>
        </Box >
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;