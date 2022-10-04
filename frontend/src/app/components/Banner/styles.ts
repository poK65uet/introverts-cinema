import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  banner: {
    width: '100%',
    marginBottom:'1rem',
    '& .swiper-button-next, .swiper-button-prev': {
      color: '#FFD6A5',
    },
    '& .swiper-pagination-bullet-active': {
      backgroundColor: '#FFD6A5',
    },
  },

  movie: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
    backgroundColor: '#FF884B',
    color: '#fff',
    fontSize: '4rem',
  },

}));
  
export default useStyles;