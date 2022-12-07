import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import {
  Check,
  Lock,
  Person,
  Phone,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import useStyles from './styles';
import Grid from '@mui/material/Unstable_Grid2';
import { CustomInput } from 'app/components/CustomInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { useForm } from 'hooks/useForm';
import { sendCodeThunk, validateEmailThunk, registerActions, registerThunk } from './slice';
import { isValidEmail } from 'utils/validation';
import { notify } from 'app/components/MasterDialog/index';

export default function Register() {

  const store = useSelector<RootState, RootState>(state => state)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepassword, setShowRepassword] = useState<boolean>(false);

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };

    if ('email' in fieldValues) {
      tmp.email = '';
      if (fieldValues.email.length == 0) { tmp.email = 'Vui lòng điền email của bạn'; }
      else {
        if (!isValidEmail(fieldValues.email)) { tmp.email = 'Email của bạn không hợp lệ'; }
      }
    }

    if ('password' in fieldValues) {
      tmp.password = '';
      if (fieldValues.password.length == 0) { tmp.password = 'Vui lòng điền mật khẩu của bạn'; }
      else { if (fieldValues.password.length < 8) { tmp.password = 'Mật khẩu phải có ít nhất 8 ký tự'; } }
    }

    if ('repassword' in fieldValues) {
      tmp.repassword = '';
      if (fieldValues.repassword.length == 0) { tmp.repassword = 'Vui lòng nhập lại mật khẩu của bạn'; }
      else { if (fieldValues.repassword !== values.password) { tmp.repassword = 'Mật khẩu nhập lại không đúng'; } }
    }

    if ('birthDay' in fieldValues) {
      tmp.birthDay = '';
      const today = new Date();
      if (fieldValues.birthDay > today) tmp.birthDay = 'Ngày sinh không hợp lệ'
    }

    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every((x) => x == '');
    }
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      {
        email: '',
        password: '',
        repassword: '',
        fullName: '',
        birthDay: null,
        phone: '',
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

  const handleValidateEmail = async () => {
    if (errors.email == '' && values.email != '')
      dispatch(validateEmailThunk({ email: values.email }))
  }

  const handleSendCode = () => {
    dispatch(sendCodeThunk({ email: values.email }))
  }

  const handleClickSignUp = () => {
    if (validate(values)) {
      if (store.register.isEmailValid) {
        if (store.register.OTP?.toString().length == 6) {
          console.log('sign_up');
          dispatch(registerThunk({
            email: values.email,
            password: values.password,
            otp: store.register.OTP,
            fullName: values.fullName,
            phone: values.phone,
            birthDay: values.birthDay,
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
  }

  useEffect(() => {
    if (store.register.isEmailValid === 'unfilled_email') {
      setErrors({ email: 'Email không được để trống' })
    } else {
      if (store.register.isEmailValid === false) {
        setErrors({ email: 'Email này đã được sử dụng' })
      } else {
        setErrors({ email: '' })
      }
    }
  }, [store.register.isEmailValid])

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
        value={values.email}
        error={errors.email}
        margin='dense'
        autoFocus
        onChange={
          (event: any) => {
            handleInputChange(event), dispatch(registerActions.changeEmail())
          }}
        onBlur={handleValidateEmail}
        inputProps={{ maxLength: '64' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'><Person /></InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              {store.register.isEmailValid === true ?
                <Check color='success' /> : null}
            </InputAdornment>
          ),
        }}
      />
      <Grid xs={12} container columnSpacing={2}>
        <Grid xs={7}>
          <CustomInput.TextField
            name='fullName'
            label='Tên'
            value={values.fullName}
            error={errors.fullName}
            margin='dense'
            onChange={handleInputChange}
            inputProps={{ maxLength: '32' }}
          />
        </Grid>
        <Grid xs={5}>
          <CustomInput.DatePicker
            label='Ngày sinh'
            value={values.birthDay}
            error={errors.birthDay}
            margin='dense'
            onClick={() => {
              console.log(errors.birthDay);
            }}
            onChange={(birthDay: any) => {
              if (birthDay === null) return;
              validate({ birthDay: birthDay });
              setValues({
                ...values,
                birthDay: birthDay,
              });
            }}
          />
        </Grid>
      </Grid>
      <Grid xs={12}>
        <CustomInput.TextField
          name='phone'
          label='SĐT'
          value={values.phone}
          error={errors.phone}
          onChange={handleInputChange}
          margin='dense'
          inputProps={{ maxLength: '16' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'><Phone />+84</InputAdornment>
            ),
          }}
        />
      </Grid>
      <CustomInput.TextField
        required
        type={showPassword ? 'text' : 'password'}
        label='Mật khẩu'
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
        {store.register.isEmailValid ?
          <Button
            disableFocusRipple
            variant='text'
            sx={{ fontWeight: 'bold' }}
            onClick={handleSendCode}
          >
            Gửi mã xác nhận
          </Button> : null}
        {store.register.isOTPSent ? <CustomInput.DigitCode /> : null}
      </span>
      <Button
        fullWidth
        variant='contained'
        sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
        disableFocusRipple
        className={classes.loginButton}
        onClick={handleClickSignUp}
      >
        Đăng ký
      </Button>
    </Box >
  )
}
