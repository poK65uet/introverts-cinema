import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  stepLabel: {
    '& .MuiStepLabel-label': {
      fontWeight: 'bold !important',
    },
    '& .MuiStepIcon-root': {
      color: '#FFFFFFF',
      transition: '0.3s !important',
      fontSize: '2.5em',
    },
  },
}));

export default useStyles;
