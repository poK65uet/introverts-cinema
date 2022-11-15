import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dialog: {
    minHeight: 'min(25vh, 30vw)',
    minWidth: 'min(25vh, 30vw)',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {},
  action: {
    '&:hover': {
      color: '#FF884B ',
      transitionDuration: '0.5s',
    },
  },
  button: {
    borderRadius: '10px !important',
    backgroundColor: '#1D1C1A !important',
    color: 'white !important',
    '&:hover': {
      color: '#FF884B !important',
      transitionDuration: '0.5s',
    },
  },
}));

export default useStyles;
