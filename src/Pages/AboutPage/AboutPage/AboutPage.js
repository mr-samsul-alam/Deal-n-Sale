import { Box, Button, ButtonGroup, Container, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const AboutPage = () => {
    const [alignment, setAlignment] = React.useState('web');
    const [toggle, setToggle] = useState("store")
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const handleClicked = (e) => {
        setToggle(e.target.value)
    }
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img width="100%" src="https://supershop.7uptheme.net/wp-content/uploads/2016/04/about-banner.jpg" alt="" />
                </Box>



                <ToggleButtonGroup
                    sx={{ display: 'flex', p: 3, justifyContent: 'center' }}
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton onClick={handleClicked} value="store">Sopping in Store</ToggleButton>
                    <ToggleButton onClick={handleClicked} value="online" >Shopping in online</ToggleButton>
                    <ToggleButton onClick={handleClicked} value="job">Our Job vacancy</ToggleButton>
                </ToggleButtonGroup>
                {
                    toggle === 'store' && <Box>
                        <Typography>
                            As a thank you for completing the survey, you'll get the opportunity to enter our prize draw for the chance to win £500 of Nectar points. The official bit - You must be a legal resident of the United Kingdom and 18 years of age or older edback and appreciate you taking the time to help us improve our service to you. Were always looking to improve the experience for our customers like you, so the feedback you give us is vital in helping us evolve the way we operate.
                            to enter. You can find the official rules of this prize draw by clicking on the Terms and Conditions at the bottom of the page
                        </Typography>
                    </Box>
                }
                {
                    toggle === 'online' && <Box>
                        <Typography>
                            you forAs a thank you for completing the survey, you'll get the opportunity to enter our prize draw for the chance to win £500 of Nectar points. The official bit - You must be a legal resident of the United Kingdom and 18 years of age or older  the time to help us improve our service to you. Were always looking to improve the experience for our customers like you, so the feedback you give us is vital in helping us evolve the way we operate.
                            As a thank you for completing the survey, you'll get the opportunity to enter our prize draw for the chance to win £500 of Nectar points. The official bit - You must be a legal resident of the United Kingdom and 18 years of age or older to enter. You can find the official rules of this prize draw by clicking on the Terms and Conditions at the bottom of the page
                        </Typography>
                    </Box>
                }
                {
                    toggle === 'job' && <Box>
                        <Typography>
                            Thank you for generously agreeing to take part and giving us some of your valuable time we really appreciate it. We value your honest feedback and appreciate you taking the time to help us improve our service to you. Were always looking to improve the experience for our customers like you, so the feedback you give us is vital in helping us evolve the way we operate.
                            As a thank you for completing the survey, you'll get the opportunity to enter our prize draw for the chance to win £500 of Nectar points. The official bit - You must be a legal resident of the United Kingdom and 18 years of age or older to enter. You can find the official rules of this prize draw by clicking on the Terms and Conditions at the bottom of the page
                        </Typography>
                    </Box>
                }

            </Container>

        </div>
    );
};

export default AboutPage;