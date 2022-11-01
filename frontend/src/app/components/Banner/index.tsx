import * as React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import useStyles from './styles';
import { Container } from '@mui/system';

interface BannerProps {
  id: string
  img: string
  link: string
}

const banners: BannerProps[] = [
  {
    id: '0',
    img: require('./assets/banner1.png'),
    link: '',
  },
  {
    id: '1',
    img: require('./assets/banner2.png'),
    link: '',
  },
  {
    id: '2',
    img: require('./assets/banner3.png'),
    link: '',
  },
]

export default function Banner() {

  const classes = useStyles();

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      className={classes.swiper}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,

      }}
      navigation
      pagination={{
        clickable: true,
      }}
      loop
      slidesPerView={1}>
      {
        banners.map((banner: BannerProps, index: number) => {
          return <SwiperSlide key={index} className={classes.banner} >
            <img src={banner.img} />
            <div style={{ height: 0 }}>&nbsp;</div>
          </SwiperSlide>
        })}
    </Swiper >
  );
}