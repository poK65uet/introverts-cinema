import { makeStyles } from '@mui/styles';
import background from './assets/bg-404.png';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  notFoundPage: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    display: 'flex',
    height: 'auto',
  },
  icon: {
    margin: 'auto',
    padding: '7.5rem',
    [theme.breakpoints.down('md')]: {
      width: '-webkit-fill-available',
      padding: '5rem',
    },
  },
}));

export default useStyles;
