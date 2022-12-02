import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Tooltip
} from '@mui/material';
import useStyles from './styles';
import paths from 'paths';
import RatedTag from '../RatedTag';
import { useDispatch } from 'react-redux';
import { bookTicketActions } from '../../pages/BookTicketPage/slice';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: number
  name?: string
  genre?: any
  duration?: string
  img?: string
  rated?: string
  hideContent?: boolean
}


export function MovieCard(props: MovieCardProps) {

  const [hover, setHover] = useState(false);

  const classes = useStyles();

  const onHover = () => {
    setHover(true);
  };

  const onNotHover = () => {
    setHover(false);
  };

  const dispatch = useDispatch()

  const handleClickBookTicket = () => {
    dispatch(bookTicketActions.selectMovie(props.id.toString()))
  }

  return (
    <Card classes={{ root: classes.container }}
      sx={{ borderRadius: 'unset' }}
      onMouseOver={onHover} onMouseLeave={onNotHover} >
      <CardMedia component='img' image={props.img} />

      {!props.hideContent ?
        <CardContent sx={{ display: hover ? 'inline-block' : 'none' }} className={classes.information}>
          Tên phim: <strong>{props.name}</strong>
          <br />
          Thể loại: <strong>
            {
              props.genre != undefined ? props.genre.map((genre: any, index: number) => {
                return <div key={index} style={{ display: 'inline' }}>
                  {genre.name + (index < props.genre.length - 1 ? `,` : '.')}
                  &nbsp;
                </div>
              }) : null
            }
          </strong>
          <br />
          Thời lượng: <strong>{props.duration}</strong>
          <br />
          {props.rated ?
            <strong >
              <RatedTag rated={props.rated} size='small'
                styles={{ color: '#FFFFFF', marginTop: '0.5em' }} />
            </strong> : null}
        </CardContent> : null
      }

      {
        props.rated && props.hideContent ?
          <RatedTag rated={props.rated} styles={{
            display: hover ? '-webkit-inline-box' : 'none',
            position: 'absolute', right: 0, top: 0, fontWeight: 'bold',
            transform: 'translate(-20%, 30%)', color: '#FFFFFF'
          }} /> : null
      }

      <CardActions
        className={classes.actions}
        sx={{
          display: hover ? 'flex' : 'none',
          bottom: props.hideContent ? '5%' : ''
        }}>
        <Link to={`${paths.MovieDetailPage}/${props.id}`} style={{ all: 'unset' }}>
          <Button variant={'outlined'}
            sx={{
              bgcolor: props.hideContent ? 'none' : '#FF884B',
              '&:hover': {
                bgcolor: props.hideContent ? '#FF884B' : ''
              }
            }}
            classes={{ root: classes.button }}
            disableFocusRipple
            size='small'>
            Chi tiết
          </Button>
        </Link>
        <Link to={paths.BookTicketPage} style={{ all: 'unset' }}>
          <Button variant={'outlined'}
            sx={{
              bgcolor: props.hideContent ? 'none' : '#FF884B',
              '&:hover': {
                bgcolor: props.hideContent ? '#FF884B' : ''
              }
            }}
            classes={{ root: classes.button }}
            disableFocusRipple
            size='small'
            onClick={handleClickBookTicket}>
            Đặt vé
          </Button>
        </Link>
      </CardActions>
    </Card >
  );
}
