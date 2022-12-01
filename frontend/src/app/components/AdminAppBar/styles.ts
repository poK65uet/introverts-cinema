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

    logo: {
        objectFit: 'cover',
        maxHeight: '-webkit-fill-available',
        maxWidth: '-webkit-fill-available',
        marginLeft: 20,
    },

    logoButton: {
        left: 0,
        height: '4rem',
        [theme.breakpoints.down('sm')]: {
            height: '3rem',
        },
        padding: '0 !important',
        zIndex: 'inherit',
    },

}));
export default useStyles;
