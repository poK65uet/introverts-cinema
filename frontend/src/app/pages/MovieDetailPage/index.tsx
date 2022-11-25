import React from 'react'
import { Button, CardMedia, Typography } from '@mui/material';
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
              Hoạt hình
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
        <Grid xs={12}
          fontSize={{ xs: '1em', lg: '1.5em' }}
          fontWeight='bold'
          fontFamily=''
          mt={4}
          borderBottom={2}
        >
          MÔ TẢ PHIM
        </Grid>
      </Grid>
    </div >
  )
}
