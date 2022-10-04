import * as React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import useStyles from './styles';

export default function Banner() {

  const classes = useStyles();

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      className={classes.banner}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{
        clickable: true,
      }}
      loop
      slidesPerView={1}>
      <SwiperSlide className={classes.movie}>Phim 1</SwiperSlide>
      <SwiperSlide className={classes.movie}>Phim 2</SwiperSlide>
      <SwiperSlide className={classes.movie}>Phim 3</SwiperSlide>
      <SwiperSlide className={classes.movie}>Phim 4</SwiperSlide>
      <SwiperSlide className={classes.movie}>Phim 5</SwiperSlide>
    </Swiper>
  );
}