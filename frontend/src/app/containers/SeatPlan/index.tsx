import * as React from 'react';
import { Seat } from 'app/components/Seat';
import useStyles from './styles';
import Grid from '@mui/material/Unstable_Grid2';

export function SeatPlan() {

  const classes = useStyles();

  return (
    <Grid xs={12}
      container
      className={classes.seatPlan}
      width={{ xs: '12rem', sm: '20rem', md: '28rem', lg: '32rem' }}>
      <Grid xs={12}
        className={classes.screen}
        fontSize={{ xs: '0.625em', sm: '1rem', md: '1.375rem', lg: '1.5em' }}
      >Màn hình</Grid>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
        46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60].map((num: number, index: number) => {
          return <Grid xs={12 / 15}
            key={index}
            className={classes.seat}
            fontSize={{ xs: '0.75em', sm: '1.25rem', md: '1.75rem', lg: '2em' }}
          >
            {(num % 15 == 4) || (num % 15 == 5) ? null : <Seat status='vacant' onClick={() => { }} />}
          </Grid>
        })}
    </Grid >
  );
}
