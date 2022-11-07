import * as React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Container,
  Drawer,
  List,
  ListItemButton,
  Slide,
  Fade,
} from '@mui/material';
import {
  TreeView,
  TreeItem
} from '@mui/lab';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

import useStyles from './styles';
import { Link } from 'react-router-dom';

export default function AppBar() {

  const [openMenuMovie, setOpenMenuMovie] = React.useState(false);
  const [openMenuSearchMovie, setOpenMenuSearchMovie] = React.useState(false);
  const [openMainMenu, setOpenMainMenu] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [accountOpt, setAccountOpt] = React.useState(false);

  const handleClickMainMenu = () => {
    setOpenMainMenu(!openMainMenu);
  }

  const handleCloseMainMenu = () => {
    setOpenMainMenu(false);
  }

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
    <MuiAppBar
      className={classes.appBar}
      color='secondary'
      position='sticky'
      sx={{
        fontSize: { xs: '10px !important', sm: '1em !important' }
      }}
    >
      <Link to='/' style={{ zIndex: 'inherit' }}>
        <Button disableRipple
          className={classes.logoButton}
          sx={{
            position: 'absolute'
          }}
          color='secondary'
        >
          <img className={classes.logo} src={require('app/assets/images/logo.png')} />
        </Button>
      </Link>
      <Container
        sx={{
          display: { xs: 'flex', sm: 'none' },
          p: 0,
          flexDirection: 'inherit',
        }}>
        <Button
          className={classes.menuButton}
          disableRipple
          color='inherit'
          onClick={handleClickMainMenu}
          startIcon={<MenuIcon className={classes.icon} />}
        />
        <Drawer
          open={openMainMenu}
          onClose={handleCloseMainMenu}
          color='white !important'
          sx={{
            display: { sm: 'none' },
          }}
          PaperProps={{
            sx: {
              color: 'white !important',
              top: '3rem',
            }
          }}
          anchor='top' >
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId='1' className={classes.menuItem} label='TÌM KIẾM'>
              <TreeItem nodeId='2' className={classes.menuItem} label='PHIM THEO THỂ LOẠI' />
              <TreeItem nodeId='3' className={classes.menuItem} label='PHIM THEO GIỜ CHIẾU' />
            </TreeItem>
            <TreeItem nodeId='4' className={classes.menuItem} label='PHIM'>
              <TreeItem nodeId='5' className={classes.menuItem} label='PHIM ĐANG CHIẾU' />
              <TreeItem nodeId='6' className={classes.menuItem} label='PHIM SẮP CHIẾU' />
            </TreeItem>
            <TreeItem nodeId='7' className={classes.menuItem} label='LỊCH CHIẾU' />
            <TreeItem nodeId='8' className={classes.menuItem} label='ĐẶT VÉ' />
            <TreeItem nodeId='9' className={classes.menuItem} label='TÀI KHOẢN' />
          </TreeView>
        </Drawer>
      </Container>
      <Toolbar
        className={classes.toolBar}
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
