import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  registerBox: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    padding: '2em',
  },
  loginButton: {
    borderRadius: '15px !important',
    transition: '0.5s !important',
    boxShadow: 'none !important',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default useStyles;
