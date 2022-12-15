import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  AddFilmBox: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    padding: '2em',
  },

  AddFilmButton: {
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
}));

export default useStyles;
