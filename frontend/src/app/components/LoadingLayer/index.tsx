import { Backdrop } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { store } from 'store';

export default function LoadingLayer() {

	const isLoading = store.getState().loading.isLoading;

	return (
		<Backdrop open={isLoading} sx={{ fontSize: '1rem', zIndex: 100 }}>
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
