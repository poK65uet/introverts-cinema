import React, { ReactNode, useEffect } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Container, Typography, CardMedia } from '@mui/material';
import { West, East } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { bookTicketActions } from 'app/pages/BookTicketPage/slice';
import useStyles from './styles';
import CountDownClock from '../CountDownClock';

interface PaymentFormProps {
  timeStartPayment: number
  reselectSeats(): void
}

export default function PaymentForm(props: PaymentFormProps) {

  const classes = useStyles()

  const dispatch = useDispatch()

  const handleTimeout = () => {
    dispatch(bookTicketActions.paymentTimeOut())
  }

  return (
    <Card className={classes.form}>
      <CardHeader
        title={<Typography variant='h6' fontWeight='bold' display='flex' justifyContent='space-between'>
          THANH TOÁN VÉ&nbsp;
          <CountDownClock timeStart={props.timeStartPayment} onComplete={handleTimeout} />
        </Typography>} />
      <CardContent>
        <CardMedia component='img' image={'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC'} />
        <Typography >
          Vui lòng quét mã để thanh toán
        </Typography>
        <CardActions>
          <Button variant='contained' className={classes.button}
            disableRipple startIcon={<West />}
            onClick={() => props.reselectSeats()}>
            Quay lại
          </Button>
          <Button variant='contained' className={classes.button}
            disableRipple endIcon={<East />}>
            Kiểm tra
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
