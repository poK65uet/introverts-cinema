import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { East, West } from '@mui/icons-material';
import { SeatPlan } from 'app/containers/SeatPlan';
import ConfirmDialog from 'app/components/MasterDialog/ConfirmDialog';
import TicketDetail from 'app/components/TicketDetail/index';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { bookTicketActions } from 'app/pages/BookTicketPage/slice';
import { loginActions } from 'app/components/LoginDialog/slice';
import { useGetSeatsByShowtimeId, useGetShowtimeDetail } from 'queries/showtimes';
import { notify } from 'app/components/MasterDialog';


export default function SeatsSelector() {

  const store = useSelector<RootState, RootState>(state => state);

  const [rendering, setRendering] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setRendering(false)
    }, 100);
  }, [])

  const onGetShowtimeDetailError = () => {
    notify({
      type: 'error',
      content: 'Không tìm thấy thông tin suát chiếu',
      autocloseDelay: 1250
    })
    dispatch(bookTicketActions.loadingDone())
  }

  const { data: detail } = useGetShowtimeDetail(
    store.bookTicket.selectedShowtime.id,
    { onError: onGetShowtimeDetailError }
  )

  const onGetSeatsByShowtimeError = () => {
    notify({
      type: 'error',
      content: 'Không tìm thấy thông tin ghế',
      autocloseDelay: 1250
    })
  }

  const { data: seats } = useGetSeatsByShowtimeId(
    store.bookTicket.selectedShowtime.id,
    { onError: onGetSeatsByShowtimeError }
  )

  const showtime = detail?.showtime
  const room = showtime?.Room
  const price = detail?.price

  const [showConfirmSelectSeats, setShowConfirmSelectSeats] = useState(false);

  const dispatch = useDispatch();

  const handleReselectShowtime = () => {
    dispatch(bookTicketActions.resetSeat());
    dispatch(bookTicketActions.resetShowtime());
  };

  const handleSelectSeatsDone = () => {
    if (!store.login.isLoggedin) {
      notify({
        type: 'error',
        content: 'Cần đăng nhập để tiếp tục',
        autocloseDelay: 1000
      })
      dispatch(loginActions.requireLogin())
    } else {
      setShowConfirmSelectSeats(true);
    };
  }

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
      seats += seat.name + (store.bookTicket.selectedSeats.length == 1 ||
        store.bookTicket.selectedSeats.length == index + 1 ? '' : ', ');
    });
    return seats;
  };

  const confirmSelectSeatsContent = () => {
    return 'Xác nhận thanh toán cho ghế ' + selectedSeats() + '?';
  };

  const classes = useStyles();

  return (
    !rendering ?
      <Container className={classes.seatSelectWrapper}>
        <Container className={classes.seatPlanWrapper}>
          <SeatPlan seats={seats}
            seatCols={room?.colNumber} seatRows={room?.rowNumber}
            emptyCols={room?.colEmpty} emptyRows={room?.rowEmpty} />
        </Container>
        <Container sx={{ all: 'unset', px: '0 !important' }} >
          <TicketDetail
            movie={selectedMovie()}
            showtime={{
              startTime: new Date(store.bookTicket.selectedShowtime.startTime),
              visionType: room?.visionType,
              room: room?.name
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
      </Container> : null
  )
}

