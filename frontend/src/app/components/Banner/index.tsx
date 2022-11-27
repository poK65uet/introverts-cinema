import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getBannersThunk } from './slice';

export default function Banner() {

  const store = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!store.banners.getBannerList) {
      dispatch(getBannersThunk())
    };
  }, [store.banners.getBannerList])

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
        store.banners.bannerList.map((banner: any, index: number) => {
          return <SwiperSlide key={index} className={classes.banner} >
            <img src={banner.imageUrl} />
            <div style={{ height: 0 }}>&nbsp;</div>
          </SwiperSlide>
        })}
    </Swiper >
  );
}