import React from 'react'
import { Button, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetMovieById } from 'queries/movies';
import useStyles from './styles';
import { Update as DurationIcon } from '@mui/icons-material';
import NotFoundPage from 'app/pages/NotFoundPage/index';

export default function MovieDetailPage() {
  const store = useSelector<RootState, RootState>(state => state)

  let { movieId } = useParams<{ movieId: string | undefined }>()

  const { data: movie } = useGetMovieById(movieId)

  const classes = useStyles()

  console.log(movie);
  return (
    <div className={classes.movieDetailPage} >
      {movie !== undefined ?
        <Grid xs={12}
          container
          columnSpacing={{ xs: 0, md: 2 }}
          p={{ xs: 4, sm: 8, md: 4 }}
        >

          <Grid xs={12} md={2.5} px={{ xs: 4, sm: 8, md: 2 }}>
            <CardMedia component='img' image={movie?.imageUrl} />
          </Grid>
          <Grid xs={12} md={9.5}
            container
            fontSize={{ xs: '1.25em', lg: '1.5em' }}
            fontWeight='bold'
            fontFamily=''
          >
            <Grid xs={12} mb='auto'>
              <Typography
                className={classes.movieTittle}
                fontSize='1.25em'
                fontWeight='bolder'
              >
                {movie?.title}
              </Typography>
            </Grid>
            <Grid xs={12} mt='auto'>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <Button variant='contained' disableFocusRipple
                  sx={{ color: 'ButtonHighlight', fontSize: '0.75em', my: 2 }} >
                  Đặt vé
                </Button>
              </Grid>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <DurationIcon sx={{ mr: 1 }} />
                {movie?.duration + ' phút'}
              </Grid>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <Typography
                  className={classes.movieDetail}
                  color='#777777'
                  fontSize='1em'
                  pr={1}
                  whiteSpace='nowrap'
                >
                  Thể loại:
                </Typography>
                <div>
                  {movie?.Categories.map((category: any, index: number) => {
                    return <div key={index} className={classes.movieDetail}>
                      {category.name + (index < movie.Categories.length - 1 ? `,` : '.')}
                      &nbsp;
                    </div>
                  })}
                </div>
              </Grid>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <Typography
                  className={classes.movieDetail}
                  color='#777777'
                  fontSize='1em'
                  pr={1}
                  whiteSpace='nowrap'
                >
                  Diễn viên:
                </Typography>
                <span>
                  {movie?.Actors.map((actor: any, index: number) => {
                    return <div className={classes.movieDetail} key={index}>
                      {actor.fullName + (index < movie.Actors.length - 1 ? `,` : '.')}
                      &nbsp;
                    </div>
                  })}
                </span>
              </Grid>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <Typography
                  className={classes.movieDetail}
                  color='#777777'
                  fontSize='1em'
                  pr={1}
                >
                  Đạo diễn:
                </Typography>
                <span>
                  {movie?.Directors.map((director: any, index: number) => {
                    return <div className={classes.movieDetail} key={index}>
                      {director.fullName + (index < movie.Directors.length - 1 ? `,` : '.')}
                      &nbsp;
                    </div>
                  })}
                </span>
              </Grid>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <Typography
                  className={classes.movieDetail}
                  color='#777777'
                  fontSize='1em'
                  pr={1}
                >
                  Quốc gia:
                </Typography>
                {movie?.Nationality?.name}
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}
            fontSize={{ xs: '1em', lg: '1.5em' }}
            fontWeight='bold'
            fontFamily=''
            mt={4}
            borderBottom={2}
          >
            MÔ TẢ PHIM
          </Grid>
          <Grid xs={12}
            fontSize={{ xs: '1em', lg: '1.5em' }}
            fontFamily=''
            mt={4}
          >
            {movie?.description}
          </Grid>
        </Grid>
        : <NotFoundPage />}
    </div >
  )
}
