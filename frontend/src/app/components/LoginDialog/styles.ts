import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
    '@media screen and (min-height: 450px)': {
      root: {
        alignItems: 'center',
      },
    },
  },
}));

export default useStyles;
