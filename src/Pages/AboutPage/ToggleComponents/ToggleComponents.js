import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ToggleComponents = () => {
    const [alignment, setAlignment] = React.useState('web');
    const [toggle, setToggle] = useState("faq")
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const handleClicked = (e) => {
        setToggle(e.target.value)
    }
    return (
        <div>
            <ToggleButtonGroup
                sx={{ display: 'flex', p: 3, justifyContent: 'center' }}
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton onClick={handleClicked} value="faq">FAQ</ToggleButton>
                <ToggleButton onClick={handleClicked} value="values">our values</ToggleButton>
                <ToggleButton onClick={handleClicked} value="dedication" >our dedication</ToggleButton>
            </ToggleButtonGroup>
            {
                toggle === 'dedication' && <Box>
                    <Typography>
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <img width="100%" src="https://content.thriveglobal.com/wp-content/uploads/2019/02/office-work.jpg" alt="" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography align='center'>
                                    <Typography variant='h6'>
                                        "We Spent Our most of time to give 100% satisfied services"
                                    </Typography>
                                    As a thank you for completing the survey, you'll get the opportunity to enter our prize draw for the chance to win £500 of Nectar points. The official bit - You must be a legal resident of the United Kingdom and 18 years of age or older edback and appreciate you taking the time to help us improve our service to you. Were always looking to improve the experience for our customers like you, so the feedback you give us is vital in helping us evolve the way we operate.
                                    to enter. You can find the official rules of this prize draw by clicking on the Terms and Conditions at the bottom of the page
                                </Typography>
                            </Grid>
                        </Grid>

                    </Typography>
                </Box>
            }
            {
                toggle === 'values' && <Box>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={4}>

                            <Card sx={{ maxWidth: 345, height: 300 }}>

                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://www.meijer.com/content/dam/meijer/campaign/about-meijer/about_competition_2_1.png"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        competition
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Retailing is a fast-paced business that demands continuous improvement. Meijer is committed to keeping our competitive spirit strong and staying nimble and flexible to win in the marketplace.
                                    </Typography>
                                </CardContent>

                            </Card>

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ maxWidth: 345, height: 300 }}>

                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://www.meijer.com/content/dam/meijer/campaign/about-meijer/about_freshness_2_1.png"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        freshness
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Deal n Sale is known for freshness. A focus on fresh food, thinking and innovation makes us better at serving our customers.
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ maxWidth: 345, height: 300 }}>

                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://www.meijer.com/content/dam/meijer/campaign/about-meijer/about_family_2_1.png"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        family
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Meijer is a family business. We believe in treating each other with dignity and respect. We are committed to strengthening the communities we serve.
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            }
            {
                toggle === 'faq' && <Box>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={7}>
                            <img width="100%" src="https://i2.wp.com/multivendorshoppingcarts.com/wp-content/uploads/2019/03/FAQ.gif?fit=800%2C458&ssl=1" alt="" />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Why do I have to register before I can shop?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Because we need to make sure we deliver to your area. That's why your postcode is one of the first things we check.

                                        Also, registering helps us work out stock and delivery info. That way, when you're shopping with us, you'll only ever see the products that are available.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>How do I know if you deliver to my area?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        When you register with us, we'll automatically check your postcode to see if we deliver to your area.

                                        If we don't deliver to you yet, we'll email you as soon as we do.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Is there a delivery charge?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Our description of our delivery charges
                                        Charges may vary depending on your delivery address, the day and time of your chosen slot and the value of your order. All delivery charges will be shown to you before you place your order.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Box>
            }

        </div>
    );
};

export default ToggleComponents;