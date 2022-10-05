import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({

	container: {
		maxHeight: '20rem',
		boxShadow: 'none !important',
		WebkitTransitionDuration: '1s',
		'&:hover': {
			'& img': {
				backgroundColor: 'black',
			transitionDuration: '0.25s',
			opacity: '0.9',
			filter: 'brightness(20%)',
			}
		},
	},

	movie: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '20rem',
		width: '12rem',
		color: '#FFFFFF',
	},

	information: {
		top: '0rem',
		position: 'fixed',
		color: '#FFFFFF',
	},
	
	actions: {
		left: '50%',
        transform: 'translate(-50%)',
		bottom: '1.25rem',
		position: 'fixed',
		display: 'flex',
		justifyContent: 'space-around',
		filter: 'brightness(100%) !important'
	},

	button: {
		margin: '0 1.25rem !important',
		backgroundColor: '#FF884B !important',
		color: '#FFFFFF !important'
	},
}));

export default useStyles;
