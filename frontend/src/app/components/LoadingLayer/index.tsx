import { Backdrop } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { store } from 'store';
import { useDispatch, useSelector } from 'react-redux';

export default function LoadingLayer() {

	const loading = useSelector(state => state)
	const [isLoading, setIsLoading] = useState(true);
	const RTKstore = store.getState();

	useEffect(() => {
		setIsLoading(RTKstore.loading.isLoading || RTKstore.login.isLoading)
		console.log(RTKstore.login.isLoggedin);
	}, [loading])

	return (
		<Backdrop open={isLoading} sx={{ fontSize: '1rem', zIndex: 1500, width: '100vw' }}>
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
