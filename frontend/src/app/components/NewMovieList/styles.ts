import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({

	container: {
		margin: '1rem !important',
		padding: '0 !important',
		alignSelf: 'center',
		maxWidth: '78% !important',
		maxHeight: '30vw',
		'& .swiper-button-next, .swiper-button-prev': {
		color: '#FFD6A5',
		},

	},
	
	movie: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'fit-content',
	},
}));

export default useStyles;
