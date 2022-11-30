import MoviePanel from 'app/components/MoviePanel';
import { SeatPlan } from 'app/containers/SeatPlan';
import React from 'react'
import useStyles from './styles';

export default function BookTicketPage() {

	const classes = useStyles()

	return (
		<div className={classes.bookTicketPage}>
			<MoviePanel />
			{/*<SeatPlan seatCols={15} seatRows={10} emptyCols={'3,11'} emptyRows={[4]} />*/}
		</div>
	)
}
