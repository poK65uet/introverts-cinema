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
    transition: '0.5s',
    '&:hover': {
      color: '#FF884B ',
    },
  },
  button: {
    borderRadius: '10px !important',
    backgroundColor: '#1D1C1A !important',
    color: 'white !important',
    transition: '0.5s',
    '&:hover': {
      color: '#FF884B !important',
    },
  },
}));

export default useStyles;
