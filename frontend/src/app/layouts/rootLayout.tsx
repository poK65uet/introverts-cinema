import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from 'app/pages/HomePage';
import { Header } from 'app/containers/Header';
import LoadingLayer from '../components/LoadingLayer';

const RootLayout = () => {
  return (
    <BrowserRouter>
      <Header />
      <LoadingLayer />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
      </Switch>
    </BrowserRouter>
  );
};

export default RootLayout;
