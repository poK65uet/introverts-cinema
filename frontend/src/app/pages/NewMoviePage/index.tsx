import React, { useEffect } from 'react'
import {
  Divider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useStyles from './styles'
import { MovieCard } from 'app/components/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { getNewMoviesThunk } from 'app/components/Movies/slice';
import { RootState } from 'store';
import { Link } from 'react-router-dom';

export default function NewMoviePage() {

  const store = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch();
  useEffect(() => {
    if (!store.movies.getNewMovies) {
      dispatch(getNewMoviesThunk())
    };

  }, [store.movies.getNewMovies])

  const classes = useStyles()

  return (
    <div className={classes.newMoviePage}>
      <Divider sx={{ m: 2 }} variant='middle' textAlign='left'>
        <Typography sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
          py: { xs: 1, md: 2, lg: 3 }
        }} color='secondary' fontWeight={900}>
          Phim Đang Chiếu
        </Typography>
      </Divider >
      <Grid container xs={12}
        display='flex'
        alignSelf='center'
        py={{ xs: 1, md: 2 }}
        px={{ xs: 3, sm: 6, lg: 12 }}
        columnSpacing={{ xs: 1, sm: 2, lg: 4 }}
        rowSpacing={{ xs: 2, sm: 4, lg: 8 }}>
        {store.movies.newMovieList.map((movie: any, index: number) => {
          return <Grid xs={6} md={3} fontSize='1.25rem' key={index}>
            <MovieCard
              id={movie.id}
              img={movie.imageUrl}
              hideContent
            />
            <Typography variant='body1' fontWeight='bold' className={classes.movieTittle} noWrap >
              <Link to={`movie-detail/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {movie.title}
              </Link>
            </Typography>
          </Grid>
        })}
      </Grid>
    </div >
  )
}