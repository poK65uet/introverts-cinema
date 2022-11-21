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
}));

export default useStyles;
