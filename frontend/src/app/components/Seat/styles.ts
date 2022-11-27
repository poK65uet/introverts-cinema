import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  seat: {
    fontSize: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1em',
  },

  vacant: {
    color: '#07BC0C',
    transition: '0.35s !important',
    '&:hover': {
      color: '#2E7D32',
    },
  },

  booked: {
    color: '#888888',
    cursor: 'not-allowed',
  },

  selected: {
    color: '#F1C40F',
    transition: '0.35s !important',
    '&:hover': {
      color: '#cfa80e',
    },
  },
}));

export default useStyles;
