import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import { East, West } from '@mui/icons-material';
import { SeatPlan } from 'app/containers/SeatPlan';
import ConfirmDialog from 'app/components/MasterDialog/ConfirmDialog';
import TicketDetail from 'app/components/TicketDetail/index';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { bookTicketActions } from 'app/pages/BookTicketPage/slice';
import { useGetShowtimeDetail } from 'queries/showtimes';


export default function SeatsSelector() {

  const store = useSelector<RootState, RootState>(state => state);

  const data = useGetShowtimeDetail(store.bookTicket.selectedShowtime.id).data

  const showtime = data?.showtime
  const room = showtime?.Room
  const price = data?.price

  const [showConfirmSelectSeats, setShowConfirmSelectSeats] = useState(false);

  const dispatch = useDispatch();

  const handleReselectShowtime = () => {
    dispatch(bookTicketActions.resetSeat());
    dispatch(bookTicketActions.resetShowtime());
  };

  const handleSelectSeatsDone = () => {
    setShowConfirmSelectSeats(true);
  };

  const handleCloseConfirmSelectSeats = () => setShowConfirmSelectSeats(false);

  const handleConfirmSelectSeats = () => {
    dispatch(bookTicketActions.startPayment(Date.now()));
    dispatch(bookTicketActions.selectSeatsDone());
    handleCloseConfirmSelectSeats();
  };

  const handleCancelSelectSeats = () => handleCloseConfirmSelectSeats();

  const selectedMovie = () => {
    let moviesList = store.movies.newMovieList.concat(
      store.movies.upcomingMovieList,
    );
    return moviesList.find(
      (movie: any) => movie.id == store.bookTicket.selectedMovie,
    );
  };

  const selectedSeats = () => {
    let seats = '';
    store.bookTicket.selectedSeats.map((seat, index) => {
      seats +=
        seat.name +
        (store.bookTicket.selectedSeats.length == 1 ||
          store.bookTicket.selectedSeats.length == index + 1
          ? ''
          : ', ');
    });
    return seats;
  };

  const confirmSelectSeatsContent = () => {
    return 'Xác nhận thanh toán cho ghế ' + selectedSeats() + '?';
  };

  const classes = useStyles();

  return (
    <Container className={classes.seatSelectWrapper}>
      <Container className={classes.seatPlanWrapper}>
        <SeatPlan seatCols={room?.colNumber} seatRows={room?.rowNumber} emptyCols={room?.colEmpty} emptyRows={room?.rowEmpty} />
      </Container>
      <Container sx={{ all: 'unset', px: '0 !important' }} >
        <TicketDetail
          movie={selectedMovie()}
          showtime={{
            startTime: new Date(store.bookTicket.selectedShowtime.startTime),
            name: room?.name
          }}
          seats={store.bookTicket.selectedSeats}
          price={price * store.bookTicket.selectedSeats.length} />
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
    </Container>
  )
}

