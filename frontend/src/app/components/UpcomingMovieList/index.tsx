import React from 'react';
import useStyles from './styles';
import {
  Container,
  Divider,
  Typography
} from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow";

export default function UpcomingMovieList() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Divider sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={900}>
          Phim Sắp Chiếu
        </Typography>
      </Divider>
      <Swiper
        modules={[Autoplay, Navigation]}
        className={classes.movieList}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        loop
        centeredSlides
        spaceBetween={1}
        slidesPerView={7}>
        <SwiperSlide className={classes.movie}>Phim 1</SwiperSlide>
        <SwiperSlide className={classes.movieblue}>Phim 2</SwiperSlide>
        <SwiperSlide className={classes.moviegreen}>Phim 3</SwiperSlide>
        <SwiperSlide className={classes.movieblack}>Phim 4</SwiperSlide>
        <SwiperSlide className={classes.moviered}>Phim 5</SwiperSlide>
      </Swiper>
    </Container>
  );

}


