import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  upcomingMoviePage: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  movieTitle: {
    cursor: 'pointer',
    fontWeight: 'bolder',
    paddingTop: 6,
    textTransform: 'uppercase',
    transition: '0.35s',
    '&:hover': {
      color: '#FF884B !important',
    },
  },
}));

export default useStyles;
