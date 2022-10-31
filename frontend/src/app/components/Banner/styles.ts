import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  swiper: {
    maxWidth: '100%',
    height: 'fit-content',
    marginBottom:'1rem',
    '& .swiper-wrapper':{
      height: 'fit-content',
		},
    '& .swiper-button-next, .swiper-button-prev': {
      color: '#FFD6A5',
    },
    '& .swiper-pagination-bullet-active': {
      backgroundColor: '#FFD6A5',
    },
  },

  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit-content',
    maxHeight: '35vw',
    backgroundColor: 'transperant',
    color: '#fff',
    fontSize: '4rem',
    '& .swiper-slide' : {
      height: 'fit-content !important',
    },
    '& img': {
      maxWidth: '100%',
      objectFit: 'cover',
    },
  },

}));
  
export default useStyles;