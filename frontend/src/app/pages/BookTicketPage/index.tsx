import React, { useEffect } from 'react'
import { Button, Container } from '@mui/material';
import MoviePanel from 'app/components/MoviePanel';
import { SeatPlan } from 'app/containers/SeatPlan';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { bookTicketActions } from './slice';
import BookingStepper from 'app/components/BookingStepper';
import TicketDetail from '../../components/TicketDetail/index';
import { East, West } from '@mui/icons-material';

export default function BookTicketPage() {

  const store = useSelector<RootState, RootState>(state => state)

  useEffect(() => {
    return () => {
      dispatch(bookTicketActions.resetSeat())
      dispatch(bookTicketActions.resetShowtime())
      dispatch(bookTicketActions.resetMovie())
    }
  }, [])

  const dispatch = useDispatch()

  const handleClickBack = () => {
    dispatch(bookTicketActions.resetShowtime())
  }

  const handleClickForward = () => {

  }

  const selectedMovie = () => {
    let moviesList = store.movies.newMovieList.concat(store.movies.upcomingMovieList)
    return moviesList.find((movie: any) => movie.id == store.bookTicket.selectedMovie)
  }

  const classes = useStyles()

  return (
    <div className={classes.bookTicketPage}>
      <BookingStepper />
      {store.bookTicket.selectedShowtime == 0 ?
        < MoviePanel /> :
        <div className={classes.seatSelectWrapper}>
          <SeatPlan seatCols={10} seatRows={12} emptyCols={'4'} emptyRows={[]} />
          <Container sx={{ all: 'unset' }}>
            <TicketDetail
              movie={selectedMovie()}
              showtime={{ startTime: new Date }}
              price={70000 * store.bookTicket.selectedSeats.length}
              handleStepBack={handleClickBack} />
            <div className={classes.actions}>
              <Button variant='contained' className={classes.button}
                disableRipple startIcon={<West />}
                onClick={handleClickBack}>
                Quay lại
              </Button>
              <Button variant='contained' className={classes.button}
                disabled={store.bookTicket.selectedSeats.length <= 0}
                disableRipple endIcon={<East />}
                onClick={handleClickForward}>
                Tiếp tục
              </Button>
            </div>
          </Container>
        </div>}
    </div >
  )
}
