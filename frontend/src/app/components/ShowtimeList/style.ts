import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  timeButton: {
    '&.MuiButton-root': {
      color: theme.palette.secondary.main,
      fontSize: '1rem',
      border: '1px solid #C1C1C1',
      padding: '0.5rem',
      margin: '1rem',
      '&:hover': {
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  },
}));

export default useStyles;
