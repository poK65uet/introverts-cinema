import { makeStyles } from '@mui/styles';
// TODO: Change dialog size
const useStyles = makeStyles(() => ({
  AddFilmBox: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    padding: '2em',
    // width: '1000 !important',
  },

  AddFilmButton: {
    borderRadius: '15px !important',
    transition: '0.5s !important',
    boxShadow: 'none !important',
  },

}));

export default useStyles;
