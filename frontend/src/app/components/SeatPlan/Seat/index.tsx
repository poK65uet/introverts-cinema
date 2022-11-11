import React, { useState } from 'react';
import useStyles from './styles';
interface SeatProps {
	seatRow?: string
	seatCol?: number
	status?: string
	draggable: boolean
	index: number
}

export function Seat(props: SeatProps) {

	const [select, setSelect] = useState(false);

	const handleClick = () => {
		setSelect(!select)
	}

	const classes = useStyles();

	return (
		props.status == 'creating'
			?
			<button className={`${classes.seat} + 'creating'`}>
				{props.seatRow}{props.seatCol}
			</button>
			: <button className={
				`${classes.seat} + ${props.status == 'booked' ? classes.booked
					: select == true ? classes.selected : classes.vacant}`}
				onClick={handleClick}>
				{props.seatRow}{props.seatCol}
			</button>
	);
}
