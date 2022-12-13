import React, { useEffect, useState } from 'react'
import { Container, Dialog } from '@mui/material';
import MoviePanel from 'app/containers/MoviePanel';
import SeatSelector from 'app/containers/SeatSelector';
import BookingStepper from 'app/components/BookingStepper';
import PaymentForm from 'app/components/PaymentForm';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { bookTicketActions, BookingStep } from './slice';
import { notify } from 'app/components/MasterDialog';

export default function BookTicketPage() {

  const store = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch()

  const handleReselectSeats = () => {
    dispatch(bookTicketActions.reSelectSeats())
    setTimeout(() => {
      notify({
        type: 'warning',
        content: 'Đã hủy thanh toán',
        autocloseDelay: 1500,
      })
    }, 100)
    setTimeout(() => {
      dispatch(bookTicketActions.paymentTimeOut())
    }, 500)
  }

  useEffect(() => {
    return () => {
      dispatch(bookTicketActions.resetSeat())
      dispatch(bookTicketActions.resetShowtime())
      dispatch(bookTicketActions.resetMovie())
      dispatch(bookTicketActions.paymentTimeOut())
    }
  }, [])

  const classes = useStyles()

  return (
    <div className={classes.bookTicketPage}>
      <BookingStepper />
      {store.bookTicket.selectedShowtime == undefined ?
        < MoviePanel />
        : <React.Fragment>
          <SeatSelector />
          <Dialog open={store.bookTicket.activeStep == BookingStep.MAKE_PAYMENT}>
            <PaymentForm
              timeStartPayment={store.bookTicket.timeStartPayment}
              reselectSeats={handleReselectSeats} />
          </Dialog>
        </React.Fragment>
      }
    </div >)
}
