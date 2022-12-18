import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  seatPlan: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  seat: {
    fontSize: '2em',
    alignSelf: 'center',
  },
  colNum: {
    color: '#696969',
    marginTop: '0.5em',
    fontSize: '0.75em',
    fontWeight: 'bold',
  },
  rowCharacter: {
    backgroundColor: '#696969',
    color: '#FFFFFF',
    marginLeft: '0.4em',
    marginTop: '0.25em',
    padding: 1,
    fontSize: '0.675em',
    fontWeight: 'bold',
  },

  screen: {
    backgroundColor: '#B6B6B3',
    fontSize: '1em',
    fontFamily: 'Cerebri Sans,sans-serif',
    fontWeight: 'bold',
    padding: '0.125em !important',
    marginBottom: '1em',
  },

  seatVacantExplain: {
    '&::before': {
      backgroundColor: '#ABABAB',
      content: '""',
      display: 'inline-block',
      width: 10,
      height: 10,
      marginRight: '0.5em',
    },
  },

  seatSelectedExplain: {
    '&::before': {
      backgroundColor: '#07BC0C',
      content: '""',
      display: 'inline-block',
      width: 10,
      height: 10,
      marginRight: '0.5em',
    },
  },

  seatBookedExplain: {
    '&::before': {
      backgroundColor: '#E74C3C',
      content: '""',
      display: 'inline-block',
      width: 10,
      height: 10,
      marginRight: '0.5em',
    },
  },

  seatBookingExplain: {
    '&::before': {
      backgroundColor: '#F1C40F',
      content: '""',
      display: 'inline-block',
      width: 10,
      height: 10,
      marginRight: '0.5em',
    },
  },
}));

export default useStyles;
