import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  bookTicketPage: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },

  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2.5em',
  },

  button: {
    '&.MuiButtonBase-root': {
      color: '#FFFFFF',
    },
  },

  seatSelectWrapper: {
    minWidth: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'center',
    fontSize: '0.75em',
  },
}));

export default useStyles;
