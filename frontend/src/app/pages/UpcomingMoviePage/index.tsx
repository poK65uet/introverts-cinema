import React, { useEffect } from 'react'
import {
  Divider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useStyles from './styles'
import { MovieCard } from 'app/components/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { getUpcomingMoviesThunk } from 'app/components/Movies/slice';
import { RootState } from 'store';
import { Link } from 'react-router-dom';
import paths from 'paths';

export default function UpcomingMoviePage() {

  const store = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch();
  useEffect(() => {
    if (!store.movies.getUpcomingMovies) {
      dispatch(getUpcomingMoviesThunk())
    };

  }, [])

  const classes = useStyles()

  return (
    <div className={classes.upcomingMoviePage}>
      <Divider sx={{ m: 2 }} variant='middle' textAlign='left'>
        <Typography sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
          py: { xs: 1, md: 2, lg: 3 }
        }} color='secondary' fontWeight={900}>
          Phim Sắp Chiếu
        </Typography>
      </Divider >
      <Grid container xs={12}
        display='flex'
        alignSelf='center'
        py={{ xs: 1, md: 2 }}
        px={{ xs: 3, sm: 6, lg: 12 }}
        columnSpacing={{ xs: 1, sm: 2, lg: 4 }}
        rowSpacing={{ xs: 2, sm: 4, lg: 8 }}>
        {store.movies.upcomingMovieList.map((movie: any, index: number) => {
          return <Grid xs={6} md={3} fontSize='1.25rem' key={index}>
            <MovieCard
              id={movie.id}
              img={movie.imageUrl}
              rated={movie.rated}
              hideContent
            />
            <Typography variant='body1' fontWeight='bold' className={classes.movieTitle} noWrap >
              <Link to={`${paths.MovieDetailPage}/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {movie.title}
              </Link>
            </Typography>
          </Grid>
        })}
      </Grid>
    </div >
  )
}
