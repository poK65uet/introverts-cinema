import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	appBar: {
		maxHeight: '64px',
	  	backgroundColor: 'black !important',
		color: 'white !important',
		display: 'flex',
	},

	toolBar: {
		color: 'white',
		paddingLeft: '1rem !important',
		justifyContent: 'flex-end',
		alignItems: 'stretch !important',
	},

	button: {
		marginRight: '2rem !important',
		'&:hover': {
			color: '#FF884B ',
			transform: 'scale(1.05)',
			transitionDuration: '.5s !important',
		},
	},

	accountButton: {
		alignItems: 'center',
		padding: '0 !important',
		'&:hover': {
			color: '#FF884B ',
		},
	},

	optButton: {
		marginRight: '-24px !important',
		padding: '0 !important',
		width: '24px !important',
	},

	filmMenu: {
			top: '64px',
			backgroundColor: 'black',
			position: 'static',
			color: 'white',
	},

	icon: {
		fontSize: '50px !important',
	},
}));

export default useStyles;