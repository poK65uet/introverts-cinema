import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  movieDetailPage: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  movieTittle: {
    textTransform: 'uppercase',
  },
  movieDetail: {},
}));

export default useStyles;
