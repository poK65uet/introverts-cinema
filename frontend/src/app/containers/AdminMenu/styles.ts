import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    justifyContent: 'left !important',
  },

  activeTab: {
    transition: '0.5s',
    textColor: 'primary !important',
    backgroundColor: 'orange !important',
    fontWeight: 'bold !important',
  },

  wrapper: {},

  adminMenu: {
    width: '300px !important',
    padding: '0 !important',
    borderRight: '1px solid #ccc',
    backgroundColor: '#d1e9ea',
    height: '100vh',
    float: 'left',
    textAlign: 'center',
    '&.MuiDataGrid-main': { alignSelf: 'center !important' },
    position: 'fixed',
    zIndex: 11,
  },
}));

export default useStyles;
