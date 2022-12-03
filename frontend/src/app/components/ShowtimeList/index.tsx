import React from 'react'
import { Button } from '@mui/material'
import { formatDate } from 'utils/date'
import useStyles from './style';
import Grid from '@mui/material/Unstable_Grid2';

interface ShowtimeListProps {
  showtimeList: any
  movie?: any
  onSelectShowtime: (showtime: any) => void
}

export default function ShowtimeList(props: ShowtimeListProps) {

  const classes = useStyles()

  const showtimeTime = [1, 2, 3, 4, 5]

  return (
    <Grid container xs={12} fontSize='1.2em'>
      <Grid xs={3} fontWeight='bold'>
        {formatDate(new Date)}
      </Grid>
      <Grid xs={9} />
      <Grid xs={3} alignSelf='center'>
        2D - Phụ đề
      </Grid>
      <Grid container xs={9}>
        {showtimeTime.map((showtime: any, index: number) => {
          return (
            <Grid xs={3} key={index}>
              <Button
                className={classes.timeButton}
                disableRipple
                onClick={() => props.onSelectShowtime(showtime)}>
                10:10
              </Button>
            </Grid>
          )
        })}
      </Grid>
      <Grid>
      </Grid>
    </Grid>
  )
}
