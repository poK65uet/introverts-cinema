import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  profileField: {
    width: '100%',
    '& .MuiInputBase-root': {
      minWidth: 'fit-content',
      '&.Mui-disabled': {
        backgroundColor: '#CCCCCC',
      },
    },
  },

  actions: {
    alignItems: 'center',
  },

  saveButton: {
    '&.MuiButtonBase-root': {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: '0.75em',
    },
  },
}));

export default useStyles;
