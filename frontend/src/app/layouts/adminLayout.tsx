import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from 'app/containers/Footer';
import MasterDialog, { notify } from 'app/components/MasterDialog';
import paths from 'paths';
import AdminAppBar from 'app/components/AdminAppBar';
import AdminMenu from 'app/containers/AdminMenu';
import RoomManagementPage from 'app/pages/RoomManagementPage';
import TicketManagementPage from 'app/pages/TicketManagementPage';
import CustomerManagementPage from 'app/pages/CustomerManagementPage';
import FilmManagementPage from 'app/pages/FilmManagementPage';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const AdminLayout = () => {

	const store = useSelector<RootState, RootState>(state => state)

  return (
    <React.Fragment>
      <AdminAppBar />
      <AdminMenu />
      <Switch>
        <Route
          path={paths.FilmManagement}
          component={FilmManagementPage}
        />
        <Route
          path={paths.CustomerManagement}
          component={CustomerManagementPage}
        />
        <Route
          path={paths.RoomManagement}
          component={RoomManagementPage}
        />
        <Route
          path={paths.TicketManagement}
          component={TicketManagementPage}
        />
      </Switch>
      {/* <Footer/> */}
    </React.Fragment>
  );
};

export default AdminLayout;
