import React, { useEffect, useState } from 'react'
import {
  Dialog,
} from '@mui/material';
import useStyles from './styles';
import { loginThunk, loginActions } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { registerActions } from './Register/slice';
import Register from './Register';
import Login from './Login';
import { notify } from 'app/components/MasterDialog';

export default function LoginDialog(props: any) {

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

  useEffect(() => {
    if (store.register.isRegisterSuccessAccount !== undefined) {
      dispatch(loginThunk({
        email: store.register.isRegisterSuccessAccount.email,
        password: store.register.isRegisterSuccessAccount.password
      }))
      notify(
        {
          type: 'success',
          content: 'Đăng ký thành công',
        })
    }
  }, [store.register.isRegisterSuccessAccount])

  const classes = useStyles();

  return (
    <Dialog
      open={props.open && !store.login.isLoggedin}
      onClose={handleCloseDialog}
      className={classes.dialog}>
      {store.login.dialogAction == 'login' ?
        <Login />
        : <Register />
      }
    </Dialog >
  )
}
