import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import {
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import useStyles from './styles';
import Grid from '@mui/material/Unstable_Grid2';
import { CustomInput } from 'app/components/CustomInput';
import { useSelector, useDispatch } from 'react-redux';
import { sendForgotPasswordCodeThunk, forgotPasswordActions, resetPasswordThunk } from './slice';
import { RootState } from 'store';
import { useForm } from 'hooks/useForm';
import { notify } from 'app/components/MasterDialog/index';

export default function ForgotPassword() {

  const store = useSelector<RootState, RootState>(state => state)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepassword, setShowRepassword] = useState<boolean>(false);

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };

    if ('email' in fieldValues) {
      tmp.email = '';
      if (fieldValues.email.length == 0) { tmp.email = 'Vui lòng điền email của bạn'; }
    }

    if ('password' in fieldValues) {
      tmp.password = '';
      if (fieldValues.password.length == 0) { tmp.password = 'Vui lòng điền mật khẩu của bạn'; }
      else { if (fieldValues.password.length < 8) { tmp.password = 'Mật khẩu phải có ít nhất 8 ký tự'; } }
    }

    if ('repassword' in fieldValues) {
      tmp.repassword = '';
      if (fieldValues.repassword.length == 0) { tmp.repassword = 'Vui lòng nhập lại mật khẩu của bạn'; }
      else { if (fieldValues.repassword !== values.password) { tmp.repassword = 'Mật khẩu nhập lại không khớp'; } }
    }

    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every((x) => x == '');
    }
  }

  const { values, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      {
        email: '',
        password: '',
        repassword: '',
      },
      true,
      validate
    );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleClickShowRepassword = () => {
    setShowRepassword(!showRepassword);
  }

  const dispatch = useDispatch();

  const handleSendCode = () => {
    if (validate(values))
      dispatch(sendForgotPasswordCodeThunk({ email: values.email }))
  }

  const handleClickResetPassword = () => {
    if (validate(values)) {
      if (store.forgotPassword.OTP?.toString().length == 6) {
        dispatch(resetPasswordThunk({
          email: values.email,
          password: values.password,
          otp: store.forgotPassword.OTP
        }))
      } else {
        if (!store.register.isOTPSent) {
          notify({
            type: 'error',
            content: 'Chưa kích hoạt gửi OTP',
          });
        } else {
          if (store.register.OTP?.toString().length == 0) {
            notify({
              type: 'error',
              content: 'Chưa nhập mã OTP',
            });
          } else {
            notify({
              type: 'error',
              content: 'Mã OTP không hợp lệ',
            });
          }
        }
      }
    }
  }

  useEffect(() => {
    return () => {
      dispatch(forgotPasswordActions.reset())
    }
  }, [])

  const classes = useStyles()

  return (
    <Box
      className={classes.forgotPasswordBox}
      component='form'>
      <Typography
        sx={{
          textAlign: 'center',
          mb: 2,
        }}
        variant='h5'
        fontWeight='bold'>
        Quên mật khẩu Introverts Cinema
      </Typography>
      <CustomInput.TextField
        required
        label='Email'
        name='email'
        type='email'
        value={values.email}
        error={errors.email}
        margin='dense'
        autoFocus
        onChange={
          (event: any) => {
            handleInputChange(event)
          }}
        inputProps={{ maxLength: '64' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'><Person /></InputAdornment>
          )
        }} />
      <CustomInput.TextField
        required
        type={showPassword ? 'text' : 'password'}
        label='Mật khẩu mới'
        name='password'
        value={values.password}
        error={errors.password}
        margin='dense'
        onChange={handleInputChange}
        inputProps={{ maxLength: '64' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'><Lock /></InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                tabIndex={-1}
                onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }} />
      <CustomInput.TextField
        required
        type={showRepassword ? 'text' : 'password'}
        label='Nhập lại mật khẩu'
        name='repassword'
        value={values.repassword}
        error={errors.repassword}
        margin='dense'
        onChange={handleInputChange}
        inputProps={{ maxLength: '64' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'><Lock /></InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                tabIndex={-1}
                onClick={handleClickShowRepassword}
              >
                {showRepassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <span style={{}}>
        <Button
          disableFocusRipple
          variant='text'
          sx={{ fontWeight: 'bold' }}
          onClick={handleSendCode}>
          Gửi mã xác nhận
        </Button>
        {store.forgotPassword.isOTPSent ? <CustomInput.DigitCode action='forgot-password' /> : null}
      </span>
      <Button
        fullWidth
        variant='contained'
        sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
        disableFocusRipple
        className={classes.verifyButton}
        onClick={handleClickResetPassword}      >
        Đăng ký
      </Button>
    </Box >
  )
}
