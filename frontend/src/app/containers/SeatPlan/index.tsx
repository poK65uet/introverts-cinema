import React, { useMemo } from 'react';
import { Seat } from 'app/components/Seat';
import useStyles from './styles';
import Grid from '@mui/material/Unstable_Grid2';

interface SeatPlanProps {
  seatCols: number
  seatRows: number
  emptyCols?: number[] | string
  emptyRows?: number[] | string
}

export function SeatPlan(props: SeatPlanProps) {

  const splitString = (string: string) => {
    return string.split(',').map(Number)
  }

  const emptyCols = (
    props.emptyCols ?
      typeof (props.emptyCols) == 'string' ?
        splitString(props.emptyCols) :
        props.emptyCols
      : []
  ).filter(col => col <= Number(props?.seatCols))

  emptyCols.sort()

  const emptyRows = (props.emptyRows ?
    typeof (props.emptyRows) == 'string' ?
      splitString(props.emptyRows) :
      props.emptyRows :
    []).filter(row => row <= Number(props?.seatRows))

  emptyRows.sort()

  const seatPlan = () => {
    let seats: { index: string, seatCol?: number, seatRow?: number }[] = []

    for (let i = 0; i < props.seatRows; i++)
      for (let j = 0; j < props.seatCols; j++)
        seats.push({
          index: String.fromCharCode(65 + i) + (j + 1), seatRow: i + 1, seatCol: j + 1
        })

    for (let i = 0; i < props.seatRows; i++) {
      seats.splice(
        (i + 1) * (props.seatCols) + i,
        0,
        { index: String.fromCharCode(65 + i), seatCol: props.seatCols + 1 })
    }
    for (let i = 0; i < props.seatCols; i++) {
      seats.push({ index: (i + 1).toString(), seatRow: props.seatRows + 1 })
    }

    let colGap = 0;
    let rowGap = 0

    emptyCols.map((emptyCol) => {
      colGap++
      for (let i = 0; i <= props.seatRows; i++) {
        seats.splice(
          (emptyCol + colGap - 1) + i * (props.seatCols + colGap + 1),
          0,
          { index: 'empty_seat' }
        )
      }
    })

    emptyRows.map((emptyRow) => {
      seats.splice(
        (emptyRow + rowGap) * (props.seatCols + colGap + 1),
        0,
        { index: 'empty_label' })
      for (let i = 0; i < props.seatCols + colGap; i++) {
        seats.splice(
          (emptyRow + rowGap) * (props.seatCols + colGap + 1),
          0,
          { index: 'empty_seat' }
        )
      }
      rowGap++
    })

    return seats;
  }

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.seatPlan}
      width={{
        xs: `calc(1rem * ${props.seatCols + emptyCols.length + 1})`,
        sm: `calc(1.625rem * ${props.seatCols + emptyCols.length + 1} )`,
        md: `calc(2.125rem * ${props.seatCols + emptyCols.length + 1} )`,
        lg: `calc(2.5rem * ${props.seatCols + emptyCols.length + 1})`
      }}
    >
      <Grid xs={12 - 12 / (props.seatCols + emptyCols.length + 1)}
        className={classes.screen}
        fontSize={{ xs: '0.625rem', sm: '1rem', md: '1.375rem', lg: '1.5rem' }}
      >
        Màn hình
      </Grid>
      <Grid xs={12 / (props.seatCols + emptyCols.length + 1)} />
      {
        seatPlan().map((
          seat: { index: string, seatRow?: number, seatCol?: number }, index: number) => {
          return <Grid xs={12 / (props.seatCols + emptyCols.length + 1)}
            key={index}
            className={classes.seat}
            fontSize={{ xs: '0.75em', sm: '1.25rem', md: '1.75rem', lg: '2em' }}
          >
            {seat.index == 'empty_seat' ? null :
              seat.index == 'empty_label' ? <div style={{ height: '1em' }} /> :
                seat.seatRow == props.seatRows + 1 ? <div className={classes.colNum}>{seat.index}</div> :
                  seat.seatCol == props.seatCols + 1 ? <div className={classes.rowCharacter}>{seat.index}</div> :
                    <Seat seatIndex={seat.index} status='vacant' onClick={() => { }} />}
          </Grid>
        })
      }
    </Grid >
  );
}
