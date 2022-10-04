import * as React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  List,
  ListItemButton,
  Slide,
  Fade,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';
import useStyles from './styles';

export default function AppBar() {

  const [openMenuFilm, setOpenMenuFilm] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [accountOpt, setAccountOpt] = React.useState(false);

  const handleOpenMenuFilm = () => {
    setOpenMenuFilm(true);
  }

  const handleCloseMenuFilm = () => {
    setOpenMenuFilm(false);
  }

  const handleLogin = () => {
    setLogin(true);
  }

  const handleLogout = () => {
    setLogin(false);
  }

  const classes = useStyles();

  return (
    <MuiAppBar className={classes.appBar} position='sticky'>
      <Toolbar className={classes.toolBar}>
        {openMenuFilm ?
          <Button disableRipple color='inherit' className={classes.button}
            onMouseOver={handleOpenMenuFilm}
            onMouseLeave={handleCloseMenuFilm}>
            <Slide in={openMenuFilm} mountOnEnter unmountOnExit>
              <List className={classes.filmMenu}>
                <ListItemButton className={classes.button} disableRipple>
                  PHIM ĐANG CHIẾU
                </ListItemButton>
                <ListItemButton className={classes.button} disableRipple>
                  PHIM SẮP CHIẾU
                </ListItemButton>
              </List>
            </Slide>
          </Button>
          :
          <Fade in={!openMenuFilm}>
            <Button disableRipple color='inherit' className={classes.button}
              onMouseOver={handleOpenMenuFilm}
              onMouseLeave={handleCloseMenuFilm}>
              Phim
              < ExpandMoreIcon />
            </Button>
          </Fade>

        }
        <Button disableRipple color='inherit' className={classes.button}>Lịch chiếu</Button>
        <Button disableRipple color='inherit' className={classes.button}>Đặt vé</Button>
        {!login ?
          <Button disableRipple color='inherit' startIcon={< LoginIcon />}
            onClick={handleLogin}>
            Đăng nhập
          </Button>
          :
          <>
            <Button
              disableRipple
              color='inherit'
              className={classes.accountButton}
              startIcon={<AccountIcon className={classes.icon} />}
            />
            <Button
              disableRipple
              color='inherit'
              className={classes.optButton}
            >
              <ExpandMoreIcon />
            </Button>
          </>
        }
      </Toolbar>
    </MuiAppBar >
  );
}
