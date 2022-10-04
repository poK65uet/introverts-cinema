import React from 'react';
import useStyles from './styles';
import {
  Container,
  Divider,
  Typography
} from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow";

export default function NewMovieList() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Divider sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={900}>
          Phim Đang Chiếu
        </Typography>
      </Divider>
      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        effect='coverflow'
        centeredSlides
        coverflowEffect={{
          rotate: 25,
          stretch: -15,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        loop
        slidesPerView={5}>
        <SwiperSlide className={classes.movie}>Phim 1</SwiperSlide>
        <SwiperSlide className={classes.movie}>Phim 2</SwiperSlide>
        <SwiperSlide className={classes.movie}>Phim 3</SwiperSlide>
        <SwiperSlide className={classes.movie}>Phim 4</SwiperSlide>
        <SwiperSlide className={classes.movie}>Phim 5</SwiperSlide>
      </Swiper>
    </Container>
  );

}


