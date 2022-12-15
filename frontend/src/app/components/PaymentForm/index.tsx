import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Container, Typography, CardMedia } from '@mui/material';
import { West, East } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { bookTicketActions } from 'app/pages/BookTicketPage/slice';
import ConfirmDialog from 'app/components/MasterDialog/ConfirmDialog';
import CountDownClock from '../CountDownClock';
import { RootState } from 'store';
import useStyles from './styles';
import { notify } from '../MasterDialog/index';
import { useCancelBill, useCreateBill, useVerifyBill } from 'queries/bills';

interface PaymentFormProps {
  timeStartPayment: number
  reselectSeats(): void
}

export default function PaymentForm(props: PaymentFormProps) {

  const store = useSelector<RootState, RootState>(state => state);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false)

  const dispatch = useDispatch()

  const handleCancelPayment = () => {
    setShowConfirmCancel(true)
  }

  const handleTimeout = () => {
    notify({
      type: 'error',
      content: 'Quá thời gian thanh toán',
      autocloseDelay: 3000
    })
    dispatch(bookTicketActions.reSelectSeats())
    dispatch(bookTicketActions.paymentTimeOut())
  }

  const bill = () => {
    const seats = store.bookTicket.selectedSeats.map(seat => {
      return { column: Number(seat.seatCol), row: Number(seat.seatRow), code: seat.name }
    })
    return { showtimeId: Number(store.bookTicket.selectedShowtime.id), seats: seats }
  }

  const onCreateBillError = () => {
    notify({
      type: 'error',
      content: 'Tạo hóa đơn thất bại',
      autocloseDelay: 1250
    })
    dispatch(bookTicketActions.reSelectSeats())
  }

  const handleVerifyBillSuccess = () => {
    if (verifyBillData) {
      notify({
        type: 'success',
        content: 'Thanh toán thành công',
        autocloseDelay: 2000
      })
      dispatch(bookTicketActions.loadingDone())
      dispatch(bookTicketActions.paymentDone())
      dispatch(bookTicketActions.resetPayment())
      dispatch(bookTicketActions.resetSeat())
      dispatch(bookTicketActions.resetShowtime())
      dispatch(bookTicketActions.resetMovie())
      setTimeout(() => {
        dispatch(bookTicketActions.paymentTimeOut())
      }, 500);
    } else {
      notify({
        type: 'error',
        content: 'Xác nhận thanh toán gặp thất bại',
        autocloseDelay: 1250
      })
      removeVerifyBillData()
    }
  }

  const handleVerifyBillError = () => {
    notify({
      type: 'error',
      content: 'Xác nhận thanh toán gặp lỗi',
      autocloseDelay: 1250
    })
    removeVerifyBillData()
  }

  const onCancelBillError = () => notify({
    type: 'error',
    content: 'Hủy thanh toán thất bại',
    autocloseDelay: 1250
  })

  const {
    data: billData,
    refetch: createBill,
    isLoading: isCreatingBill,
    remove: removeBillData
  } = useCreateBill(bill(), { onError: onCreateBillError })

  const {
    data: verifyBillData,
    refetch: verifyBill,
    isLoading: isVerifyingBill,
    remove: removeVerifyBillData
  } = useVerifyBill(billData?.bill.id, {
    onSuccess: handleVerifyBillSuccess,
    onError: handleVerifyBillError
  })

  const {
    refetch: cancelBill,
    isLoading: isCancelingBill,
    remove: removeBillCancelData
  } = useCancelBill(billData?.bill.id, { onError: onCancelBillError })

  const handleVerifyBill = () => {
    notify({
      type: 'info',
      content: 'Vui lòng chờ hệ thống xác nhận',
      autocloseDelay: 1250
    })
    verifyBill()
  }

  useEffect(() => {
    createBill()

    return () => {
      cancelBill()
      removeBillData()
      removeVerifyBillData()
      removeBillCancelData()
    }
  }, [])

  window.onbeforeunload = () => {
    cancelBill()
  }

  useEffect(() => {
    if (isCreatingBill || isVerifyingBill || isCancelingBill) {
      dispatch(bookTicketActions.loading())
    } else {
      dispatch(bookTicketActions.loadingDone())
    }
  }, [isCreatingBill, isVerifyingBill, isCancelingBill])

  const classes = useStyles()

  return (
    <Card className={classes.form}>
      <CardHeader
        title={<Typography variant='h6' fontWeight='bold' display='flex' justifyContent='space-between'>
          THANH TOÁN VÉ&nbsp;
          <CountDownClock timeStart={props.timeStartPayment} duration={15} onComplete={handleTimeout} />
        </Typography>} />
      <CardContent>
        <CardMedia component='img' image={billData?.qrCode} />
        <Typography px={1}>
          <strong>Vui lòng quét mã để thanh toán</strong> <br />
          <em><strong>Lưu ý:</strong> Không thay đổi thông tin giao dịch để xác thực thành công</em>
        </Typography>
        <CardActions>
          <Button variant='contained' className={classes.button}
            disableRipple startIcon={<West />} color='secondary' fullWidth
            onClick={handleCancelPayment} >
            Hủy
          </Button>
          <ConfirmDialog
            open={showConfirmCancel}
            title='Xác nhận hủy thanh toán'
            content='Bạn muốn hủy thanh toán?'
            handleConfirm={() => {
              props.reselectSeats()
              setShowConfirmCancel(false)
            }}
            handleCancel={() => { setShowConfirmCancel(false) }} />
          <Button variant='contained' className={classes.button}
            disableRipple endIcon={<East />} fullWidth
            onClick={handleVerifyBill}>
            Xác nhận
          </Button>
        </CardActions>
      </CardContent>
    </Card >
  )
}
