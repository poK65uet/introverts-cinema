import React from 'react';
import useStyles from './styles';
import {
  Container,
  Divider,
  Typography
} from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper"
import { MovieCard } from 'app/components/MovieCard';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow";

export default function NewMovieList(this: any) {

  const classes = useStyles();

  interface MovieProps {
    id: number;
    name: string;
    img: string;
    genre?: string;
  }

  const newMovies: MovieProps[] = [
    {
      id: 0,
      name: 'Bỗng Dưng Trúng Số',
      img: require('./assets/images/movie1.png'),
    },
    {
      id: 1,
      name: 'Mười: Lời Nguyền Trở Lại',
      img: require('./assets/images/movie2.png'),
    },
    {
      id: 2,
      name: 'Cười',
      img: require('./assets/images/movie3.png'),
    },
    {
      id: 3,
      name: 'Ngược Dòng Thời Gian Để Yêu Anh',
      img: require('./assets/images/movie4.png'),
    },
    {
      id: 4,
      name: 'Avatar',
      img: require('./assets/images/movie5.png'),
    },
    {
      id: 5,
      name: 'Evangelion: 3.0+1.01 Ba Lần Ngày Xưa',
      img: require('./assets/images/movie6.png')
    }
  ]

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
          delay: 5000,
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

        {
          newMovies.map((movie: MovieProps, index: number) => {
            return <SwiperSlide className={classes.movieC} key={index}>
              <MovieCard
                id={movie.id}
                name={movie.name}
                img={movie.img} />
            </SwiperSlide>
          })}
      </Swiper>
    </Container >
  );

}


