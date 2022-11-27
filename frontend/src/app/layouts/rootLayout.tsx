import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Router } from 'react-router-dom';
import { HomePage } from 'app/pages/HomePage';
import AdminPage from 'app/pages/AdminPage';
import { Header } from 'app/containers/Header';
import LoadingLayer from 'app/components/LoadingLayer';
import Banner from 'app/components/Banner';
import HomeLayout from './homeLayout';

const RootLayout = () => {

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.color = '#1D1C1A';
  })

  return (
    <BrowserRouter>
      <Switch>
        <Redirect from='/admin' exact to='admin/customers' />
        <Route path="/admin" component={AdminPage} />
        <Route path='/' component={HomeLayout} />
      </Switch>
      <LoadingLayer />
    </BrowserRouter>
  );
};

export default RootLayout;
