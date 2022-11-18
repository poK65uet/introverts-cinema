import React, { useState } from 'react';
import { CustomInput } from 'app/components/CustomInput';
import { Person } from '@mui/icons-material';
import { Button, InputAdornment } from '@mui/material';;

export default function EmailVerification() {

  const [email, setEmail] = useState<string>('')

  const handleTypingEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  return (
    <div>
      <CustomInput.TextField
        required
        label='Email'
        name='email'
        autoFocus
        autoComplete='email'
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTypingEmail(event)}
        inputProps={{ maxLength: '64' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'><Person /></InputAdornment>
          ),
        }}
      />
      <Button
        disableRipple
        variant='text'
      >
        Gửi mã xác nhận
      </Button>
      <CustomInput.DigitCode />
    </div>
  );
}
