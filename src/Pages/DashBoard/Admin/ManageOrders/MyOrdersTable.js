import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';



const options = ['Payment done', 'Packaging done', 'Shipping done', 'Complete'];
const MyOrdersTable = ({ row }) => {
    const [open, setOpen] = React.useState(false);
    const [active, setActiveStatus] = React.useState(1);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const status = {
        activeStatus: active
    }
    const handleClick = () => {

        if (options[selectedIndex] === 'Packaging done') {
            setActiveStatus(2)
        }
        if (options[selectedIndex] === 'Shipping done') {
            setActiveStatus(3)
        }
        if (options[selectedIndex] === 'Complete') {
            setActiveStatus(4)
        }

        console.info(`You clicked ${options[selectedIndex]}`);

        const url = `http://localhost:5000/status/${row?._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    return (<TableRow key={row?._id}>
        <TableCell align="center">{row?.name}</TableCell>
        <TableCell align="center">{row?.email}</TableCell>
        <TableCell align="center">{row?.carts.map(cart => <p>{cart?.productName}</p>)}</TableCell>
        <TableCell align="center">{row?.carts.map(cart => <p>{cart?.productCode}</p>)}</TableCell>
        <TableCell align="center"> $ {row?.totalPrice}</TableCell>
        <TableCell align="center" style={{ height: '200px' }}> <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={index === 0}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment></TableCell>
    </TableRow>
    );
};

export default MyOrdersTable;