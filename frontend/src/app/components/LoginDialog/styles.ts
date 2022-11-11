import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	loginBox: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '50rem',
		width: '30rem',
		minHeight: '52vh',
		backgroundColor: 'white',
		borderRadius: '15px',
		overflow: 'hidden',
		padding: '2em',
	},
	button: {
		borderRadius: '15px !important',
		transform: 'translate3d(0, 0, 0)',
		transition: 'all 0.3s !important',
		'&:hover': {
			transform: 'scale(1.05)',
			transitionDuration: '0.35s !important',
		},
		'&:active': {
			transform: 'translateY(2px)',
			transitionDuration: '0.35s !important',
		}
	},
	'@media screen and (min-height: 450px)': {
		root: {
			alignItems: 'center',
		}
	}
}));

export default useStyles;