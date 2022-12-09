import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  profilePage: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  container: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: '1.25rem',
  },

  tabList: {
    marginBottom: 20,
  },

  tab: {
    '&.MuiTab-root': {
      fontSize: '1em',
    },
  },

  tabPanel: {
    '&.MuiTabPanel-root': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

export default useStyles;
