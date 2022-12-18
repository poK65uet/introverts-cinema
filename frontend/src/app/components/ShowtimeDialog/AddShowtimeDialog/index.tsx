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
import { addShowtime, useAddShowtime } from 'queries/showtimes';
import { notify } from 'app/components/MasterDialog';
export default function AddShowtimeDialog(props: any) {
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
      filmId: 0,
      film: null,
      roomId: 0,
      room: null,
      startTime: null,
    },
    true,
    validate,
  );

  const handleCloseDialog = () => {
    props.onClose();
  };

  const addShowtime = useAddShowtime(
    values.filmId,
    values.roomId,
    values.startTime,
  );
  const handleAddFilm = () => {
    addShowtime.refetch();
    handleCloseDialog();
  };

  useEffect(() => {
    if (addShowtime.data === null) {
      setTimeout(() => {
        notify({
          type: 'error',
          content: 'Thêm suất chiếu thất bại',
          autocloseDelay: 1500,
        });
      }, 100);
      addShowtime.remove();
    } else {
      if (addShowtime.isSuccess) {
        setTimeout(() => {
          notify({
            type: 'success',
            content: 'Thêm suất chiếu thành công',
            autocloseDelay: 1500,
          });
        }, 100);
        addShowtime.remove();
      }
    }
  }, [addShowtime.isLoading]);

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
          Thêm suất chiếu mới
        </Typography>
        <DialogContent>
          <Grid xs={12} spacing={3} item={true} container>
            <Grid xs={3} item={true}>
              <CustomInput.DateTimePicker
                label="Giờ chiếu"
                name="startTime"
                margin="dense"
                type="datetime-local"
                value={values.startTime}
                inputProps={{ maxLength: '32' }}
                onChange={(startTime: any) => {
                  if (startTime === null) return;
                  validate({ startTime: startTime });
                  setValues({
                    ...values,
                    startTime: startTime,
                  });
                }}
              />
            </Grid>
            <Grid xs={6} item={true}>
              <Autocomplete
                options={loadingMovies ? [] : allMovies}
                loading={loadingMovies}
                getOptionLabel={(option: any) => option.title}
                onChange={(event, value) =>
                  setValues({
                    ...values,
                    filmId: value?.id,
                    film: value,
                  })
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={values?.film}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Phim chiếu"
                    placeholder=""
                    margin="dense"
                  />
                )}
              />
            </Grid>
            <Grid xs={3} item={true}>
              <Autocomplete
                options={loadingRooms ? [] : allRooms.rows}
                loading={loadingRooms}
                getOptionLabel={(option: any) => option.name}
                onChange={(event, value) =>
                  setValues({
                    ...values,
                    roomId: value?.id,
                    room: value,
                  })
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={values?.room}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Phòng chiếu"
                    placeholder=""
                    margin="dense"
                  />
                )}
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
              Thêm suất chiếu
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
