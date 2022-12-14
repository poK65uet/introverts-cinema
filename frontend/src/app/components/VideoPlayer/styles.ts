import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dialog: {
    '& .MuiPaper-root': {
      maxWidth: 'unset',
      maxHeight: 'unset',
    },
  },
  player: {
    display: 'flex',
  },
}));

export default useStyles;
