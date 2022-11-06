import React from 'react';
import useStyles from './styles';
import {
  Container,
  Divider,
  Typography
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper'
import { MovieCard } from 'app/components/MovieCard';

export default function UpcomingMovieList() {

  const classes = useStyles();

  interface MovieProps {
    id: number
    name: string
    img: string
    genre?: string
  }

  const upcomingMovies: MovieProps[] = [
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

  const [styleFocus, setStyleFocus] = React.useState(false)

  return (
    <Container className={classes.container}>
      <Divider sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' } }} color='secondary' fontWeight={900}>
          Phim Sắp Chiếu
        </Typography>
      </Divider>
      <Swiper
        modules={[Autoplay, EffectCoverflow, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        navigation
        effect='coverflow'
        centeredSlides
        coverflowEffect={{
          rotate: 0,
          modifier: 0,
        }}
        loop
        breakpoints={{
          640: {
            slidesPerView: 7,
          },
        }}
        slidesPerView={4}>
        {
          upcomingMovies.map((movie: MovieProps, index: number) => {
            return <SwiperSlide className={classes.movie} key={index}>
              <MovieCard
                id={movie.id}
                name={movie.name}
                img={movie.img} />
            </SwiperSlide>
          })}
      </Swiper>
    </Container>
  );
}


