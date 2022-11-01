import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme : Theme) => ({
	appBar: {
		color: 'white !important',
		maxHeight: '4em',
		display: 'flex',
		zIndexL: 11,
	},

	toolBar: {
		display: 'flex',
		color: 'white',
		paddingLeft: '1rem !important',
		justifyContent: 'center',
		alignItems: 'stretch !important',
	},

	button: {
		minWidth: '9em !important',
		maxWidth: '9em',
		fontSize: '1em !important',
		'&:hover': {
			color: theme.palette.primary.main,
			transitionDuration: '0.5s',
		},
		[theme.breakpoints.up('sm')]: {
		  minWidth:'15vw !important',
		}
	},

	buttonText: {
		[theme.breakpoints.down('sm')]: {
		  display: 'none'
		}
	},

	loginButton: {
		fontSize: '1em !important',
		right: '1em',
		height: '4rem',
		[theme.breakpoints.down('sm')]: {
			right: '-1rem',
			height: '56px',
		},
	},

	accountButton: {
		right: '1.5em',
		height: '4rem',
		[theme.breakpoints.down('sm')]: {
			right: '-1.25rem',
			height: '56px',
		},
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},

	optButton: {
		right: '-0.5rem',
		height: '4rem',
		[theme.breakpoints.down('sm')]: {
			display: 'none !important'
		}
	},

	movieMenu: {
		top: '5rem',
		backgroundColor: theme.palette.secondary.main,
		position: 'static',
		color: 'white',
		'&button': {
			height: '2rem !important',
		}
	},

	icon: {
		fontSize: '3rem !important',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem !important',
		},
	},
}));

export default useStyles;