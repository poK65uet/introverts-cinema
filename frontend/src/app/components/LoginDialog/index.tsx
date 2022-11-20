import React, { useEffect, useState } from 'react'
import {
  Dialog,
} from '@mui/material';
import useStyles from './styles';
import { loginThunk, loginActions } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import EmailValidate from './EmailValidate';
import { registerActions } from './EmailValidate/slice';
import Register from './Register';
import Login from './Login';

export default function LoginDialog(props: any) {

  interface PageAction {
    action: 'login' | 'validateEmail' | 'register'
  }

  const store = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    props.onClose()
    setTimeout(() => {
      dispatch(registerActions.reset())
      dispatch(loginActions.changeAction('login'))
    }, 500);
  }

  useEffect(() => {
    if (store.register.isEmailValid === true) {
      dispatch(loginActions.changeAction('register'))
    }
  }, [store.register.isEmailValid])

  useEffect(() => {
    if (store.login.isLoggedin) {
      handleCloseDialog()
    }
  }, [store.login.isLoggedin])

  const classes = useStyles();

  return (
    <Dialog
      open={props.open && !store.login.isLoggedin}
      onClose={handleCloseDialog}
      className={classes.dialog}>
      {store.login.dialogAction == 'login' ?
        <Login />
        : store.register.isEmailValid !== true ?
          <EmailValidate />
          : <Register />
      }
    </Dialog >
  )
}
