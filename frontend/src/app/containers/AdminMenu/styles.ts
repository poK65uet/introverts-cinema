import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    justifyContent: 'left !important',
  },

  activeTab: {
    transition: '0.5s',
  },

  wrapper: {},

  adminMenu: {
    width: 'fit-content !important',
    minWidth: '17%',
    display: 'flex',
    padding: '0 !important',
    borderRight: '1px solid #ccc',
    backgroundColor: '#fff',
    height: '100vh',
    float: 'left',
    textAlign: 'center',
  },
}));

export default useStyles;
