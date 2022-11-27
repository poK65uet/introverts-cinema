import { Backdrop } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

export default function LoadingLayer() {

	const loading = useSelector<RootState, RootState>(state => state)
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(
			loading.loading.isLoading
			|| loading.movies.isLoading
			|| loading.login.isLoading
			|| loading.register.isLoading
		)
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
