import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { ButtonBase, Tooltip } from '@mui/material';
import { Chair as SeatIcon } from '@mui/icons-material';
import { notify } from 'app/components/MasterDialog';
import { useDispatch, useSelector } from 'react-redux';
import { bookTicketActions } from 'app/pages/BookTicketPage/slice';
import { RootState } from 'store';
interface SeatProps {
  id: number
  seatRow?: number
  seatCol?: number
  seatIndex?: string
  status: SeatState
  onClick(): void
}

export enum SeatState {
  VACANT = 'vacant',
  SELECTED = 'selected',
  BOOKED = 'booked',
  BOOKING = 'booking'
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
        autocloseDelay: 1750
      })
    } else {
      !select ? dispatch(bookTicketActions.selectSeat({
        id: props.id,
        showtimeId: store.bookTicket.selectedShowtime.id,
        name: props.seatIndex,
        seatCol: props.seatCol,
        seatRow: props.seatRow
      })) :
        dispatch(bookTicketActions.unselectSeat({
          id: props.id,
          showtimeId: store.bookTicket.selectedShowtime.id,
          name: props.seatIndex,
          seatCol: props.seatCol,
          seatRow: props.seatRow
        }))
      notify({
        type: !select ? 'success' : 'warning',
        content: `Đã ${select ? 'bỏ' : ''} chọn ghế ${props.seatIndex}`,
        autocloseDelay: 1000
      })
    }
  }

  const classes = useStyles();

  return (
    <Tooltip title={props.seatIndex} placement='top' disableInteractive arrow >
      <ButtonBase
        className={classes.seat}
        disableRipple
        onClick={(event) => handleClick(event)}
        disabled={props.status == SeatState.BOOKED || props.status == SeatState.BOOKING}>
        <SeatIcon className={
          props.status == SeatState.BOOKED ? classes.booked :
            props.status == SeatState.BOOKING ? classes.booking
              : props.status == SeatState.VACANT ? classes.vacant
                : classes.selected
        }
          fontSize='inherit' />
      </ButtonBase>
    </Tooltip >
  );
}
