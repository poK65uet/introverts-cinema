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

  const { isLoading: loadingRooms, data: allRooms } = useGetAllRooms();
  const { isLoading: loadingMovies, data: allMovies } = useGetAllMovies();

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    {
      roomId: 0,
      name: '',
      visionType: 0,
      collumnNumber: 0,
      rowNumber: 0,
    },
    true,
    validate,
  );

  const handleCloseDialog = () => {
    props.onClose();
  };

  const addRoom =
    useAddRoom();
    // values.name,
    // values.visionType,
    // values.collumnNumber,
    // values.rowNumber,
  const handleAddFilm = () => {
    addRoom.refetch();
    handleCloseDialog();
  };
  console.log(addRoom);

  useEffect(() => {
    if (addRoom.data === null) {
      setTimeout(() => {
        notify({
          type: 'error',
          content: 'Thêm suất chiếu thất bại',
          autocloseDelay: 1500,
        });
      }, 100);
    } else {
      if (addRoom.isSuccess) {
        setTimeout(() => {
          notify({
            type: 'success',
            content: 'Thêm suất chiếu thành công',
            autocloseDelay: 1500,
          });
        }, 100);
        // window.location.reload();
      }
    }
  }, [addRoom.isLoading]);

  // console.log(values);
  return (
    <Dialog
      open={props.open}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="md"
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
            <Grid xs={4} item={true}>
              <CustomInput.TextField
                label="Tên phòng"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                autoFocus
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
            <Grid xs={3} item={true}>
              <CustomInput.TextField
                label="Hàng ghế"
                name=""
                onChange={handleInputChange}
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
            <Grid xs={3} item={true}>
              <CustomInput.TextField
                label="Cột ghế"
                name=""
                onChange={handleInputChange}
                inputProps={{ maxLength: '64' }}
              />
            </Grid>
            <Grid xs={2} item={true}>
              <InputLabel>Định dạng video</InputLabel>
              <Select
                value={values.status}
                fullWidth
                label="Trạng thái"
                onChange={(event: any) => {
                  setValues({ ...values, status: event.target.value });
                }}
              >
                <MenuItem value={2}>2D</MenuItem>
                <MenuItem value={3}>3D</MenuItem>
              </Select>
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
