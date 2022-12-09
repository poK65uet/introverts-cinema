import React, { useEffect } from 'react'
import { Button, CardMedia, Container, Typography } from '@mui/material';
import RatedTag from 'app/components/RatedTag/index';
import Grid from '@mui/material/Unstable_Grid2';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetMovieById } from 'queries/movies';
import useStyles from './styles';
import { Update as DurationIcon } from '@mui/icons-material';
import NotFoundPage from 'app/pages/NotFoundPage/index';
import { bookTicketActions } from '../BookTicketPage/slice';
import paths from 'paths';
import { formatDate } from 'utils/date';
import { moviesActions } from '../../components/Movies/slice';
import { notify } from 'app/components/MasterDialog';

export default function MovieDetailPage() {

  let { movieId } = useParams<{ movieId: string | undefined }>()

  const { data: movie, isLoading, isError } = useGetMovieById(movieId)

  useEffect(() => {
    if (isError) {
      notify({
        type: 'error',
        content: 'Đã gặp lỗi, hãy thử lại',
        autocloseDelay: 1250
      })
      dispatch(bookTicketActions.loadingDone())
    }
  }, [isError])

  useEffect(() => {
    window.scrollTo({
      top: 0
    })
  }, [])

  const dispatch = useDispatch()

  useEffect(() => {
    isLoading ? dispatch(moviesActions.loading()) : dispatch(moviesActions.loadingDone())
  }, [isLoading])


  const handleClickBookTicket = () => {
    dispatch(bookTicketActions.selectMovie(movieId))
  }

  const classes = useStyles()

  const PageSekeleton: React.FunctionComponent =
    () => <div style={{ height: '100vh' }} />

  return (
    <div className={classes.movieDetailPage}>
      {movie !== undefined ?
        <Grid xs={12}
          container
          columnSpacing={{ xs: 0, md: 2 }}
          fontSize={{ xs: '0.75em', sm: '0.875em  ', md: '1em' }}
          my={4} px={{ xs: 4, sm: 8, md: 10 }}>
          <Grid xs={12} md={3} lg={2.25}
            px={{ xs: 8, sm: 20, md: 0, lg: 0 }}
            pb={{ xs: 4, md: 0 }}
            display='flex' justifyContent='center'>
            <Container sx={{ px: '0 !important' }}>
              <CardMedia component='img' image={movie?.imageUrl} />
            </Container>
          </Grid>
          <Grid xs={12} md={8} lg={9.75}
            container
            fontSize={{ xs: '1.25em', lg: '1.5em' }}
            fontWeight='bold'
            fontFamily=''>
            <Grid xs={12} mb='auto'>
              <Typography
                className={classes.movieTitle}
                fontSize='1.25em'
                fontWeight='bolder'>
                {movie?.title}
              </Typography>
            </Grid>
            <Grid xs={12} mt='auto'>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <Link to={paths.BookTicketPage} style={{ all: 'unset' }}>
                  <Button variant='contained' disableFocusRipple
                    onClick={handleClickBookTicket}
                    sx={{ color: 'ButtonHighlight', fontSize: '0.75em', my: 2 }} >
                    Đặt vé
                  </Button>
                </Link>
              </Grid>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                {movie.rated ?
                  <RatedTag rated={movie.rated}
                    styles={{
                      color: '#FFFFFF',
                      height: 'fit-content',
                      width: 'fit-content',
                      paddingTop: '0.4em',
                      paddingBottom: '0.4em',
                      fontSize: '0.875em !important'
                    }} /> : null}
                <DurationIcon sx={{ mx: 1 }} />
                {movie?.duration + ' phút'}
              </Grid>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <Typography
                  className={classes.movieDetail}
                  color='#777777'
                  fontSize='1em'
                  pr={1}
                  whiteSpace='nowrap'>
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
                  whiteSpace='nowrap'>
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
                  pr={1}>
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
                  pr={1}>
                  Quốc gia:
                </Typography>
                {movie?.Nationality?.name}
              </Grid>
              <Grid xs={12} display='inline-flex' alignItems='center'>
                <Typography
                  className={classes.movieDetail}
                  color='#777777'
                  fontSize='1em'
                  pr={1}>
                  Khởi chiếu
                </Typography>
                {formatDate(new Date(movie?.openingDay))}
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}
            fontSize={{ xs: '1em', lg: '1.5em' }}
            fontWeight='bold'
            fontFamily=''
            mt={4}
            borderBottom={2}>
            MÔ TẢ PHIM
          </Grid>
          <Grid xs={12}
            fontSize={{ xs: '1.25em', lg: '1.625em' }}
            fontFamily=''
            mt={4}>
            {movie?.description}
          </Grid>
        </Grid>
        : isLoading ? <PageSekeleton />
          : <NotFoundPage />}
    </div >
  )
}
