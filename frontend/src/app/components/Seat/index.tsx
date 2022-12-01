import React, { useState } from 'react';
import useStyles from './styles';
import Button from '@mui/material/Button'
import { ButtonBase, IconButton } from '@mui/material';
import { Chair } from '@mui/icons-material';
interface SeatProps {
  seatRow?: string
  seatCol?: number
  status: 'vacant' | 'booked' | 'selected'
  onClick(): void
}

export function Seat(props: SeatProps) {

  const [select, setSelect] = useState(false);

  const handleClick = () => {
    props.onClick()
    setSelect(!select)
  }

  const classes = useStyles();

  return (
    <ButtonBase
      className={classes.seat}
      disableRipple
      onClick={handleClick}>
      <Chair className={
        props.status == 'booked' ? classes.booked
          : props.status == 'vacant' ? !select ? classes.vacant : classes.selected
            : !select ? classes.selected : classes.vacant
      }
        fontSize='inherit' />
    </ButtonBase>
  );
}
