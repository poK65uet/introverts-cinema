import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({

	container: {
		margin: '1rem 0 !important',
		padding: '0 !important',
		alignSelf: 'center',
		maxWidth: '100% !important',
		maxHeight: '30vw',
    '& .swiper-button-next, .swiper-button-prev': {
      color: '#FFD6A5',
    },
	'& .swiper': {
		height: '22.5rem ',
		maxHeight: '20vw',
	},
		'& .swiper-wrapper':{
			alignItems:'center',
			maxHeight: '20vw',
		},
	},

	list: {
		maxHeight: '19.25rem',
	},

	movie: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'fit-content',
	},
}));

export default useStyles;
