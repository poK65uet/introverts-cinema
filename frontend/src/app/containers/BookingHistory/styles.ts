import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    [theme.breakpoints.up('md')]: {
      marginInline: -85,
    },
    '&.MuiDataGrid-root': {
      backgroundColor: '#DCDCDC',
      fontSize: '1.025rem',
    },
    '& .MuiDataGrid-columnHeader': {
      fontSize: '1.05rem',
      backgroundColor: theme.palette.primary.light,
      '&:focus': {
        outline: 'none !important',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
      },
    },
    '& .MuiDataGrid-row': {
      borderTop: '1px solid black',
      boxSizing: 'border-box',
      '& .MuiDataGrid-cell:focus': {
        outline: 'none',
      },
    },
  },
  successText: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
  },
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 'bold',
  },
  inactiveRow: {
    backgroundColor: '#AAAAAA !important',
  },
}));

export default useStyles;
