import { makeStyles } from '@mui/styles';
import { AppBar as MuiAppBar, Hidden, Theme } from '@mui/material';
import useStyles from './styles';

export default function AdminAppBar() {
    const classes = useStyles();
    return (
        <MuiAppBar
            className={classes.appBar}
            color='primary'
            position='sticky'
            sx={{
                fontSize: { xs: '10px !important', sm: '1em !important' }
            }}
        ></MuiAppBar>);
}