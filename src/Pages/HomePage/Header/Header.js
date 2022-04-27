import React from 'react';
import NavigationBar from '../../Shared/NavigationBar/NavigationBar';
import img1 from "../../../images/slide1.jpg"
import img2 from "../../../images/slide2.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { Container } from '@mui/material';
const Header = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Container style={{marginTop:'5px',position:"relative"}}>
                <Swiper
                 style={{position:"relative"}}
                    loop={true} autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }} pagination={{
                        clickable: true,
                    }} modules={[Autoplay]}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={img1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img2} alt="" />
                    </SwiperSlide>

                </Swiper>
            </Container>

        </div>
    );
};

export default Header;