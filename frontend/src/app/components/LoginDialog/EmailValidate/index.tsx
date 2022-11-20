import React, { useEffect, useState } from 'react';
import { CustomInput } from 'app/components/CustomInput';
import { Person } from '@mui/icons-material';
import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmailThunk } from './slice';
import { RootState } from 'store';
import { useForm } from 'hooks/useForm';
import useStyles from './styles';

export default function EmailVerification() {

  const store = useSelector<RootState, RootState>(state => state)

  const { values, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      {
        email: '',
      },
      true,
      () => { }
    )

  useEffect(() => {
    if (store.register.isEmailValid === false) {
      setErrors({ email: 'Email đã được sử dụng' })
    } else {
      if (store.register.isEmailValid === 'unfilled_email') {
        setErrors({ email: 'Email không được để trống' })
      } else {
        setErrors({ email: '' })
      }
    }
  }, [store.register.isEmailValid])

  const dispatch = useDispatch()

  const handleValidateEmail = async () => {
    dispatch(validateEmailThunk({ email: values.email }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrors({ email: '' });
    handleInputChange(event)
  }

  const classes = useStyles();

  return (
    <Box
      className={classes.validateBox}
      component='form'
      onKeyDown={async (event: React.KeyboardEvent) => {
        if (event.code === 'Enter') {
          await handleValidateEmail()
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
        onChange={handleChange}
        autoFocus
        autoComplete='email'
        inputProps={{ maxLength: '64' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'><Person /></InputAdornment>
          ),
        }}
      />
      <div hidden>
        <CustomInput.TextField />
      </div>
      <Button
        sx={{ width: 'fit-content', mx: 'auto' }}
        disableRipple
        variant='text'
        onClick={handleValidateEmail}
      >
        Kiểm tra email
      </Button>
    </Box>
  );
}
