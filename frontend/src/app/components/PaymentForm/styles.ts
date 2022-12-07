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
        maxWidth: '15rem',
        display: 'initial',
      },
      '& .MuiCardActions-root': {
        justifyContent: 'center',
      },
    },
  },

  button: {
    '&.MuiButtonBase-root': {
      color: '#FFFFFF',
    },
  },
}));

export default useStyles;
