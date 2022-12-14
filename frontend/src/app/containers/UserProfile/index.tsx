import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useStyles from './styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { notify } from '../../components/MasterDialog/index';
import { isValidPhoneString } from 'utils/validation';
import { useForm } from 'hooks/useForm';
import { CustomInput } from 'app/components/CustomInput';
import { useChangePassword, useChangeProfile, useVerifyPassword } from 'queries/user';
import { Check } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loadingActions } from 'app/components/LoadingLayer/slice';
import { getUserProfileThunk } from 'app/components/LoginDialog/slice';
import { RootState } from 'store';


export default function UserProfile() {

  const store = useSelector<RootState, RootState>(state => state)

  const [userData, setUserData] = useState(store.login.user)
  const [isProfileChange, setIsProfileChange] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  const onUpdateProfileError = () => notify({
    type: 'error',
    content: 'Cập nhật thông tin gặp lỗi',
    autocloseDelay: 1250
  })

  const {
    refetch: updateProfile,
    isLoading: isUpdateProfileLoading,
    isSuccess: isUpdateProfileSuccess,
    isFetching: isUpdateProfile,
  } = useChangeProfile({
    fullName: userData?.fullName != store.login.user?.fullName ? userData?.fullName : undefined,
    phone: userData?.phone != store.login.user?.phone ? userData?.phone : undefined,
    birthDay: userData?.birthDay != store.login.user?.birthDay ? userData?.birthDay : undefined
  }, { onError: onUpdateProfileError })

  const handleChangeProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.id]: event.target.value });
  };

  const handleSaveProfile = () => {
    if (!isValidPhoneString(userData?.phone ? userData.phone : '') && userData?.phone) {
      notify({
        type: 'error',
        content: 'Số điện thoại không hợp lệ',
        autocloseDelay: 1250
      })
    } else {
      if (new Date(userData?.birthDay) >= new Date) {
        notify({
          type: 'error',
          content: 'Ngày sinh không hợp lệ',
          autocloseDelay: 1250
        })
      } else {
        updateProfile()
      }
    }
  }

  const handleShowChangePassword = () => {
    setShowChangePassword(!showChangePassword)
    if (!showChangePassword) {
      resetForm()
    }
  }

  useEffect(() => {
    setIsProfileChange(
      !(userData?.fullName == store.login.user?.fullName
        && (new Date(userData?.birthDay ? userData.birthDay : 0).toISOString()
          == new Date(store.login.user?.birthDay ? store.login.user.birthDay : 0).toISOString()
          && new Date(userData?.birthDay).toString() != 'Invalid Date')
        && userData?.phone == store.login.user?.phone)
    )
  }, [userData, store.login.user])

  useEffect(() => {
    if (!userData && store.login.user) {
      setUserData(store.login.user)
    }
  }, [store.login.user])

  useEffect(() => {
    if (isUpdateProfileSuccess && !isUpdateProfile) {
      notify({
        type: 'success',
        content: 'Cập nhật thông tin thành công',
        autocloseDelay: 1250
      })
      dispatch(getUserProfileThunk())
    }
  }, [isUpdateProfile])

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };

    if ('password' in fieldValues) {
      tmp.password = '';
      if (fieldValues.password.length == 0) { tmp.password = 'Vui lòng điền mật khẩu của bạn'; }
    }

    if ('newPassword' in fieldValues) {
      tmp.newPassword = '';
      if (fieldValues.newPassword.length == 0) { tmp.newPassword = 'Vui lòng điền mật khẩu mới của bạn'; }
      else { if (fieldValues.newPassword.length < 8) { tmp.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự'; } }
    }

    if ('reNewPassword' in fieldValues) {
      tmp.reNewPassword = '';
      if (fieldValues.reNewPassword.length == 0) { tmp.reNewPassword = 'Vui lòng nhập lại mật khẩu của bạn'; }
      else { if (fieldValues.reNewPassword !== values.newPassword) { tmp.reNewPassword = 'Mật khẩu nhập lại không khớp'; } }
    }

    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every((x) => x == '');
    }

  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      {
        password: '',
        newPassword: '',
        reNewPassword: ''
      },
      true,
      validate
    );

  const onVerifyPasswordError = () => notify({
    type: 'error',
    content: 'Xác thực mật khẩu gặp lỗi',
    autocloseDelay: 1250
  })

  const onChangePasswordError = () => notify({
    type: 'error',
    content: 'Đổi mật khẩu gặp lỗi',
    autocloseDelay: 1250
  })

  const {
    data: isPasswordVerfied,
    refetch: verifyPassword,
    isLoading: isVerifyLoading,
    remove: resetVerifyPassword
  } = useVerifyPassword(
    values.password,
    { onError: onVerifyPasswordError }
  )

  const {
    data: userChangePassword,
    refetch: changePassword,
    isLoading: isChangingPassword,
    isSuccess: isPasswordChanged,
    remove: resetChangePassword
  } = useChangePassword(
    values.newPassword,
    { onError: onChangePasswordError }
  )

  const handleVerifyPassword = async () => {
    verifyPassword()
  }

  const handleChangePassword = () => {
    if (validate(values)) {
      changePassword()
    }
  }
  useEffect(() => {
    if (isPasswordChanged) {
      if (userChangePassword?.id != undefined) {
        notify({
          type: 'success',
          content: 'Đổi mật khẩu thành công',
          autocloseDelay: 1250
        })
        handleShowChangePassword()
        resetVerifyPassword()
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        notify({
          type: 'error',
          content: 'Mật khẩu mới giống mật khẩu cũ',
          autocloseDelay: 1250
        })
      }
      resetChangePassword()
    }
  }, [userChangePassword, isChangingPassword])

  useEffect(() => {
    if (isPasswordVerfied != true && values.password != '') {
      setErrors({ password: 'Mật khẩu không đúng' })
    }
  }, [isPasswordVerfied])

  const dispatch = useDispatch()

  useEffect(() => {
    if (isUpdateProfileLoading || isVerifyLoading || isChangingPassword) {
      dispatch(loadingActions.load())

    } else {
      dispatch(loadingActions.finish())
    }
  }, [isUpdateProfileLoading, isVerifyLoading, isChangingPassword])

  const classes = useStyles()

  return (
    <React.Fragment>
      {userData ?
        <Grid xs={8} container columnSpacing={6} rowSpacing={8}>
          <Grid xs={9}>
            <TextField id='email' label='Email' className={classes.profileField}
              value={userData.email} disabled />
          </Grid>
          <Grid xs={3}>
            <TextField id='phone' label='Số điện thoại' className={classes.profileField}
              value={userData.phone || ''} onChange={handleChangeProfile} />
          </Grid>
          <Grid xs={8.5}>
            <TextField id='fullName' label='Họ và Tên' className={classes.profileField}
              value={userData.fullName || ''} onChange={handleChangeProfile} />
          </Grid>
          <Grid xs={3.5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className={classes.profileField}
                label='Ngày sinh'
                inputFormat='dd/MM/yyyy'
                value={userData.birthDay}
                onChange={(newValue) => {
                  if (newValue != 'Invalid Date')

                    setUserData({ ...userData, birthDay: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid xs={12} container className={classes.actions} py={1}>
            <Grid xs={6}>
              <Button disableRipple onClick={handleShowChangePassword}
                sx={{ fontWeight: 'bold', fontSize: '0.75em' }}>
                {!showChangePassword ? 'Đổi mật khẩu' : 'Hủy đổi mật khẩu'}
              </Button>
            </Grid>
            <Grid xs={6} textAlign='end'>
              <Button variant='contained' disableRipple disabled={!isProfileChange}
                className={classes.saveButton} onClick={handleSaveProfile}>
                Lưu
              </Button>
            </Grid>
          </Grid>
          {showChangePassword ?
            <Box component='form'>
              <Grid xs={12} container rowSpacing={1}>
                <Grid xs={5} >
                  <CustomInput.TextField
                    label='Mật khẩu' name='password' variant='outlined'
                    type='password' value={values.password} error={errors.password}
                    onChange={(event: any) => { handleInputChange(event), resetVerifyPassword() }}
                    onBlur={handleVerifyPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          {isPasswordVerfied == true ?
                            <Check color='success' /> : null}
                        </InputAdornment>
                      ),
                    }} />
                </Grid>
                <Grid xs={7} />
                <Grid xs={5}>
                  <CustomInput.TextField
                    label='Mật khẩu mới' name='newPassword' variant='outlined'
                    type='password' value={values.newPassword} error={errors.newPassword}
                    onChange={handleInputChange} />
                </Grid>
                <Grid xs={7} />
                <Grid xs={5} >
                  <CustomInput.TextField
                    label='Nhập lại mật khẩu mới' name='reNewPassword' variant='outlined'
                    type='password' value={values.reNewPassword} error={errors.reNewPassword}
                    onChange={handleInputChange} />
                </Grid>
                <Grid xs={7} alignSelf='end' textAlign='end'>
                  <Button variant='contained' disableRipple className={classes.saveButton}
                    disabled={isPasswordVerfied != true} onClick={handleChangePassword}>
                    Lưu mật khẩu
                  </Button>
                </Grid>
              </Grid>
            </Box> : null}
        </Grid>
        : <div style={{ height: '100vh' }} />}
    </React.Fragment>
  )
}
