import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  EditFilmBox: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    padding: '2em',
  },
  EditFilmButton: {
    borderRadius: '15px !important',
    transition: '0.5s !important',
    boxShadow: 'none !important',
  },
  CancelButton: {
    borderRadius: '15px !important',
    transition: '0.5s !important',
    boxShadow: 'none !important',
    backgroundColor: '#909090 !important',
  },
  ActiveSelect: {
    '&:before': {
      borderColor: 'green !important',
    },
    '&:after': {
      borderColor: 'green !important',
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'green !important',
    },
  },
  InactiveSelect: {
    '&:before': {
      borderColor: 'red !important',
    },
    '&:after': {
      borderColor: 'red !important',
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'red !important',
    },
  },
}));

export default useStyles;
