import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  seatSelectWrapper: {
    minWidth: '85%',
    display: 'flex !important',
    alignSelf: 'center',
    fontSize: '0.875rem',
  },

  seatPlanWrapper: {
    display: 'flex !important',
    justifyContent: 'center',
  },

  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },

  button: {
    '&.MuiButtonBase-root': {
      margin: 20,
      color: '#FFFFFF',
    },
  },
}));

export default useStyles;
