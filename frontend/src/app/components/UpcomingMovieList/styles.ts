import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: '1rem 0 !important',
    padding: '0 !important',
    alignSelf: 'center',
    maxWidth: '100% !important',
    maxHeight: '30vw',
    [theme.breakpoints.down('md')]: {
      maxHeight: '45vw',
    },
    '& .swiper-button-next, .swiper-button-prev': {
      color: '#FFD6A5',
    },
    '& .swiper': {
      height: '22.5rem ',
      maxHeight: '20vw',
      [theme.breakpoints.down('md')]: {
        maxHeight: '35vw',
      },
    },
    '& .swiper-wrapper': {
      alignItems: 'center',
      maxHeight: '20vw',
      [theme.breakpoints.down('md')]: {
        maxHeight: '35vw',
      },
    },
  },

  movie: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit-content',
    maxHeight: '-webkit-fill-available',
  },
}));

export default useStyles;
