import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	appBar: {
		maxHeight: '64px',
	  	backgroundColor: '#1D1C1A !important',
		color: 'white !important',
		display: 'flex',
		position: 'sticky',
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
		minWidth: '12.5vw !important',
		maxWidth: '12.5vw !important',
		fontSize: 'max(0,75vw) !important',
		'&:hover': {
			color: '#FF884B ',
			transform: 'scale(1.05)',
			transitionDuration: '0.5s',
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

	movieMenu: {
			top: '64px',
			backgroundColor: '#1D1C1A',
			position: 'static',
			color: 'white',
	},

	icon: {
		fontSize: '50px !important',
	},
}));

export default useStyles;