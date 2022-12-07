import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex !important',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  container: {
    width: '40% ',
    display: 'inline',
    fontSize: '1em',
  },

  title: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    fontSize: '1.125rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '3rem',
  },

  tabContainer: {},

  movieTab: {
    '&.MuiTab-root': {
      backgroundColor: '#EEEEEE',
      maxWidth: 'unset',
      flexDirection: 'row',
      justifyContent: 'left',
      textAlign: 'left',
      border: '1px solid #C1C1C1',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    '&.Mui-selected': {
      backgroundColor: '#DEDEDE',
    },
  },

  movieIcon: {
    height: '5rem',
    alignSelf: 'center',
    '&.MuiTab-iconWrapper': {
      marginBottom: '0 !important',
    },
    marginRight: '1rem',
  },

  showtimeList: {
    backgroundColor: '#EEEEEE',
    border: '1px solid #C1C1C1',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  },
}));

export default useStyles;
