import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link as LinkMUI,
  Typography
} from '@mui/material';
import {
  Lock,
  Person,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { CustomInput } from 'app/components/CustomInput';
import useStyles from './styles';
import { useForm } from 'hooks/useForm';
import { loginThunk } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import EmailVerification from './EmailVerification';

export default function LoginDialog(props: any) {

  interface PageAction {
    action: 'login' | 'validateEmail' | 'verifyCode' | 'register'
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [tryLogin, setTryLogin] = useState<boolean>(false);
  const [pageAction, setPageAction] = useState<PageAction>({ action: 'login' });
  const store = useSelector<RootState, RootState>(state => state)

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };

    if ('email' in fieldValues) {
      tmp.email = fieldValues.email.length > 0 ? '' : 'Vui lòng điền email của bạn';
    }

    if ('password' in fieldValues) {
      tmp.password = fieldValues.password.length > 0 ? '' : 'Vui lòng điền mật khẩu của bạn';
    }

    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every((x) => x == '');
    }
  };

  const { values, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      {
        email: '',
        password: '',
      },
      true,
      validate
    )
  const handleLoginFailed = async () => {
    setErrors({
      email: 'Vui lòng kiểm tra email của bạn',
      password: 'Vui lòng kiểm tra mật khẩu của bạn'
    })
  }

  const handleCloseDialog = () => {
    props.onClose()
    resetForm()
    setTimeout(() => {
      handleChangePageAction({ action: 'login' })
    }, 500);
  }

  const dispatch = useDispatch();

  const handleClickSubmit = async () => {
    dispatch(loginThunk(values))
    console.log(store.login.isLoggedin + ' FROM DIALOG');
  }

  const handleChangePageAction = (action: PageAction) => {
    setPageAction(action);
  }

  useEffect(() => {
    if (store.login.isLoggedin) {
      handleCloseDialog()
    }
  }, [store.login.isLoggedin])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const classes = useStyles();

  return (
    <Dialog
      open={props.open && !store.login.isLoggedin}
      onClose={handleCloseDialog}
      className={classes.dialog}>
      <Box
        className={classes.loginBox}
        component='form'
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.code === 'Enter') {
            if (pageAction.action === 'login') {
              handleClickSubmit()
            }
          }
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
          variant='h5'
          fontWeight='bold'
        >
          {pageAction.action === 'login' ? 'Chào mừng đến Introvert Cinema'
            : 'Đăng ký tài khoản'}
        </Typography>
        {pageAction.action == 'login' ?
          <div>
            <CustomInput.TextField
              required
              label='Email'
              name='email'
              value={values.email}
              error={errors.email}
              onChange={handleInputChange}
              autoFocus
              autoComplete='email'
              inputProps={{ maxLength: '64' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'><Person /></InputAdornment>
                ),
              }}
            />
            <div>
              <CustomInput.TextField
                required
                type={showPassword ? 'text' : 'password'}
                label='Mật khẩu'
                name='password'
                value={values.password}
                error={errors.password}
                onChange={handleInputChange}
                inputProps={{ maxLength: '64' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'><Lock /></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Grid container>
              <Grid item xs>
                <FormControlLabel
                  sx={{ fontSize: '0.875em', fontFamily: '' }}
                  disableTypography
                  control={<Checkbox disableRipple sx={{ color: '#FF884B' }} />}
                  label='Duy trì đăng nhập'
                />
              </Grid>
              <Grid item marginY='auto'>
                <LinkMUI>Quên mật khẩu ?</LinkMUI>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant='contained'
              sx={{ my: 1, p: 1, fontWeight: 'bold', color: 'white' }}
              className={classes.loginButton}
              onClick={handleClickSubmit}
            >Đăng nhập</Button>
            <Typography
              sx={{ textAlign: 'center', }}
              variant='body1'
            >
              Bạn chưa có tài khoản ?
            </Typography>
            <Button
              fullWidth
              variant='outlined'
              sx={{ my: 1, fontWeight: 'bold', borderWidth: '2px !important' }}
              className={classes.registerButton}
              onClick={() => handleChangePageAction({ action: 'validateEmail' })}
            >
              Tạo tài khoản mới
            </Button>
          </div>
          : <EmailVerification />}
      </Box>
    </Dialog >
  )
}
