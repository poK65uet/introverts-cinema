import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Router } from 'react-router-dom';
import FilmManagementPage from 'app/pages/FilmManagementPage';
import AdminPage from 'app/pages/AdminPage';
import LoadingLayer from 'app/components/LoadingLayer';
import HomeLayout from './homeLayout';
import AdminLayout from './adminLayout';
import NotFoundPage from 'app/pages/NotFoundPage';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { constants } from 'buffer';

const RootLayout = () => {


	const store = useSelector<RootState, RootState>(state => state);
  const role = store.login.user.Roles.map( role => role.id );

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.color = '#1D1C1A';
  }, [])

  return (
    
    <BrowserRouter>
      <Switch>
        <Redirect from='/admin' exact to='admin/customers' />
        {role ? <Route path="/" exact component={HomeLayout} /> : <Route path="/admin" component={AdminLayout} />}
        <Route component={NotFoundPage}></Route>
      </Switch>
      <LoadingLayer />
    </BrowserRouter>
  );
};

export default RootLayout;
