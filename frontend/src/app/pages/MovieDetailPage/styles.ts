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
  playTrailer: {
    '&.MuiButtonBase-root': {
      position: 'absolute',
      transition: '0.35s',
      backgroundColor: '#000000AA',
      color: '#FFFFFFEE',
      '&:hover': {
        backgroundColor: '#00000088',
        color: '#FFFFFFBB',
      },
    },
  },
  movieDetail: {
    display: 'inline',
  },
}));

export default useStyles;
