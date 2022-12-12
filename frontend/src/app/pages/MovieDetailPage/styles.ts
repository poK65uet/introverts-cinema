import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  movieDetailPage: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontSize: '0.875rem',
  },
  movieTitle: {
    textTransform: 'uppercase',
  },
  movieDetail: {
    display: 'inline',
  },
}));

export default useStyles;
