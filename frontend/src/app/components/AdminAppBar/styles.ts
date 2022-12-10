import { makeStyles } from '@mui/styles';
import { Hidden, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        color: 'white !important',
        maxHeight: '5rem',
        minHeight: '4rem',
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
        paddingTop: 4,
        paddingBottom: 4,
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
