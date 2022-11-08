import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme : Theme) => ({

	container: {
		maxHeight: '20	rem',
		fontSize: '1.75rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem !important',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.875rem !important',
		},
		boxShadow: 'none !important',
		WebkitTransitionDuration: '1s',
		'& img': {
			overflow: 'hidden',
		},
		'&:hover': {
			'& img': {
				backgroundColor: '#1D1C1A',
			transitionDuration: '0.25s',
			opacity: '0.9',
			filter: 'brightness(20%)',
			}
		},
	},

	information: {
		padding: '0.75em !important',
		fontSize: '0.675em',
		top: '0rem',
		position: 'fixed',
		color: '#FFFFFF',
	},
	
	actions: {
		fontSize: '0.75em !important',
		minWidth: '100%',
		maxWidth: '100%',
		left: '50%',
        transform: 'translate(-50%)',
		bottom: 0,
		position: 'fixed',
		display: 'flex',
		justifyContent: 'space-around',
		filter: 'brightness(100%) !important'
	},

	button: {
		fontSize: '0.75em !important',
		width: 'max-content',
		minWidth: '0 !important',
		margin: '0 !important',
		backgroundColor: '#FF884B !important',
		color: '#FFFFFF !important'
	},
}));

export default useStyles;
