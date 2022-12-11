import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
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
import { addMovie, updateMovie, useGetMovieById } from 'queries/movies';
import { usegetActors } from 'queries/actor';
//TODO: Add Column spacing, add close button
export default function FilmDialog(props: any) {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    const tmp = { ...errors };
    if ('openingDay' in fieldValues) {
      tmp.openingDay = '';
      const today = new Date();
      if (fieldValues.openingDay > today) tmp.openingDay = '';
    }
    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every(x => x == '');
    }
  };

  const { isLoading: loadingActors, data: allActors } = usegetActors();

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    {
      id: 0,
      title: '',
      imageUrl: '',
      trailerUrl: '',
      duration: 0,
      openingDay: null,
      description: '',
      rated: '',
      status: '',
      NationalityId: 0,
      Actors: [],
      Categories: [],
      Directors: [],
    },
    true,
    validate,
  );

  const handleCloseDialog = () => {
    props.onClose();
  };

  const handleAddFilm = () => {
    if (validate(values)) {
      const data = addMovie(
        values.title,
        values.imageUrl,
        values.trailerUrl,
        values.duration,
        values.openingxDay,
        values.description,
        values.rated,
        values.status,
        values.NationalityId,
        values.Categories,
        values.Actors,
        values.Directors,
      );
    }
    handleCloseDialog();
    window.location.reload();
  };

  return (
    <Dialog open={props.open} onClose={handleCloseDialog} fullWidth maxWidth="md">
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
        <Grid
          xs={24}
          container
          columnSpacing={2}
          sx={{ alignContent: 'center' }}
          item={true}
        >
          <Grid xs={8} item={true}>
            <CustomInput.TextField
              label="Tên phim"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              autoFocus
              inputProps={{ maxLength: '64' }}
            />
          </Grid>
          <Grid xs={1} item={true} />
          <Grid xs={3} item={true}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={values.status}
              autoWidth
              label="Trạng thái"
              onChange={(event: any) => {
                setValues({ ...values, status: event.target.value });
              }}
            >
              <MenuItem value={'active'}>active</MenuItem>
              <MenuItem value={'inactive'}>inactive</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid xs={12} container columnSpacing={2} item={true}>
          <Grid xs={6} item={true}>
            <CustomInput.TextField
              label="Thời lượng"
              name="duration"
              margin="dense"
              type="number"
              onChange={handleInputChange}
              value={values.duration}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Phút</InputAdornment>
                ),
              }}
              inputProps={{ maxLength: '32' }}
            />
          </Grid>
          <Grid xs={6} item={true}>
            <CustomInput.DatePicker
              label="Ngày khởi chiếu"
              name="openingDay"
              margin="dense"
              value={values.openingDay}
              inputProps={{ maxLength: '32' }}
              onChange={(openingDay: any) => {
                if (openingDay === null) return;
                validate({ openingDay: openingDay });
                setValues({
                  ...values,
                  openingDay: openingDay,
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid xs={12} container columnSpacing={2} item={true}>
          <Grid xs={6} item={true}>
            <CustomInput.TextField
              label="Poster"
              name="imageUrl"
              onChange={handleInputChange}
              value={values.imageUrl}
              inputProps={{ maxLength: '64' }}
            />
          </Grid>
          <Grid xs={6} item={true}>
            <CustomInput.TextField
              label="Trailer"
              name="trailerUrl"
              onChange={handleInputChange}
              inputProps={{ maxLength: '64' }}
            />
          </Grid>
        </Grid>

        <Autocomplete
          multiple
          id="tags-standard"
          options={loadingActors ? [] : allActors.rows}
          loading={loadingActors}
          getOptionLabel={(option: any) => option.fullName}
          onChange={(event, value) =>
            setValues({ ...values, Actors: value.map(({ id }) => id) })
          }
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="Diễn viên"
              placeholder="Thêm"
            />
          )}
        />
        <Grid xs={12} container columnSpacing={2} item={true}>
          <Grid xs={6} item={true}>
            <CustomInput.TextField
              label="Mã quốc gia"
              name="NationalityId"
              type="number"
              onChange={handleInputChange}
              inputProps={{ maxLength: '32' }}
            />
          </Grid>
          <Grid xs={6} item={true}>
            <CustomInput.TextField
              label="Phân loại"
              helperText="P: Phổ biến cho mọi đối tượng, C(*x): Cấm đối tượng có độ tuổi dưới x"
              name="rated"
              onChange={handleInputChange}
              inputProps={{ maxLength: '32' }}
            />
          </Grid>
        </Grid>

        <CustomInput.TextField
          label="Mô tả"
          name="description"
          multiline
          onChange={handleInputChange}
          value={values.description}
          inputProps={{ maxLength: '64' }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
          disableFocusRipple
          className={classes.AddFilmButton}
          onClick={handleAddFilm}
        >
          Thêm phim
        </Button>
      </Box>
    </Dialog>
  );
}
