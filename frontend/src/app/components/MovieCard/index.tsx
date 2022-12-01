import React, { useState } from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia
} from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

interface MovieCardProps {
	id: number
	name?: string
	genre?: any
	duration?: string
	img?: string
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
							}
							) : null
						}
					</strong>
					<br />
					Thời lượng: {props.duration}
				</CardContent> : null
			}
			<CardActions
				className={classes.actions}
				sx={{
					display: hover ? 'flex' : 'none',
					bottom: props.hideContent ? '5%' : ''
				}}>
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
					href={`/movie-detail/${props.id}`}>
					Chi tiết
				</Button>
				<Button variant={'outlined'}
					sx={{
						bgcolor: props.hideContent ? 'none' : '#FF884B',
						'&:hover': {
							bgcolor: props.hideContent ? '#FF884B' : ''
						}
					}}
					disableFocusRipple
					classes={{ root: classes.button }}
					size='small'>
					Đặt vé
				</Button>
			</CardActions>
		</Card >
	);
}
