import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: '5rem 0 2rem 0 !important',
    padding: '0 !important',
    alignSelf: 'center',
    minWidth: '90%',
    [theme.breakpoints.down('md')]: {
      maxHeight: '45vw',
    },
    '& .swiper-button-next, .swiper-button-prev': {
      color: '#FFD6A5',
    },
    '& .swiper': {
      height: '22.5rem ',
      [theme.breakpoints.down('md')]: {
        maxHeight: '35vw',
      },
    },
    '& .swiper-wrapper': {
      alignItems: 'center',
      maxHeight: '22vw',
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
