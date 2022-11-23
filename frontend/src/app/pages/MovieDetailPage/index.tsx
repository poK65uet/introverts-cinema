import React from 'react'
import { CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetMovieById } from 'queries/movies';
import useStyles from './styles';
import { Update as DurationIcon } from '@mui/icons-material';

export default function MovieDetailPage() {
  let { movieId } = useParams<{ movieId: string | undefined }>()

  const store = useSelector<RootState, RootState>(state => state)
  const { data: movie } = useGetMovieById(movieId)

  const classes = useStyles()

  return (
    <div className={classes.movieDetailPage}>
      <Grid xs={12} container width='75%' columnSpacing={2} m={{ xs: 'auto', md: 8 }}>
        <Grid xs={12} md={3}>
          <CardMedia component='img' image={movie?.imageUrl} />
        </Grid>
        <Grid xs={12} md={9}
          container
          fontSize={{ xs: '1.25em', lg: '1.5em' }}
          fontWeight='bold'
          fontFamily=''
        >
          <Grid xs={12}>
            <Typography
              className={classes.movieTittle}
              fontSize='1.25em'
              fontWeight='bolder'
            >
              {movie?.title}
            </Typography>
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
            >
              Thể loại:
            </Typography>
            Hoạt hình
          </Grid>
          <Grid xs={12} display='inline-flex' alignItems='center'>
            <Typography
              className={classes.movieDetail}
              color='#777777'
              fontSize='1em'
              pr={1}
            >
              Diễn viên:
            </Typography>
            Nazuka Kaori, Ikeda Shuichi, Tanaka Mayumi
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
            Taniguchi Goro
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
            Nhật Bản
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}
