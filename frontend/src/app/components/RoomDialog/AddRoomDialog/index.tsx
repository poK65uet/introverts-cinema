import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link as LinkMUI,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { CustomInput } from 'app/components/CustomInput';
import useStyles from './styles';
import { useForm } from 'hooks/useForm';
import {
  addMovie,
  updateMovie,
  useGetAllMovies,
  useGetMovieById,
} from 'queries/movies';
import { usegetActors } from 'queries/actors';
import { useGetNationalities } from 'queries/nationality';
import { useGetDirectors } from 'queries/directors';
import { useGetCategories } from 'queries/categories';
import { useGetAllRooms, useGetRooms } from 'queries/rooms';
import { addRoom, useAddRoom } from 'queries/rooms';
import { notify } from 'app/components/MasterDialog';
export default function AddRoomDialog(props: any) {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };
    if ('startTime' in fieldValues) {
      tmp.startTime = '';
      const today = new Date();
      if (fieldValues.startTime > today) tmp.startTime = '';
    }
    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every(x => x == '');
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    {
      roomId: 0,
      name: '',
      visionType: '',
      colNumber: 0,
      rowNumber: 0,
      colEmpty: 0,
      rowEmpty: 0,
    },
    true,
    validate,
  );

  const handleCloseDialog = () => {
    props.onClose();
  };

  const addRoom = useAddRoom(
    values.name,
    values.visionType,
    values.colNumber,
    values.rowNumber,
    values.colEmpty,
    values.rowEmpty,
  );
  const handleAddFilm = () => {
    addRoom.refetch();
    handleCloseDialog();
  };
  useEffect(() => {
    if (addRoom.isError) {
      setTimeout(() => {
        notify({
          type: 'error',
          content: 'Thêm phòng chiếu thất bại',
          autocloseDelay: 1500,
        });
      }, 100);
    } else {
      if (addRoom.isSuccess) {
        setTimeout(() => {
          notify({
            type: 'success',
            content: 'Thêm phòng chiếu thành công',
            autocloseDelay: 1500,
          });
        }, 100);
        props.refetch();
      }
    }
  }, [addRoom.isLoading]);

  // console.log(values);
  return (
    <Dialog
      open={props.open}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="xs"
      scroll="paper"
    >
      <Box className={classes.AddFilmBox}>
        <Typography
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
          variant="h5"
          fontWeight="bold"
        >
          Thêm phòng mới
        </Typography>
        <DialogContent>
          <Grid xs={12} spacing={3} item={true} container>
            <Grid xs={6} item={true}>
              <CustomInput.TextField
                label="Tên phòng"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                autoFocus
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
            <Grid xs={6} item={true}>
              <InputLabel>Loại phòng</InputLabel>
              <Select
                value={values.visionType}
                fullWidth
                label="Trạng thái"
                onChange={(event: any) => {
                  setValues({ ...values, visionType: event.target.value });
                }}
              >
                <MenuItem value={'2D'}>2D</MenuItem>
                <MenuItem value={'3D'}>3D</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid xs={12} spacing={3} item={true} container>
            <Grid xs={6} item={true}>
              <CustomInput.TextField
                label="Số hàng"
                name="rowNumber"
                type="number"
                onChange={handleInputChange}
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
            <Grid xs={6} item={true}>
              <CustomInput.TextField
                label="Số cột"
                name="colNumber"
                type="number"
                onChange={handleInputChange}
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
          </Grid>

          <Grid xs={12} spacing={3} item={true} container>
            <Grid xs={6} item={true}>
              <CustomInput.TextField
                label="Hàng trống"
                name="rowEmpty"
                type="number"
                onChange={handleInputChange}
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
            <Grid xs={6} item={true}>
              <CustomInput.TextField
                label="Cột trống"
                name="colEmpty"
                type="number"
                onChange={handleInputChange}
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Grid item={true} container xs={12} spacing={2}>
          <Grid item={true} xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
              disableFocusRipple
              className={classes.CancelButton}
              onClick={handleCloseDialog}
            >
              Hủy thao tác
            </Button>
          </Grid>
          <Grid item={true} xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
              disableFocusRipple
              className={classes.AddFilmButton}
              onClick={handleAddFilm}
            >
              Thêm phòng
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
