import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from 'react-router-dom';
import LoadingLayer from 'app/components/LoadingLayer';
import MasterDialog from 'app/components/MasterDialog';
import HomeLayout from './homeLayout';
import AdminLayout from './adminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { loginActions } from 'app/components/LoginDialog/slice';
import { useGetUserProfile } from 'queries/users';

enum Role {
  ADMIN = 1,
  CUSTOMER = 2,
}

const RootLayout = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.color = '#1D1C1A';
  }, []);

  const store = useSelector<RootState, RootState>(state => state);

  const { data: user, refetch: getUser } = useGetUserProfile({
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem('token') && !store.login.user) {
      getUser();
    }
  }, [sessionStorage.getItem('token')]);

  useEffect(() => {
    if (user) {
      dispatch(loginActions.setUser(user));
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Switch>
        {store.login.isAdmin ? (
          <Redirect from="/admin" exact to="/admin/customers" />
        ) : null}
        <Route
          path="/admin"
          component={store.login.isAdmin ? AdminLayout : HomeLayout}
        />
        <Route path="/" component={HomeLayout} />
      </Switch>
      <MasterDialog />
      <LoadingLayer />
    </BrowserRouter>
  );
};

export default RootLayout;
