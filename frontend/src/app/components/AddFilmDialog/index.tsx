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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';


export default function AddFilmDialog(props: any) {

  // const classes = useStyles();

  console.log('DIALOG');

  return (
    <Dialog open={props.open}>
      <Typography>AddFilm</Typography>
    </Dialog >
  )
}
