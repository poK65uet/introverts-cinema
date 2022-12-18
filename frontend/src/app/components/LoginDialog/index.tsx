import React, { useEffect } from 'react'
import {
  Dialog,
} from '@mui/material';
import useStyles from './styles';
import { loginThunk, loginActions, DialogActions } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { registerActions } from './Register/slice';
import Login from './Login'
import Register from './Register';
import ForgotPassword from './ForgotPassword';


export default function LoginDialog(props: any) {

  const store = useSelector<RootState, RootState>(state => state)

  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    props.onClose()
    dispatch(loginActions.denyRequire())
    setTimeout(() => {
      dispatch(registerActions.reset())
      dispatch(loginActions.changeAction(DialogActions.LOGIN))
    }, 500);
  }

  useEffect(() => {
    if (store.login.isLoggedin || store.forgotPassword.isResetPasswordSuccess) {
      handleCloseDialog()
    }
  }, [store.login.isLoggedin, store.forgotPassword.isResetPasswordSuccess])

  useEffect(() => {
    if (store.register.registerSuccessAccount !== undefined) {
      dispatch(loginThunk({
        email: store.register.registerSuccessAccount.email,
        password: store.register.registerSuccessAccount.password
      }))
    }
  }, [store.register.registerSuccessAccount])

  const classes = useStyles();

  return (
    <Dialog
      open={(props.open || store.login.isRequireLogin || store.login.isRequireRegister) && !store.login.isLoggedin}
      onClose={handleCloseDialog}
      className={classes.dialog}>
      {store.login.dialogAction == DialogActions.LOGIN ?
        <Login />
        : store.login.dialogAction == DialogActions.REGISTER ?
          <Register />
          : store.login.dialogAction == DialogActions.FORGOT_PASSWORD ?
            <ForgotPassword />
            : null
      }
    </Dialog >
  )
}
