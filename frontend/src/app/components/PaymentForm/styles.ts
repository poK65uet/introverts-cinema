import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: 'fit-content',
    margin: 'auto',
    padding: 20,
    textAlign: 'center',
    '&.MuiPaper-root': {
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF',
      maxWidth: '22.5rem',
    },
    justifyContent: 'center',
    '& .MuiCardHeader-root': {
      paddingTop: 0,
    },
    '& .MuiCardContent-root': {
      backgroundColor: '#FFFFFF',
      color: theme.palette.text.primary,
      padding: '0 !important',
      '& .MuiCardMedia-root': {
        maxWidth: '20rem',
        display: 'initial',
      },
      '& .MuiCardActions-root': {
        justifyContent: 'space-around',
      },
    },
  },

  button: {
    '&.MuiButtonBase-root': {
      color: '#FFFFFF',
      margin: 10,
    },
  },
}));

export default useStyles;
