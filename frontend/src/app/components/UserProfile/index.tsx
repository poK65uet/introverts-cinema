import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useStyles from './styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { notify } from '../MasterDialog/index';
import { isValidPhoneString } from 'utils/validation';
import { useForm } from 'hooks/useForm';
import { CustomInput } from '../CustomInput';

interface UserProfileProps {
  user: any
}


export default function UserProfile(props: UserProfileProps) {

  const [userData, setUserData] = useState(props.user)
  const [isProfileChange, setIsProfileChange] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

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
      }
    }
  }

  const handleShowChangePassword = () => {
    setShowChangePassword(!showChangePassword)
    if (!showChangePassword) {
      resetForm()
    }
  }

  useMemo(() => {
    setIsProfileChange(
      !(userData?.fullName == props.user?.fullName
        && (new Date(userData?.birthDay ? userData.birthDay : 0).toISOString()
          == new Date(props.user?.birthDay ? props.user.birthDay : 0).toISOString()
          && new Date(userData?.birthDay).toString() != 'Invalid Date')
        && userData?.phone == props.user?.phone)
    )
  }, [userData])

  useMemo(() => {
    if (!userData && props.user) {
      setUserData(props.user)
    }
  }, [props.user])

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };

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
                label="Ngày sinh"
                inputFormat="dd/MM/yyyy"
                value={userData.birthDay}
                onChange={(newValue) => {
                  console.log(newValue);
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
                    onChange={handleInputChange} />
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
                  <Button variant='contained' disableRipple
                    className={classes.saveButton}>
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
