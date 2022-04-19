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
import {
    Outlet,
    Link,
    NavLink
} from "react-router-dom";
import { Button } from '@mui/material';
import UseFireBase from '../../../Hooks/UseFireBase';

const drawerWidth = 200;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const { admin, user } = UseFireBase();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>

            <Typography variant="h4" component="div" sx={{ p: 1 }} gutterBottom  >
                Dashboard
            </Typography>

            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', margin: '10px', borderRadius: '25px', backgroundColor: '#DFDFDF' }}>
                <img src={user?.photoURL} alt="" style={{ borderRadius: '50%', width: '25%' }} />
                <Typography>
                    {user?.displayName}
                </Typography>
            </Box>
            <NavLink
                style={{ textDecoration: 'none', display: "block" }}
                to="/home">
                <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink
                style={{ textDecoration: 'none', display: "block" }}
                to="/dashboard">
                <Button color="inherit">Dashboard</Button>
            </NavLink>

            <NavLink
                style={{ textDecoration: 'none', display: "block" }}
                to="/dashboard/myCarts">
                <Button color="inherit">My Cart</Button>
            </NavLink>

            <NavLink
                style={{ textDecoration: 'none', display: "block" }}
                to="/dashboard/myWishlists">
                <Button color="inherit">My WishList</Button>
            </NavLink>
            <NavLink
                style={{ textDecoration: 'none', display: "block" }}
                to="/dashboard/myOrders">
                <Button color="inherit">My Order</Button>
            </NavLink>  
            <NavLink
                style={{ textDecoration: 'none', display: "block" }}
                to="/dashboard/myPayments">
                <Button color="inherit">My Payments</Button>
            </NavLink>  
            <NavLink
                style={{ textDecoration: 'none', display: "block" }}
                to="/dashboard/inbox">
                <Button color="inherit">Inbox</Button>
            </NavLink>    
            {admin && <Box>
                <Link to={`/dashboard/makeAdmin`}><Button color="inherit">Make Admin</Button></Link>
                <Link to={`/dashboard/addProducts`}><Button color="inherit">Add Products</Button></Link>
            </Box>}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
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
        </Box>
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