import React, { memo } from 'react';
import useStyles from './style';
import AdminMenu from 'app/containers/AdminMenu';
import { Route, Switch } from 'react-router-dom';
import FilmManagementPage from '../FilmManagementPage';
import CustomerManagementPage from '../CustomerManagementPage';
import RoomManagementPage from '../RoomManagementPage';
import TicketManagementPage from '../TicketManagementPage';
import AdminAppBar from 'app/components/AdminAppBar';
import Footer from 'app/containers/Footer';
import paths from 'paths';

export default function AdminPage() {
  const classes = useStyles();
  return (
    <div>
      <AdminAppBar />
      <>
      <AdminMenu className={classes.adminMenu} />

      <div className={classes.adminContent}>
        <Switch>
          <Route
            path={paths.FilmManagement}
            component={FilmManagementPage}
            exact={true}
          />
          <Route
            path={paths.CustomerManagement}
            component={CustomerManagementPage}
            exact={true}
          />
          <Route
            path={paths.RoomManagement}
            component={RoomManagementPage}
            exact={true}
          />
          <Route
            path={paths.TicketManagement}
            component={TicketManagementPage}
            exact={true}
          />
        </Switch>
      </div>
      </>
      {/* <Footer/> */}
    </div>
  );
}
