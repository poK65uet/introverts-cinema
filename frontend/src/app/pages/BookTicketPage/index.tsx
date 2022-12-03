import React, { useEffect, useState } from 'react'
import { Button, Container, Dialog } from '@mui/material';
import { East, West } from '@mui/icons-material';
import MoviePanel from 'app/components/MoviePanel';
import { SeatPlan } from 'app/containers/SeatPlan';
import ConfirmDialog from 'app/components/MasterDialog/ConfirmDialog';
import BookingStepper from 'app/components/BookingStepper';
import TicketDetail from 'app/components/TicketDetail/index';
import PaymentForm from 'app/components/PaymentForm';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { bookTicketActions, BookingStep } from './slice';
import { notify } from 'app/components/MasterDialog';

export default function BookTicketPage() {

  const store = useSelector<RootState, RootState>(state => state)

  const [showConfirmSelectSeats, setShowConfirmSelectSeats] = useState(false)

  const dispatch = useDispatch()

  const handleReselectShowtime = () => {
    dispatch(bookTicketActions.resetSeat())
    dispatch(bookTicketActions.resetShowtime())
  }

  const handleSelectSeatsDone = () => {
    setShowConfirmSelectSeats(true)
  }

  const handleReselectSeats = () => {
    dispatch(bookTicketActions.reSelectSeats())
    setTimeout(() => {
      dispatch(bookTicketActions.paymentTimeOut())
      notify({
        type: 'warning',
        content: 'Đã hủy thanh toán',
        autocloseDelay: 3500,
      })
      dispatch(bookTicketActions.paymentTimeOut())
    }, 100);
  }

  const handleCloseConfirmSelectSeats = () => setShowConfirmSelectSeats(false)

  const handleConfirmSelectSeats = () => {
    dispatch(bookTicketActions.startPayment(Date.now()))
    dispatch(bookTicketActions.selectSeatsDone())
    handleCloseConfirmSelectSeats()
  }

  const handleCancelSelectSeats = () => handleCloseConfirmSelectSeats()

  const selectedMovie = () => {
    let moviesList = store.movies.newMovieList.concat(store.movies.upcomingMovieList)
    return moviesList.find((movie: any) => movie.id == store.bookTicket.selectedMovie)
  }

  const selectedSeats = () => {
    let seats = ''
    store.bookTicket.selectedSeats.map((seat, index) => {
      seats += seat.name
        + (store.bookTicket.selectedSeats.length == 1 ||
          store.bookTicket.selectedSeats.length == index + 1 ? '' : ', ')
    })
    return seats
  }

  const confirmSelectSeatsContent = () => {
    return 'Xác nhận thanh toán cho ghế ' + selectedSeats() + '?'
  }

  useEffect(() => {
    return () => {
      dispatch(bookTicketActions.resetSeat())
      dispatch(bookTicketActions.resetShowtime())
      dispatch(bookTicketActions.resetMovie())
      dispatch(bookTicketActions.paymentTimeOut())
      notify({
        type: 'warning',
        content: 'Đã hủy đặt vé',
        autocloseDelay: 1000,
      })
    }
  }, [])

  const classes = useStyles()

  return (
    <div className={classes.bookTicketPage}>
      <BookingStepper />
      {store.bookTicket.selectedShowtime == 0 ?
        < MoviePanel />
        : <Container className={classes.seatSelectWrapper}>
          <Container className={classes.seatPlanWrapper}>
            <SeatPlan seatCols={14} seatRows={12} emptyCols={'4'} emptyRows={[]} />
          </Container>
          <Container sx={{ all: 'unset', px: '0 !important' }} >
            <TicketDetail
              movie={selectedMovie()}
              showtime={{ startTime: new Date, name: 'Introvert 1' }}
              seats={store.bookTicket.selectedSeats}
              price={70000 * store.bookTicket.selectedSeats.length} />
            <div className={classes.actions}>
              <Button variant='contained' className={classes.button}
                disableRipple startIcon={<West />}
                onClick={handleReselectShowtime}>
                Quay lại
              </Button>
              <Button variant='contained' className={classes.button}
                disabled={store.bookTicket.selectedSeats.length <= 0}
                disableRipple endIcon={<East />}
                onClick={handleSelectSeatsDone}>
                Tiếp tục
              </Button>
              <ConfirmDialog open={showConfirmSelectSeats}
                title={`Xác nhận chọn ghế`}
                content={confirmSelectSeatsContent()}
                handleClose={handleCloseConfirmSelectSeats}
                handleConfirm={handleConfirmSelectSeats}
                handleCancel={handleCancelSelectSeats} />
            </div>
          </Container>
          <Dialog open={store.bookTicket.activeStep == BookingStep.MAKE_PAYMENT}>
            <PaymentForm
              timeStartPayment={store.bookTicket.timeStartPayment}
              reselectSeats={() => handleReselectSeats()} />
          </Dialog>
        </Container>
      }
    </div >)
}
