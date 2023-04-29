import React, { useEffect, useRef, useState } from 'react';
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
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Grow,
  Popper,
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
  Person as ProfileIcon,
  QueryStats as StatsIcon,
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

import useStyles from './styles';
import { Link } from 'react-router-dom';
import paths from 'paths';
import LoginDialog from 'app/components/LoginDialog';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { loginActions } from 'app/components/LoginDialog/slice';

export default function AppBar() {

  const [openMenuMovie, setOpenMenuMovie] = useState(false)
  const [openMainMenu, setOpenMainMenu] = useState(false)
  const [openLoginDialog, setOpenLoginDialog] = useState(false)
  const [openOpt, setOpenOpt] = useState(false)

  const handleClickMainMenu = () => setOpenMainMenu(!openMainMenu)
  const handleCloseMainMenu = () => setOpenMainMenu(false)
  const handleOpenMenuMovie = () => setOpenMenuMovie(true)
  const handleCloseMenuMovie = () => setOpenMenuMovie(false)
  const handleOpenLoginDialog = () => setOpenLoginDialog(true)
  const handleCloseLoginDialog = () => setOpenLoginDialog(false)
  const handleOpenOpt = () => setOpenOpt(true)
  const handleCloseOpt = () => setOpenOpt(false)

  // Atempting to fix warning bugs
  const onResize = () => { }
  const onResizeCapture = () => { }

  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(openOpt);

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(loginActions.logout())
    handleCloseOpt
  }

  const classes = useStyles();

  const store = useSelector<RootState, RootState>(state => state)

  useEffect(() => {
    if (prevOpen.current === true && openOpt === false)
      anchorRef.current!.focus();
    prevOpen.current = openOpt;
  }, [store, openOpt])

  return (
    <MuiAppBar
      className={classes.appBar}
      color='secondary'
      position='sticky'
      sx={{
        fontSize: { xs: '10px !important', sm: '1em !important' }
      }}>
      <Link to='/' style={{ zIndex: 'inherit' }}>
        <Button disableRipple
          className={classes.logoButton}
          sx={{
            position: 'absolute'
          }}
          color='secondary'>
          <img className={classes.logo} src={require('app/assets/images/logo.webp')} />
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
          disableFocusRipple
          color='inherit'
          onClick={handleClickMainMenu}
          startIcon={<MenuIcon className={classes.icon} />} />
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
          anchor='top'>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}>
            <TreeItem nodeId='1' className={classes.menuItem} label='PHIM'>
              <Link to={`${paths.NewMoviePage}`} style={{ all: 'unset' }} onClick={handleCloseMainMenu}>
                <TreeItem nodeId='2' className={classes.menuItem} label='PHIM ĐANG CHIẾU' />
              </Link>
              <Link to={`${paths.UpcomingMoviePage}`} style={{ all: 'unset' }} onClick={handleCloseMainMenu}>
                <TreeItem nodeId='3' className={classes.menuItem} label='PHIM SẮP CHIẾU' />
              </Link>
            </TreeItem>
            <Link to={`${paths.BookTicketPage}`} style={{ all: 'unset' }} onClick={handleCloseMainMenu}>
              <TreeItem nodeId='4' className={classes.menuItem} label='ĐẶT VÉ' />
            </Link>
            <TreeItem nodeId='5' className={classes.menuItem} label='HỖ TRỢ' />
            <Link to={`${paths.UserPage}`} style={{ all: 'unset' }} onClick={handleCloseMainMenu}>
              <TreeItem nodeId='6' className={classes.menuItem} label='TÀI KHOẢN' />
            </Link>
          </TreeView>
        </Drawer>
      </Container>
      <Toolbar
        className={classes.toolBar}
        sx={{
          display: { xs: 'none', sm: 'flex' }
        }}>
        {store.login.isAdmin ? null :
          <React.Fragment>
            {openMenuMovie ?
              <Button disableRipple color='inherit' className={classes.button}
                onMouseOver={handleOpenMenuMovie}
                onMouseLeave={handleCloseMenuMovie}>
                <Slide in={openMenuMovie} mountOnEnter unmountOnExit>
                  <List className={classes.movieMenu}>
                    <Link style={{ all: 'unset' }} to={paths.NewMoviePage} >
                      <ListItemButton className={classes.listButton} disableRipple>
                        PHIM ĐANG CHIẾU
                      </ListItemButton>
                    </Link>
                    <Link style={{ all: 'unset' }} to={paths.UpcomingMoviePage} >
                      <ListItemButton className={classes.listButton} disableRipple>
                        PHIM SẮP CHIẾU
                      </ListItemButton>
                    </Link>
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
            <Link className={classes.buttonLink} to={paths.BookTicketPage}>
              <Button disableRipple color='inherit' className={classes.button}>
                Đặt vé
              </Button>
            </Link>
            <Button disableRipple color='inherit' className={classes.button}>
              Hỗ trợ
            </Button>
          </React.Fragment>
        }
        <Button
          sx={{
            position: 'absolute',
            display: store.login.isLoggedin ? 'none' : 'flex'
          }}
          disableRipple
          color='inherit'
          className={classes.loginButton}
          startIcon={< LoginIcon sx={{ height: { lg: '0.75em', xl: '1em' } }} />}
          onClick={handleOpenLoginDialog}>
          <span className={classes.buttonText}>
            Đăng nhập
          </span>
        </Button>
        <Link to={`${paths.UserPage}`} style={{ all: 'unset' }}>
          <Button
            sx={{
              position: 'absolute',
              display: store.login.isLoggedin ? 'flex' : 'none'
            }}
            disableRipple
            color='inherit'
            className={classes.accountButton}
            startIcon={<AccountIcon className={classes.icon} />} />
        </Link>
        <Button
          sx={{
            position: 'absolute',
          }}
          disableRipple
          color='inherit'
          ref={anchorRef}
          className={classes.optButton}
          onClick={handleOpenOpt}
          disabled={!store.login.isLoggedin}
          hidden={!store.login.isLoggedin}>
          <ExpandMoreIcon />
        </Button>
        <Popper
          sx={{ display: store.login.isLoggedin ? 'initial' : 'none' }}
          open={openOpt}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal
          // onResize={onResize}
          // onResizeCapture={onResizeCapture}
          nonce={''}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'top-end' ? 'right bottom' : 'right top',
              }}>
              <Paper sx={{
                bgcolor: '#1D1C1A',
                color: 'inherit',
                borderStartEndRadius: 0,
              }}>
                <ClickAwayListener onClickAway={handleCloseOpt}>
                  <MenuList>
                    <Link to={`${paths.UserPage}`} style={{ all: 'unset' }}>
                      <MenuItem
                        disableRipple
                        className={classes.optItems}
                        onClick={handleCloseOpt}>
                        <ProfileIcon sx={{ pr: 1, mr: 'auto' }} />
                        Thông tin
                      </MenuItem>
                    </Link>
                    <Link to={`${paths.CustomerManagement}`} style={{ all: 'unset' }}>
                      {store.login.isAdmin ?
                        <MenuItem
                          disableRipple
                          className={classes.optItems}
                          onClick={handleCloseOpt}>
                          <StatsIcon sx={{ pr: 1, mr: 'auto' }} />
                          Quản lý
                        </MenuItem> : null}
                    </Link>
                    <MenuItem
                      disableRipple
                      className={classes.optItems}
                      onClick={handleLogout}>
                      <LogoutIcon sx={{ pr: 1, mr: 'auto' }} />
                      Đăng xuất
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
      <LoginDialog open={openLoginDialog} onClose={handleCloseLoginDialog} />
    </MuiAppBar>
  );
}
