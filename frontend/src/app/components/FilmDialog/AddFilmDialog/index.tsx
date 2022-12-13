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
import { usegetNationalities } from 'queries/nationality';
export default function FilmDialog(props: any) {
  const classes = useStyles();
  const rateOptions = ['P', 'C13', 'C16', 'C18'];

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
  const { isLoading: loadingNationalities, data: allNationalities } = usegetNationalities();

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
        values.openingDay,
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
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="lg"
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
              <MenuItem value={'active'}>Đang chiếu</MenuItem>
              <MenuItem value={'inactive'}>Ngừng chiếu</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid xs={12} container columnSpacing={3} item={true}>
          <Grid xs={3} item={true}>
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
              inputProps={{ maxLength: '64' }}
            />
          </Grid>
          <Grid xs={3} item={true}>
            <CustomInput.DatePicker
              label="Ngày khởi chiếu"
              name="openingDay"
              margin="dense"
              value={values.openingDay}
              inputProps={{ maxLength: '64' }}
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
            <Grid xs={3} item={true}>
              <InputLabel>Phân loại</InputLabel>
              <Select
                value={values.rated}
                IconComponent={() => null}
                onChange={(event: any) => {
                  setValues({ ...values, rated: event.target.value });
                }}
              >
                <MenuItem value={'P'}>P - Phù hợp với mọi lứa tuổi</MenuItem>
                <MenuItem value={'C13'}>C13 - Cấm trẻ em dưới 13 tuối</MenuItem>
                <MenuItem value={'C16'}>C16 - Cấm trẻ em dưới 16 tuối</MenuItem>
                <MenuItem value={'C18'}>C18 - Cấm người dưới 18 tuối</MenuItem>
              </Select>
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

        <Grid xs={12} container columnSpacing={2} item={true}>
          <Grid xs={6} item={true}>
            <Autocomplete
              multiple
              options={loadingActors ? [] : allActors.rows}
              loading={loadingActors}
              getOptionLabel={(option: any) => option.fullName}
              onChange={(event, value) => setValues({ ...values, Actors: value })}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Diễn viên"
                  placeholder="Thêm"
                  inputProps={{ maxLength: '64' }}
                />
              )}
            />
          </Grid>
            <Grid xs={2} item={true}>
              <Autocomplete
                options={loadingNationalities ? [] : allNationalities.rows}
                loading={loadingNationalities}
                getOptionLabel={(option: any) => option.name}
                onChange={(event, value) =>
                  setValues({
                    ...values,
                    NationalityId: value?.map((id: any) => id),
                  })
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={values.Nationality}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Quốc gia"
                    placeholder=""
                  />
                )}
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
        <Grid item={true} container xs={12} columnSpacing={2}>
          <Grid item={true} xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, p: 1, fontWeight: 'bold', color: 'white' }}
              disableFocusRipple
              className={classes.AddFilmButton}
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
              Thêm phim
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
