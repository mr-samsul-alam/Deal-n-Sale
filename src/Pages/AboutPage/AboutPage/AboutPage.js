import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ToggleComponents from '../ToggleComponents/ToggleComponents';

const AboutPage = () => {

    return (
        <div>
            <NavigationBar></NavigationBar>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img width="100%" src="https://supershop.7uptheme.net/wp-content/uploads/2016/04/about-banner.jpg" alt="" />
                </Box>
                <Typography variant="div" style={{ textAlign: 'center', }}>
                    <Typography variant='h6' style={{ marginTop: '50px' }} > 
                        <span style={{ color: '#FE9C00' }}> Something</span> <span style={{ color: '#283442' }} >About Us</span>
                    </Typography>
                    <hr style={{ width: "100px" }} /> 
                </Typography>
                <ToggleComponents></ToggleComponents>


            </Container>

        </div >
    );
};

export default AboutPage;