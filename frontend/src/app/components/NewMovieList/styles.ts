import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({

	container: {
		margin: '1rem !important',
		padding: '0 !important',
		alignSelf: 'center',
		maxWidth: '79% !important',
		'& .swiper-button-next, .swiper-button-prev': {
		color: '#FFD6A5',
		},

	},
	
	movie: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'fit-content',
		maxHeight: '-webkit-fill-available',
	},
}));

export default useStyles;
