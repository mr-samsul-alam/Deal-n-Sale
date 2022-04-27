import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
import { Avatar, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import UseAuth from '../../../FireBase/UseAuth';
import SearchBox from './SearchBox/SearchBox';

const NavigationBar = () => {
  const { user, logout } = UseAuth()
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [dashboard, setDashboard] = React.useState("");

  const pages = ['Home', 'Explore', 'About', `${dashboard}`]

  useEffect(() => {
    user?.email ? setDashboard("Dashboard") : setDashboard("")
  }, [user?.email])

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handleNavClicked = (page) => {
    switch (page) {
      case "Home": navigate('/home')
        break;
      case "Explore": navigate('/explore')
        break;
      case "About": navigate('/about')
        break;
      case "Dashboard": navigate('/dashboard')
        break;
      default: navigate('/home')
    }


  }
  const handleLogOut = () => {
    logout()
  }
  const goToLogIn = () => {
    navigate('/signIn')
  }
  const gotToMyAccount = () => {
    navigate('/dashboard/myAccount')
  }
  const gotToDashboard = () => {
    navigate('/dashboard')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function stringAvatar(name) {
    return {
      children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
  }

  const handleSearch = (e) => {
    e.preventDefault()
    e.target.reset();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#283442" }} >
        <Container maxWidth="xl" style={{ display: 'flex', justifyContent: 'space-around', position: "relative" }} >
          <Toolbar disableGutters >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, marginRight: '150px', display: { xs: 'none', md: 'flex' } }}
            >
              Deal&Sale
            </Typography>
            <Box sx={{ backgroundColor: '#283442', }}>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', width: '100%', position: "relative" }}>
                <Paper component="form" sx={{ width: '500px', marginRight: '50px', display: 'flex', justifyContent: 'space-between' }} onSubmit={handleSearch} >
                  <SearchBox></SearchBox>
                </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        style={{ fontWeight: "700", color: 'white', }}
                        onClick={() => handleNavClicked(page)}>{page}</Typography>
                    </MenuItem>
                  ))}
                </Box>
              </Box>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Deal&Sale
            </Typography>




            <Box sx={{ flexGrow: 0 }}>
              {
                user.email ? <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                >
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    {
                      user.photoURL ? (<img src={user.photoURL} style={{ borderRadius: "50%", width: "50%" }} alt="User" />)
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
                    <MenuItem onClick={gotToDashboard}>Dashboard</MenuItem>
                    <MenuItem onClick={gotToMyAccount}>MyAccount</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </div> : <Button onClick={goToLogIn} style={{ color: 'white' }}  >Login</Button>
              }

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ backgroundColor: '#283442', }}>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center', width: '100%' }}>
          <Paper component="form" sx={{ width: '90%', display: 'flex', justifyContent: 'space-between' }} onSubmit={handleSearch} >
            <SearchBox></SearchBox>
          </Paper>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  style={{ fontWeight: "700", color: 'white', }}
                  onClick={() => handleNavClicked(page)}>{page}</Typography>
              </MenuItem>
            ))}
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default NavigationBar;