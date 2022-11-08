import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from 'app/pages/HomePage';
import { Header } from 'app/containers/Header';
import LoadingLayer from '../components/LoadingLayer';

const RootLayout = () => {

  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.color = '#1D1C1A';
  }, []);

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
