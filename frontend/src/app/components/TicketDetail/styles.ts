import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  ticket: {
    borderRadius: '30px !important',
    minWidth: '30em',
    maxWidth: '30em',
    display: 'flex',
    fontSize: '1.25rem',
    height: 'fit-content',
    transition: '0.5s',
    '& .MuiCardMedia-root': {
      width: 'unset',
    },
    '& .MuiCardContent-root': {
      paddingBlock: '4px',
    },
  },
  price: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
