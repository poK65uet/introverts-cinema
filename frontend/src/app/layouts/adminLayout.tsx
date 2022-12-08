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

const AdminLayout = () => {

  return (
    <React.Fragment>
      <AdminAppBar />
      <AdminMenu className={''} />
      <Switch>
      {/* <Redirect from='/admin' exact to='/customers' /> */}
				{/* <Route path='/'  exact component={CustomerManagementPage} /> */}
        <Route
          path={`${paths.FilmManagement}`}
          component={FilmManagementPage}
        //   exact={true}
        />
        <Route
          // path={`/admin/customers`}
          path={`${paths.CustomerManagement}`}
          component={CustomerManagementPage}
          // exact={true}
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
      {/* <Footer/> */}
    </React.Fragment>
  );
};

export default AdminLayout;
