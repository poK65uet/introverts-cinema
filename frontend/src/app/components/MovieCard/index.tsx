import * as React from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia
} from '@mui/material';
import useStyles from './styles';

interface MovieCardProps {
	id: number
	name: string
	genre?: string
	duration?: string
	img: string
}

export function MovieCard(props: MovieCardProps) {

	const [hover, setHover] = React.useState(false);

	const classes = useStyles();

	const onHover = () => {
		setHover(true);
	};

	const onNotHover = () => {
		setHover(false);
	};

	return (
		<Card classes={{ root: classes.container }}
			onMouseOver={onHover} onMouseLeave={onNotHover}>
			<CardMedia component='img' image={props.img} />
			<CardContent sx={{ display: hover ? 'inline-block' : 'none' }} className={classes.information}>
				Tên phim: <strong>{props.name}</strong>
				<br />
				Thể loại: {props.genre}
				<br />
				Thời lượng: {props.duration}
			</CardContent>
			<CardActions sx={{ display: hover ? 'flex' : 'none' }} className={classes.actions}>
				<Button classes={{ root: classes.button }} size="small">Chi tiết</Button>
				<Button classes={{ root: classes.button }} size="small">Đặt vé</Button>
			</CardActions>
		</Card >
	);
}
