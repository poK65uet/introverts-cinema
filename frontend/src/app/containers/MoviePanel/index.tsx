import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Box, Button, Tab, Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getNewMoviesThunk, getUpcomingMoviesThunk } from 'app/components/Movies/slice';
import ShowtimeList from 'app/components/ShowtimeList/index';
import RatedTag from 'app/components/RatedTag';
import { notify } from 'app/components/MasterDialog';
import { bookTicketActions } from 'app/pages/BookTicketPage/slice';
import { useGetShowtimesByMovie } from 'queries/showtimes';

export default function MoviePanel() {

  const store = useSelector<RootState, RootState>(state => state)

  const showtimesByMovie = useGetShowtimesByMovie(store.bookTicket.selectedMovie).data

  const selectedTabRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (selectedTabRef.current != null) {
      if (!store.bookTicket.stepBack)
        window.scrollTo({
          top: selectedTabRef.current.offsetTop,
        })
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    if (!store.movies.getNewMovies) {
      dispatch(getNewMoviesThunk())
    };

    if (!store.movies.getUpcomingMovies) {
      dispatch(getUpcomingMoviesThunk())
    };
  }, [])

  const handleSelectMovie = (event: React.SyntheticEvent, newMovie: string) => {
    dispatch(bookTicketActions.selectMovie(newMovie))
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSelectShowtime = (showtime: number) => {
    if (!store.login.isLoggedin) {
      notify({
        type: 'error',
        content: 'Cần đăng nhập để tiếp tục',
        autocloseDelay: 2000
      })
    } else {
      dispatch(bookTicketActions.selectShowtime(showtime))
      window.scrollTo({
        top: 0,
      })
    }
  }

  const classes = useStyles()

  return (
    <TabContext value={store.bookTicket.selectedMovie}>
      <Container className={classes.wrapper}>
        <Box className={classes.container}>
          <div className={classes.title} >CHỌN PHIM</div>
          <TabList
            className={classes.tabContainer}
            orientation='vertical'
            onChange={(event, newMovie) => handleSelectMovie(event, newMovie)}
          >
            <Tab value={'0'} sx={{ all: 'unset', bgcolor: '#FFFFFF' }}
              ref={store.bookTicket.selectedMovie == '0' ? selectedTabRef : null}
            />
            {(store.movies.newMovieList.concat(store.movies.upcomingMovieList)).map(
              (movie: any, index: number) => {
                return <Tab
                  className={classes.movieTab}
                  key={index}
                  ref={movie.id == store.bookTicket.selectedMovie ? selectedTabRef : null}
                  label={
                    <>
                      <img src={movie.imageUrl}
                        className={classes.movieIcon} />
                      {movie.title}
                    </>
                  }
                  disableFocusRipple
                  value={movie.id?.toString()}
                  icon={
                    movie.rated ?
                      <RatedTag rated={movie.rated} size='small'
                        styles={{ color: '#FFFFFF', marginLeft: 'auto' }} /> : undefined
                  }
                  iconPosition='end'
                />
              })}
          </TabList>
        </Box>
        <Box className={classes.container}>
          <div className={classes.title} >CHỌN SUẤT CHIẾU</div>
          <TabPanel className={classes.showtimeList} value='0'>
            Vui lòng chọn phim
          </TabPanel>
          {showtimesByMovie?.map((showtimesByDate: any, index: number) => {
            return <TabPanel
              className={classes.showtimeList}
              key={index}
              value={store.bookTicket.selectedMovie != '0' ? store.bookTicket.selectedMovie : ''}>
              <ShowtimeList
                key={index}
                showtimesByDate={showtimesByDate}
                onSelectShowtime={(showtime) => handleSelectShowtime(showtime)} />
            </TabPanel>
          })}
        </Box>
      </Container>
    </TabContext >
  )
}
