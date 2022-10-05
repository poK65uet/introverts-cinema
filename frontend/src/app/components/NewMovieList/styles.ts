import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({

	container: {
		margin: '1rem !important',
		alignSelf: 'center',
		maxWidth: 'auto !important',
    '& .swiper-button-next, .swiper-button-prev': {
      color: '#FFD6A5',
    },
	'& .swiper': {
		height: '22.5rem ',
	},
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
	},

	movieC: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '20rem',
	},
}));

export default useStyles;
