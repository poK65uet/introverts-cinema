import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({

	container: {
		marginTop: '1rem !important',
		padding: '0 !important',
		alignSelf: 'center',
		maxWidth: '100% !important',
		'& .swiper-button-next, .swiper-button-prev': {
		color: '#FFD6A5',
		},
	},

	movieList: {
		height: '25rem ',
		'& .swiper-wrapper':{
			alignItems:'center',
		},
	},

	movie: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '20rem',
		backgroundColor: '#FF884B',
		color: '#fff',
		fontSize: '2rem',
		'&.swiper-slide-active': {
			transform: 'scale(1.1)',
			transitionDuration: '0.35s !important',
			zIndex: '1',
		},
	},
	moviered: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '20rem',
		backgroundColor: '#FF9AA2',
		color: '#fff',
		fontSize: '2rem',
		'&.swiper-slide-active': {
			transform: 'scale(1.1)',
			transitionDuration: '0.35s !important',
			zIndex: '1',
		},
	},
	movieblue: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '20rem',
		backgroundColor: '#C7CEEA',
		color: '#fff',
		fontSize: '2rem',
		'&.swiper-slide-active': {
			transform: 'scale(1.1)',
			transitionDuration: '0.35s !important',
			zIndex: '1',
		},
	},
	moviegreen: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '20rem',
		backgroundColor: '#B5EAD7',
		color: '#fff',
		fontSize: '2rem',
		'&.swiper-slide-active': {
			transform: 'scale(1.1)',
			transitionDuration: '0.35s !important',
			zIndex: '1',
		},
	},
	movieblack: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '20rem',
		backgroundColor: 'black',
		color: '#fff',
		fontSize: '2rem',
		'&.swiper-slide-active': {
			transform: 'scale(1.1)',
			transitionDuration: '0.35s !important',
			zIndex: '1',
		},
	},
	
}));

export default useStyles;
