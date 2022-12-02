import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
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

  const handleCloseDialog = () => {
    props.onClose();
  };

  console.log(props);

  return (
    <Dialog open={props.open} onClose={handleCloseDialog}>
      {props.data.id ? (
        <Box className={classes.AddFilmBox}>
          <Typography
            sx={{
              textAlign: 'center',
              mb: 2,
            }}
            variant="h5"
            fontWeight="bold"
          >
            Sửa thông tin phim
          </Typography>
          <CustomInput.TextField
            label="Tên phim"
            name="title"
            value={props.data.title}
            autoFocus
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Poster"
            name="image_url"
            value={props.data.image_url}
            inputProps={{ maxLength: '64' }}
          />
          <Grid xs={12} container columnSpacing={2} sx={{alignContent:'center'}}>
            <Grid xs={5}>
              <CustomInput.TextField
                label="Thời lượng"
                name="duration"
                margin="dense"
                value={props.data.duration}
                inputProps={{ maxLength: '32' }}
              />
            </Grid>

            <Divider orientation="vertical" flexItem />
            <Grid xs={5}>
              <CustomInput.DatePicker
                label="Ngày khởi chiếu"
                name="opening_day"
                margin="dense"
                value={props.data.opening_day}
                inputProps={{ maxLength: '32' }}
              />
            </Grid>
          </Grid>

          <CustomInput.TextField
            label="Đạo diễn"
            name="directors"
            value={props.data.directors}
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Diễn viên"
            name="actors"
            value={props.data.actors}
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Mã quốc gia"
            name="nationality_id"
            value={props.data.nationality_id}
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Trailer"
            name="trailer_url"
            value={props.data.trailer_url}
            inputProps={{ maxLength: '64' }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
            disableFocusRipple
            className={classes.AddFilmButton}
          >
            Thay đổi
          </Button>
        </Box>
      ) : (
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
                margin="dense"
                inputProps={{ maxLength: '32' }}
              />
            </Grid>
            <Grid xs={6}>
              <CustomInput.DatePicker
                label="Ngày khởi chiếu"
                name="opening_day"
                margin="dense"
                inputProps={{ maxLength: '32' }}
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
            label="Trailer"
            name="trailer_url"
            inputProps={{ maxLength: '64' }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
            disableFocusRipple
            className={classes.AddFilmButton}
          >
            Thêm phim
          </Button>
        </Box>
      )}
    </Dialog>
  );
}
