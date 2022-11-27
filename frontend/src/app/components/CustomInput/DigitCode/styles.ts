import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  digit: {
    width: '-webkit-fill-available',
    height: '-webkit-fill-available',
    fontFamily: 'monospace',
    fontSize: '2em',
    textAlign: 'center',
    color: theme.palette.secondary.main,
    border: '0 solid',
    padding: 0,
    borderColor: '#F0F2F5',
    outline: 'none',
  },
}));

export default useStyles;
