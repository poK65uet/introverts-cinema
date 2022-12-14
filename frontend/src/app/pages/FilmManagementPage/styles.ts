import { Height } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { spacing } from '@mui/system';

const useStyles = makeStyles(() => ({
  filmTable: {
    height: 1100,
    width: 'calc(100% - 360px)',
    marginLeft: '330px',
    marginTop: '20px',
  },
  collumnHeader: {
    fontWeight: 'bold !important',
  },
  addButton: {
    variant: 'outlined',
    align: 'left !important',
  },
}));

export default useStyles;
