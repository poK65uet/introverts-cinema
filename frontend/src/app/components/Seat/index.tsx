import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { ButtonBase, Tooltip } from '@mui/material';
import { Chair as SeatIcon } from '@mui/icons-material';
import { notify } from 'app/components/MasterDialog';
import { useDispatch, useSelector } from 'react-redux';
import { bookTicketActions } from '../../pages/BookTicketPage/slice';
import { RootState } from 'store';
interface SeatProps {
  id: number
  seatRow?: string
  seatCol?: number
  seatIndex?: string
  status: 'vacant' | 'booked' | 'selected'
  onClick(): void
}

export function Seat(props: SeatProps) {

  const store = useSelector<RootState, RootState>(state => state)

  const [select, setSelect] = useState(false)

  useEffect(() => {
    setSelect(store.bookTicket.selectedSeats.filter(selectedSeat =>
      props.seatIndex == selectedSeat.name).length != 0)
  }, [store.bookTicket.selectedSeats])

  const dispatch = useDispatch()

  const handleClick = (event: React.MouseEvent) => {
    props.onClick()
    if (!select && store.bookTicket.selectedSeats.length >= 10) {
      notify({
        type: 'error',
        content: 'Có thể đặt tối đa 10 ghế',
        autocloseDelay: 2000
      })
    } else {
      !select ? dispatch(bookTicketActions.selectSeat({ id: props.id, name: props.seatIndex })) :
        dispatch(bookTicketActions.unselectSeat({ id: props.id, name: props.seatIndex }))
      notify({
        type: !select ? 'success' : 'warning',
        content: `Đã ${select ? 'bỏ' : ''} chọn ghế ${props.seatIndex}`,
        autocloseDelay: 3000
      })
    }
  }

  const classes = useStyles();

  return (
    <Tooltip title={props.seatIndex} placement='top' disableInteractive arrow >
      <ButtonBase
        className={classes.seat}
        disableRipple
        onClick={(event) => handleClick(event)}>
        <SeatIcon className={
          props.status == 'booked' ? classes.booked
            : props.status == 'vacant' ? classes.vacant
              : classes.selected
        }
          fontSize='inherit' />
      </ButtonBase>
    </Tooltip>
  );
}
