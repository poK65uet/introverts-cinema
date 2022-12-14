import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    width: 'min-content',
    minWidth: '22.5vw',
    overflow: 'hidden !important',
    zIndex: 10,
  },
  title: {
    display: 'flex',
    padding: '18px 12px !important',
    alignItems: 'center',
  },
  content: {
    margin: '12px auto',
  },

  button: {
    width: '50%',
    backgroundColor: '#1D1C1A !important',
    color: 'white !important',
    transition: '0.5s',
    '&:hover': {
      color: '#FF884B !important',
    },
  },

  action: {
    width: '50%',
    backgroundColor: '#FF884B !important',
    color: 'white !important',
    transition: '0.5s',
    '&:hover': {
      color: '#1D1C1A !important',
    },
  },
}));

export default useStyles;
