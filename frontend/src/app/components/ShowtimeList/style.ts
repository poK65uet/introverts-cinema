import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  timeButton: {
    '&.MuiButton-root': {
      color: theme.palette.secondary.main,
      fontSize: '1rem',
      border: '1px solid #C1C1C1',
      padding: '0.375rem',
      margin: '0.5rem',
      '&:hover': {
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  },
  visionType: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
}));

export default useStyles;
