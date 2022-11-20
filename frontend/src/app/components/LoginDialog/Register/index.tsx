import React, { useState } from 'react'
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
  VisibilityOff
} from '@mui/icons-material';
import useStyles from './styles';
import { CustomInput } from 'app/components/CustomInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { useForm } from 'hooks/useForm';
import { sendCodeThunk } from '../EmailValidate/slice';
export default function Register() {

  const store = useSelector<RootState, RootState>(state => state)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepassword, setShowRepassword] = useState<boolean>(false);

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };

    if ("password" in fieldValues) {
      tmp.password = "";
      if (fieldValues.password.length == 0) { tmp.password = "Vui lòng điền mật khẩu của bản"; }
      else { if (fieldValues.password.length < 8) { tmp.password = "Mật khẩu phải có ít nhất 8 ký tự"; } }
    }
    if ("repassword" in fieldValues) {
      tmp.repassword = "";
      if (fieldValues.repassword.length == 0) { tmp.repassword = "Vui lòng nhập lại mật khẩu của bạn"; }
      else { if (fieldValues.repassword !== values.password) { tmp.repassword = "Mật khẩu nhập lại không giống"; } }
    }
    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every((x) => x == "");
    }
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      {
        password: "",
        repassword: "",
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
    dispatch(sendCodeThunk({ email: store.register.validatedEmail }))
  }

  const handleClickSignUp = () => {
    if (validate(values)) {

    }
  }

  const classes = useStyles()
  return (
    <Box
      className={classes.registerBox}
      component='form'
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.code === 'Enter') {
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
        Đăng ký tài khoản Introverts Cinema
      </Typography>
      <CustomInput.TextField
        required
        label='Email'
        name='email'
        type='email'
        value={store.register.validatedEmail}
        disabled
        inputProps={{ maxLength: '64' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'><Person /></InputAdornment>
          ),
        }}
      />
      <CustomInput.TextField
        required
        type={showPassword ? 'text' : 'password'}
        label='Mật khẩu'
        name='password'
        value={values.password}
        error={errors.password}
        autoFocus
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
      <CustomInput.TextField
        required
        type={showRepassword ? 'text' : 'password'}
        label='Nhập lại mật khẩu'
        name='repassword'
        value={values.repassword}
        error={errors.repassword}
        onChange={handleInputChange}
        inputProps={{ maxLength: '64' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
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
          disableRipple
          variant='text'
          size='small'
          onClick={handleSendCode}
        >
          Gửi mã xác nhận
        </Button>
        {store.register.isOTPSent ? <CustomInput.DigitCode /> : null}
      </span>
      <Button
        fullWidth
        variant="contained"
        sx={{ my: 1, p: 1, fontWeight: 'bold', color: 'white' }}
        disableRipple
        className={classes.loginButton}
        onClick={handleClickSignUp}
      >
        Đăng ký
      </Button>
    </Box >
  )
}
