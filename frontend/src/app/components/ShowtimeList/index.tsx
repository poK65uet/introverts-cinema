import React from 'react'
import { Button, Divider } from '@mui/material';
import { formatDate } from 'utils/date'
import useStyles from './style';
import Grid from '@mui/material/Unstable_Grid2';
import { formatHour } from 'utils/date';

interface ShowtimeListProps {
  showtimesByDate: any
  onSelectShowtime: (showtime: any) => void
}

export default function ShowtimeList(props: ShowtimeListProps) {

  const classes = useStyles()

  return (
    <Grid container xs={12} fontSize='1.2em'>
      <Grid xs={3} fontWeight='bold' pb={1}>
        {formatDate(new Date(props.showtimesByDate.date))}
      </Grid>
      <Grid xs={9} />
      {props.showtimesByDate.showtimes.find((showtime: any) => showtime.Room.visionType == '2D') ?
        <React.Fragment>
          <Grid xs={2} className={classes.visionType}>
            2D:
          </Grid>
          <Grid container xs={10}>
            {props.showtimesByDate.showtimes.map((showtime: any, index: number) => {
              return (
                showtime.Room.visionType == '2D' ?
                  <Grid xs={3} key={index}>
                    <Button
                      className={classes.timeButton}
                      disableRipple
                      onClick={() => props.onSelectShowtime(showtime)}>
                      {formatHour(new Date(showtime.startTime))}
                    </Button>
                  </Grid> : null
              )
            })}
          </Grid>
        </React.Fragment> : null
      }
      {props.showtimesByDate.showtimes.find((showtime: any) => showtime.Room.visionType == '2D') &&
        props.showtimesByDate.showtimes.find((showtime: any) => showtime.Room.visionType == '3D') ?
        <Grid xs={12}>
          <Divider sx={{ my: 1 }} />
        </Grid> : null
      }
      {
        props.showtimesByDate.showtimes.find((showtime: any) => showtime.Room.visionType == '3D') ?
          <React.Fragment>
            <Grid xs={2} className={classes.visionType}>
              3D:
            </Grid>
            <Grid container xs={10}>
              {props.showtimesByDate.showtimes.map((showtime: any, index: number) => {
                return (
                  showtime.Room.visionType == '3D' ?
                    <Grid xs={3} key={index}>
                      <Button
                        className={classes.timeButton}
                        disableRipple
                        onClick={() => props.onSelectShowtime(showtime)}>
                        {formatHour(new Date(showtime.startTime))}
                      </Button>
                    </Grid> : null
                )
              })}
            </Grid>
          </React.Fragment> : null
      }
      <Grid>
      </Grid>
    </Grid >
  )
}
