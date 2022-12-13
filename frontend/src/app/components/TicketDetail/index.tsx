import React from 'react'
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { CssVarsProvider, CardOverflow } from '@mui/joy';
import useStyles from './styles';
import RatedTag from '../RatedTag';
import { formatDate, formatDay, formatHour } from 'utils/date';
import { StyledEngineProvider } from '@mui/styled-engine-sc';

interface TicketDetailProps {
  movie: any
  showtime: any
  price: number
  seats: any[]
}

export default function TicketDetail(props: TicketDetailProps) {

  const classes = useStyles()

  return (
    <Card className={classes.ticket}>
      <CardMedia
        component='img'
        height={240}
        image={props.movie.imageUrl} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography fontSize='inherit' fontWeight='bold'>
          {props.movie.title}
        </Typography>
        {props.movie.rated ?
          <RatedTag rated={props.movie.rated}
            styles={{ color: '#FFFFFF', margin: '4px 0px', maxWidth: 'min-content' }}
            placement='right' size='small'
          /> : null}
        <Typography my={0.5}>
          <strong> Suất chiếu: </strong>
          {formatHour(props.showtime.startTime)}&nbsp;|&nbsp;
          {formatDay(props.showtime.startTime)},&nbsp;
          {formatDate(props.showtime.startTime)}
        </Typography>
        <Typography my={0.5}>
          <strong> Phòng chiếu: </strong>
          {props.showtime.room} - {props.showtime.visionType}
        </Typography>
        <Typography my={0.5}>
          <strong> Ghế: </strong>
          {props.seats.map((seat, index) => {
            return (seat.name + (
              props.seats.length == 1 ||
                props.seats.length == index + 1 ? ''
                : ', '))
          })}{props.seats.length > 0 ? '.' : ''}
        </Typography>
        <Typography mt='auto' mb={2} fontSize='1.075em' fontWeight='bold' >
          Tổng giá: <strong className={classes.price}>{props.price.toLocaleString()} VNĐ</strong>
        </Typography>
      </CardContent>
      <StyledEngineProvider>
        <CssVarsProvider>
          <CardOverflow
            variant='soft'
            sx={{
              bgcolor: '#FF884BDD',
              color: '#FFFFFF',
              marginBlockEnd: 'auto',
              writingMode: 'vertical-rl',
              textAlign: 'center',
              fontSize: '1em',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              px: 2,
            }}>
            Ticket
          </CardOverflow>
        </CssVarsProvider>
      </StyledEngineProvider>
    </Card >
  )
}
