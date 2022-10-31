import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	seat: {
		width: '2.25rem',
		height: '2.25rem',
		fontWeight: 900,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '1em',
	},

	vacant: {
		backgroundColor: '#00B74A',
		color: 'white',
	},

	booked: {
		backgroundColor: '#888888',
		color: 'white',
		cursor: 'not-allowed',
	},

	selected: {
		backgroundColor: '#FFFF00',
		color: '#1D1C1A'
	},

	creating: {
		backgroundColor: 'white',
		color: '#1D1C1A',
	}
}));

export default useStyles;