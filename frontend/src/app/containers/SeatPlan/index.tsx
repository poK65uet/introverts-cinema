import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import useStyles from './styles';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { Seat, SeatState } from 'app/components/Seat';
import { bookTicketActions } from 'app/pages/BookTicketPage/slice';
import { RootState } from 'store';

interface SeatPlanProps {
  seats: any
  seatCols: number
  seatRows: number
  emptyCols?: number[] | string
  emptyRows?: number[] | string
}

const seatExplain = [
  { state: SeatState.VACANT, explain: 'Ghế trống' },
  { state: SeatState.SELECTED, explain: 'Ghế đã chọn' },
  { state: SeatState.BOOKED, explain: 'Ghế đã bán' },
  { state: SeatState.BOOKING, explain: 'Ghế đang chờ' }
]

const splitString = (string: string) => {
  return string.split(',').map(Number)
}

export function SeatPlan(props: SeatPlanProps) {

  const store = useSelector<RootState, RootState>(state => state)

  const [mappingDone, setMappingDone] = useState(false);

  const handleMappingDone = () => {
    setMappingDone(true)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (mappingDone) {
      dispatch(bookTicketActions.loadingDone())
    }
  }, [mappingDone])

  const emptyCols = () => (props.emptyCols ?
    typeof (props.emptyCols) == 'string' ?
      splitString(props.emptyCols) :
      props.emptyCols : []).filter(col => col <= Number(props?.seatCols) && col > 0).sort()

  const emptyRows = () => (props.emptyRows ?
    typeof (props.emptyRows) == 'string' ?
      splitString(props.emptyRows) :
      props.emptyRows : []).filter(row => row <= Number(props?.seatRows) && row > 0).sort()

  const seatPlan = useMemo(() => {

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

    emptyCols().map((emptyCol) => {
      colGap++
      for (let i = 0; i <= props.seatRows; i++) {
        seats.splice(
          (emptyCol + colGap - 1) + i * (props.seatCols + colGap + 1) - emptyCols().filter(col =>
            (col.toString().length - emptyCol.toString().length) > 0).length,
          0,
          { index: 'empty_seat' }
        )
      }
    })

    emptyRows().map((emptyRow) => {
      seats.splice(
        (emptyRow + rowGap - emptyRows().filter(row =>
          (row.toString().length - emptyRow.toString().length) > 0).length)
        * (props.seatCols + colGap + 1)
        ,
        0,
        { index: 'empty_label' })
      for (let i = 0; i < props.seatCols + colGap; i++) {
        seats.splice(
          (emptyRow + rowGap - emptyRows().filter(row =>
            (row.toString().length - emptyRow.toString().length) > 0).length)
          * (props.seatCols + colGap + 1)
          ,
          0,
          { index: 'empty_seat' })
      }
      rowGap++
    })
    return seats;
  }, [props])


  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.seatPlan}
      width={{
        xs: `calc(1em * ${props.seatCols + emptyCols().length + 1})`,
        sm: `calc(1.625em * ${props.seatCols + emptyCols().length + 1} )`,
        md: `calc(2.125em * ${props.seatCols + emptyCols().length + 1} )`,
        lg: `calc(2.5em * ${props.seatCols + emptyCols().length + 1})`
      }}
    >
      <Grid xs={12 - 12 / (props.seatCols + emptyCols().length + 1)}
        className={classes.screen}
        fontSize={{ xs: '0.625em', sm: '1em', md: '1.2em', lg: '1.375em' }}
      >
        MÀN HÌNH
      </Grid>
      <Grid xs={12 / (props.seatCols + emptyCols().length + 1)} />
      {
        seatPlan.map((seat: { index: string, seatRow?: number, seatCol?: number }, index: number) => {
          { !mappingDone && seat.index == props.seatCols.toString() ? handleMappingDone() : null }
          return <Grid xs={12 / (props.seatCols + emptyCols().length + 1)}
            key={index}
            className={classes.seat}
            fontSize={{ xs: '0.75em', sm: '1.25em', md: '1.75em', lg: '2em' }}
          >
            {seat.index == 'empty_seat' ? null
              : seat.index == 'empty_label' ? <div style={{ height: '1em' }} />
                : seat.seatRow == props.seatRows + 1 ? <div className={classes.colNum}>{seat.index}</div>
                  : seat.seatCol == props.seatCols + 1 ? <div className={classes.rowCharacter}>{seat.index}</div>
                    : <Seat id={index} seatIndex={seat.index} seatRow={seat.seatRow} seatCol={seat.seatCol}
                      onClick={() => { }}
                      status={props.seats?.find((propSeat: any) => propSeat?.code == seat.index)?.status == SeatState.BOOKED ? SeatState.BOOKED
                        : props.seats?.find((propSeat: any) => propSeat?.code == seat.index)?.status == SeatState.BOOKING ? SeatState.BOOKING
                          : store.bookTicket.selectedSeats.filter(selectedSeat => seat.index == selectedSeat.name).length != 0
                            ? SeatState.SELECTED : SeatState.VACANT} />}
          </Grid>
        })
      }
      <Grid xs={12} container fontSize='1.125em' fontWeight='bold' mt={3} mb={2}>
        {seatExplain.map((seat) => {
          return <Grid xs={3} key={seat.state}>
            <div className={
              seat.state == SeatState.VACANT ? classes.seatVacantExplain :
                seat.state == SeatState.SELECTED ? classes.seatSelectedExplain :
                  seat.state == SeatState.BOOKED ? classes.seatBookedExplain : classes.seatBookingExplain
            }>
              {seat.explain}
            </div>
          </Grid>
        })}
      </Grid>
    </Grid >
  );
}
