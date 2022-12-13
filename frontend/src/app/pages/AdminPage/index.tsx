import React, { memo } from 'react';
import useStyles from './styles';
import AdminMenu from 'app/containers/AdminMenu';
import { Route, Switch } from 'react-router-dom';
import FilmManagementPage from '../FilmManagementPage';
import CustomerManagementPage from '../CustomerManagementPage';
import RoomManagementPage from '../RoomManagementPage';
import TicketManagementPage from '../TicketPriceManagementPage';
import AdminAppBar from 'app/components/AdminAppBar';
import Footer from 'app/containers/Footer';
import paths from 'paths';

export default function AdminPage() {
  const classes = useStyles();
  return (
		<React.Fragment> 
      <AdminAppBar />
      <AdminMenu />
      <div className={classes.adminContent}>
        <Switch>
          <Route
            path={`${paths.FilmManagement}`}
            component={FilmManagementPage}
            exact={true}
          />
          <Route
            path = {`/customers`}
            // path={`${paths.CustomerManagement}`}
            component={CustomerManagementPage}
            // exact={true}
          />
          <Route
            path={paths.RoomManagement}
            component={RoomManagementPage}
            exact={true}
          />
          <Route
            path={paths.TicketPriceManagement}
            component={TicketManagementPage}
            exact={true}
          />
        </Switch>
      </div>
      {/* <Footer/> */}
      </React.Fragment>
  );
}
