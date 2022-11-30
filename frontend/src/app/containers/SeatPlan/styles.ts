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
    marginTop: '1.25em',
    fontSize: '0.675em',
    fontWeight: 'bold',
  },
  rowCharacter: {
    color: '#696969',
    paddingLeft: '1em',
    fontSize: '0.675em',
    fontWeight: 'bold',
  },

  screen: {
    backgroundColor: '#888888',
    marginBottom: '2em',
    fontSize: '1em',
    fontWeight: 900,
  },
}));

export default useStyles;
