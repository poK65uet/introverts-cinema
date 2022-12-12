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

enum Role {
  ADMIN = 1,
  CUSTOMER = 2,
} 


const RootLayout = () => {


	const store = useSelector<RootState, RootState>(state => state);
  const roles = store.login.user ? store.login.user.Roles.map( (role : any) => role.id ) : [];

  // console.log(roles);
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.color = '#1D1C1A';
  }, [])

  return (
    
    <BrowserRouter>
      <Switch>
        <Redirect from='/admin' exact to='admin/customers' />
        <Route path="/admin" component={AdminLayout} /> 
        <Route path="/" exact component={HomeLayout} />
        {/* {roles.includes(Role.ADMIN) ? <Route path="/admin" component={AdminLayout} /> : <Route path="/" exact component={HomeLayout} /> } */}
        {roles.includes(Role.ADMIN) ? <Redirect from='/' exact to='admin' /> : <></>}
        {/* <Route component={NotFoundPage}></Route> */}
      </Switch>
      <LoadingLayer />
    </BrowserRouter>
  );
};

export default RootLayout;
