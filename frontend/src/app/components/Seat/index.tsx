import React, { useState } from 'react';
import useStyles from './styles';
import { ButtonBase } from '@mui/material';
import { Chair as SeatIcon } from '@mui/icons-material';
import { notify } from 'app/components/MasterDialog';
import { useDispatch } from 'react-redux';
import { bookTicketActions } from '../../pages/BookTicketPage/slice';
interface SeatProps {
  id: number
  seatRow?: string
  seatCol?: number
  seatIndex?: string
  status: 'vacant' | 'booked' | 'selected'
  onClick(): void
}

export function Seat(props: SeatProps) {

  const [select, setSelect] = useState(false);

  const dispatch = useDispatch()

  const handleClick = (event: React.MouseEvent) => {
    props.onClick()
    !select ? dispatch(bookTicketActions.selectSeat({ id: props.id, name: props.seatIndex })) :
      dispatch(bookTicketActions.unselectSeat({ id: props.id, name: props.seatIndex }))
    setSelect(!select)
    notify({
      type: !select ? 'success' : 'warning',
      content: `Đã ${select ? 'bỏ' : ''} chọn ghế ${props.seatIndex}`,
      autocloseDelay: 3000
    });
  }

  const classes = useStyles();

  return (
    <ButtonBase
      className={classes.seat}
      disableRipple
      onClick={(event) => handleClick(event)}>
      <SeatIcon className={
        props.status == 'booked' ? classes.booked
          : props.status == 'vacant' ? !select ? classes.vacant : classes.selected
            : !select ? classes.selected : classes.vacant
      }
        fontSize='inherit' />
    </ButtonBase>
  );
}
