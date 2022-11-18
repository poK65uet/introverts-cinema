import React, { useEffect } from 'react'
import useDigitInput from 'react-digit-input';
import Grid from '@mui/material/Unstable_Grid2';
import useStyles from './styles';

export default function DigitCode() {
  const [value, onChange] = React.useState('');
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 6,
    value,
    onChange,
  });

  useEffect(() => {
    sessionStorage.setItem('verify_code', value)
  }, [value])

  const classes = useStyles();
  return (
    <Grid
      container
      width='10.5em'
      height='2.25em '
      alignSelf='center'
      m='auto'>
      {[0, 1, 2, 3, 4, 5].map((index: number) => {
        return (
          <Grid xs={2} key={index}>
            <input
              placeholder='_'
              className={classes.digit}
              inputMode="decimal"
              autoFocus={index == 0 ? true : undefined}
              {...digits[index]} />
          </Grid>
        )
      })}
    </Grid>
  )
}
