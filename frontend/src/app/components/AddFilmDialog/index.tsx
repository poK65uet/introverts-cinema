import React, { useEffect, useState } from 'react';
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
  Typography,
} from '@mui/material';
import { Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { CustomInput } from 'app/components/CustomInput';
import useStyles from './styles';
import { useForm } from 'hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

export default function AddFilmDialog(props: any) {
  const classes = useStyles();

  return (
    <Dialog open={props.open}>
      <Box className={classes.AddFilmBox}>
        <Typography
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
          variant="h5"
          fontWeight="bold"
        >
          Thêm phim mới
        </Typography>
        <div>
          <CustomInput.TextField
            label="Tên phim"
            name="title"
            autoFocus
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Poster"
            name="image_url"
            inputProps={{ maxLength: '64' }}
          />
          <Grid xs={12} container columnSpacing={2}>
            <Grid xs={6}>
              <CustomInput.TextField
                label="Thời lượng"
                name="duration"
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
            <Grid xs={6}>
              <CustomInput.DatePicker
                label="Ngày khởi chiếu"
                name="opening_day"
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
          </Grid>

          <CustomInput.TextField
            label="Đạo diễn"
            name="directors"
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Diễn viên"
            name="actors"
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Mã quốc gia"
            name="nationality_id"
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label=""
            trailer_url
            name="Trailer"
            inputProps={{ maxLength: '64' }}
          />
        </div>
      </Box>
    </Dialog>
  );
}
