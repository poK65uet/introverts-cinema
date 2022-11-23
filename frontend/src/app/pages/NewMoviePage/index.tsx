import React, { useEffect } from 'react'
import {
	Box,
	Container,
	Divider,
	Paper,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useStyles from './styles'
import { MovieCard } from 'app/components/MovieCard';

export default function NewMoviePage() {

	const classes = useStyles()

	return (
		<div className={classes.newMoviePage}>
			<Divider sx={{ m: 2 }} variant='middle' textAlign='left'>
				<Typography sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, py: { xs: 1, md: 2, lg: 4 } }} color='secondary' fontWeight={900}>
					Phim Đang Chiếu
				</Typography>
			</Divider >
			<Grid container xs={12}
				display='flex'
				alignSelf='center'
				py={{ xs: 1, sm: 2, lg: 4 }}
				px={{ xs: 3, sm: 6, lg: 12 }}
				columnSpacing={{ xs: 1, sm: 2, lg: 4 }}
				rowSpacing={{ xs: 3, sm: 6, lg: 12 }}>
				<Grid xs={6} md={3} fontSize='1.25rem'>
					< MovieCard id={0} name={'done'} img={require('app/components/NewMovieList/assets/images/movie1.png')} />
				</Grid>
				<Grid xs={6} md={3} fontSize='1.25rem'>
					< MovieCard id={0} name={'done'} img={require('app/components/NewMovieList/assets/images/movie2.png')} />
				</Grid>
				<Grid xs={6} md={3} fontSize='1.25rem'>
					< MovieCard id={0} name={'done'} img={require('app/components/NewMovieList/assets/images/movie3.png')} />
				</Grid>
				<Grid xs={6} md={3} fontSize='1.25rem'>
					< MovieCard id={0} name={'done'} img={require('app/components/NewMovieList/assets/images/movie4.png')} />
				</Grid>
				<Grid xs={6} md={3} fontSize='1.25rem'>
					< MovieCard id={0} name={'done'} img={require('app/components/NewMovieList/assets/images/movie5.png')} />
				</Grid>
				<Grid xs={6} md={3} fontSize='1.25rem'>
					< MovieCard id={0} name={'done'} img={require('app/components/NewMovieList/assets/images/movie6.png')} />
				</Grid>
			</Grid>
		</div >
	)
}
