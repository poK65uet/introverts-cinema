import React, { useState } from 'react';
import useStyles from './styles';
import { ButtonBase } from '@mui/material';
import { Chair as SeatIcon } from '@mui/icons-material';
import { notify } from 'app/components/MasterDialog';
interface SeatProps {
  seatRow?: string
  seatCol?: number
  seatIndex?: string
  status: 'vacant' | 'booked' | 'selected'
  onClick(): void
}

export function Seat(props: SeatProps) {

  const [select, setSelect] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    props.onClick()
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
      onClick={(e) => handleClick(e)}>
      <SeatIcon className={
        props.status == 'booked' ? classes.booked
          : props.status == 'vacant' ? !select ? classes.vacant : classes.selected
            : !select ? classes.selected : classes.vacant
      }
        fontSize='inherit' />
    </ButtonBase>
  );
}
