import { Backdrop } from '@mui/material'
import React, { useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';

export default function LoadingLayer() {
	const [loading, setLoading] = useState(false);
	const handleClose = () => {
		setLoading(false);
	};
	const handleOpen = () => {
		setLoading(true);
	};
	return (
		<Backdrop open={loading} sx={{ fontSize: '1rem', zIndex: 100 }}>
			<ThreeCircles
				wrapperStyle={{ fontSize: '0.5em' }}
				height='10em'
				width='10em'
				color='#FF884B'
				outerCircleColor='#FF884B'
				innerCircleColor='#FFB347'
				middleCircleColor='#FFDFBF'
			/>
		</Backdrop >
	);
}
