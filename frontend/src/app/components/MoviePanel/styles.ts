import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    minWidth: '80%',
    maxWidth: '80%',
    margin: '2.5em',
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
      maxWidth: 'unset',
      flexDirection: 'row',
      justifyContent: 'left',
      textAlign: 'left',
      border: '1px solid #C1C1C1',
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    '&.Mui-selected': {
      backgroundColor: '#DBDBDB',
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
    border: '1px solid #C1C1C1',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  },

  timeButton: {
    '&.MuiButton-root': {
      color: theme.palette.secondary.main,
      fontSize: '1rem',
      border: '1px solid #C1C1C1',
      margin: '1rem',
      '&:hover': {
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  },
}));

export default useStyles;
