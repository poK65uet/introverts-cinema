import React, { memo, useEffect, useLayoutEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container, Tab, Tabs } from '@mui/material';

import useStyles from './styles';
import paths from 'paths';
import path from 'path';
import FilmManagementPage from '../../pages/FilmManagementPage/index';

import PeopleIcon from '@mui/icons-material/People';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import TheatersIcon from '@mui/icons-material/Theaters';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

function AdminMenu() {
  const classes = useStyles();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const [tab, setTab] = useState(-1);

  useLayoutEffect(() => {
    setPathname(location.pathname);
    switch (location.pathname) {
      case paths.CustomerManagement:
        setTab(0);
        break;
      case paths.RoomManagement:
        setTab(1);
        break;
      case paths.ShowtimeManagementPage:
        setTab(2);
        break;
      case paths.FilmManagement:
        setTab(3);
        break;
      case paths.TicketManagement:
        setTab(4);
        break;
      case paths.BookedTicketManagementPage:
        setTab(5);
        break;
      default:
        setTab(-1);
        break;
    }
  }, [location]);

  return (
    <Container className={classes.adminMenu}>
      <Tabs
        value={tab === -1 ? false : tab}
        orientation={'vertical'}
        textColor="inherit"
      >
        <Tab
          className={tab === 0 ? classes.activeTab : classes.tab}
          component={Link}
          label="Quản lý Khách hàng"
          icon={<PeopleIcon />}
          iconPosition="start"
          to={paths.CustomerManagement}
        />
        <Tab
          className={tab === 1 ? classes.activeTab : classes.tab}
          component={Link}
          label="Quản lý phòng chiếu"
          icon={<CameraIndoorIcon />}
          iconPosition="start"
          to={paths.RoomManagement}
        />
        <Tab
          className={tab === 2 ? classes.activeTab : classes.tab}
          component={Link}
          label="Quản lý suất chiếu"
          icon={<TheatersIcon />}
          iconPosition="start"
          to={paths.ShowtimeManagementPage}
        />
        <Tab
          className={tab === 3 ? classes.activeTab : classes.tab}
          component={Link}
          label="Quản lý phim"
          icon={<CameraRollIcon />}
          iconPosition="start"
          to={paths.FilmManagement}
        />
        <Tab
          className={tab === 4 ? classes.activeTab : classes.tab}
          component={Link}
          label="Quản lý vé"
          icon={<LocalActivityIcon />}
          iconPosition="start"
          to={paths.TicketManagement}
        />
        <Tab
          className={tab === 5 ? classes.activeTab : classes.tab}
          component={Link}
          label="Danh sách vé đã đặt"
          icon={<ConfirmationNumberIcon />}
          iconPosition="start"
          to={paths.BookedTicketManagementPage}
        />
      </Tabs>
    </Container>
  );
}

export default AdminMenu;
