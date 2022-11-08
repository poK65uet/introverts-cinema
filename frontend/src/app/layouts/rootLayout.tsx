import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from 'app/pages/HomePage';
import AdminMenu from 'app/containers/AdminMenu';
import FilmManagementPage from 'app/pages/FilmManagementPage';
import AdminPage from 'app/pages/AdminPage';

const RootLayout = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/admin" component={AdminPage}>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default RootLayout;
