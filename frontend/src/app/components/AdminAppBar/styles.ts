import { makeStyles } from '@mui/styles';
import { Hidden, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        color: 'white !important',
        maxHeight: '4rem',
        minHeight: '3rem',
        zIndexL: 11,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row-reverse !important',
        },
    },
}));
export default useStyles;
