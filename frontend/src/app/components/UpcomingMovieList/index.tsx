import React, { useEffect } from 'react';
import useStyles from './styles';
import {
  Container,
  Divider,
  Typography
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper'
import { MovieCard } from 'app/components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getUpcomingMoviesThunk } from '../Movies/slice';

export default function UpcomingMovieList() {

  const store = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!store.movies.getUpcomingMovies) {
      dispatch(getUpcomingMoviesThunk())
    };
  }, [store.movies.getUpcomingMovies])

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Divider sx={{ mb: 2 }}>
        <Typography
          sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem' } }}
          color='secondary'
          fontWeight={900}>
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
            slidesPerView: 6,
          },
        }}
        slidesPerView={5}>
        {
          store.movies.upcomingMovieList.map((movie: any, index: number) => {
            return <SwiperSlide className={classes.movie} key={index}>
              <MovieCard
                id={movie.id}
                name={movie.title}
                img={movie.imageUrl}
                genre={movie.Categories}
                duration={movie.duration + ' phút'} />
            </SwiperSlide>
          })}
      </Swiper>
    </Container>
  );
}


