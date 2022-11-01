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
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import useStyles from './styles';

export default function AppBar() {

  const [openMenuMovie, setOpenMenuMovie] = React.useState(false);
  const [openMenuSearchMovie, setOpenMenuSearchMovie] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [accountOpt, setAccountOpt] = React.useState(false);

  const handleOpenMenuMovie = () => {
    setOpenMenuMovie(true);
  }

  const handleCloseMenuMovie = () => {
    setOpenMenuMovie(false);
  }

  const handleOpenMenuSearchMovie = () => {
    setOpenMenuSearchMovie(true);
  }

  const handleCloseMenuSearchMovie = () => {
    setOpenMenuSearchMovie(false);
  }

  const handleLogin = () => {
    setLogin(true);
  }

  const handleLogout = () => {
    setLogin(false);
  }

  const classes = useStyles();

  return (
    <MuiAppBar className={classes.appBar}
      color='secondary'
      position='sticky'
      sx={{
        fontSize: { xs: '10px !important', sm: '1em !important' }
      }}
    >
      <Button
        sx={{
          display: { sm: 'none' }
        }}
        color='inherit'
        disableRipple
        className={classes.menuButton}
        startIcon={<MenuIcon className={classes.icon} />}
      />
      <Toolbar className={classes.toolBar}
        sx={{
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        {openMenuSearchMovie ?
          <Button disableRipple color='inherit' className={classes.button}
            onMouseOver={handleOpenMenuSearchMovie}
            onMouseLeave={handleCloseMenuSearchMovie}>
            <Slide in={openMenuSearchMovie} mountOnEnter unmountOnExit>
              <List className={classes.movieMenu}>
                <ListItemButton className={classes.listButton} disableRipple>
                  PHIM THEO THỂ LOẠI
                </ListItemButton>
                <ListItemButton className={classes.listButton} disableRipple>
                  PHIM THEO GIỜ CHIẾU
                </ListItemButton>
              </List>
            </Slide>
          </Button>
          :
          <Fade in={!openMenuSearchMovie}>
            <Button disableRipple color='inherit' className={classes.button}
              onMouseOver={handleOpenMenuSearchMovie}
              onMouseLeave={handleCloseMenuSearchMovie}>
              Tìm kiếm
              < ExpandMoreIcon />
            </Button>
          </Fade>
        }
        {openMenuMovie ?
          <Button disableRipple color='inherit' className={classes.button}
            onMouseOver={handleOpenMenuMovie}
            onMouseLeave={handleCloseMenuMovie}>
            <Slide in={openMenuMovie} mountOnEnter unmountOnExit>
              <List className={classes.movieMenu}>
                <ListItemButton className={classes.listButton} disableRipple>
                  PHIM ĐANG CHIẾU
                </ListItemButton>
                <ListItemButton className={classes.listButton} disableRipple>
                  PHIM SẮP CHIẾU
                </ListItemButton>
              </List>
            </Slide>
          </Button>
          :
          <Fade in={!openMenuMovie}>
            <Button disableRipple color='inherit' className={classes.button}
              onMouseOver={handleOpenMenuMovie}
              onMouseLeave={handleCloseMenuMovie}>
              Phim
              < ExpandMoreIcon />
            </Button>
          </Fade>
        }
        <Button disableRipple color='inherit' className={classes.button}>Lịch chiếu</Button>
        <Button disableRipple color='inherit' className={classes.button}>Đặt vé</Button>
        {!login ?
          <Button
            sx={{ position: 'absolute' }}
            disableRipple
            color='inherit'
            className={classes.loginButton}
            startIcon={< LoginIcon sx={{ height: { lg: '0.75em', xl: '1em' } }} />}
            onClick={handleLogin}>
            <span className={classes.buttonText}>
              Đăng nhập
            </span>
          </Button>
          :
          <>
            <Button
              sx={{ position: 'absolute' }}
              disableRipple
              color='inherit'
              className={classes.accountButton}
              startIcon={<AccountIcon className={classes.icon} />}
            />
            <Button
              sx={{ position: 'absolute' }}
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
