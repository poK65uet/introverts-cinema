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
  InputLabel,
  Link as LinkMUI,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { CustomInput } from 'app/components/CustomInput';
import useStyles from './styles';
import { useForm } from 'hooks/useForm';
import { useGetMovieById } from 'queries/movies';

export default function FilmDialog(props: any) {
  const classes = useStyles();
  const validate = (fieldValues = values) => {
    const tmp = { ...errors };
    if ('openingDay' in fieldValues) {
      tmp.openingDay = '';
      const today = new Date();
      if (fieldValues.openingDay > today)
        tmp.openingDay = 'Ngày sinh không hợp lệ';
    }
    setErrors({ ...tmp });
    if (fieldValues == values) {
      return Object.values(tmp).every(x => x == '');
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    {
      title: '',
      duration: 0,
      Actors: [],
      status: '',
      openingDay: null,
      NationalityId: 0,
      trailerUrl: '',
    },
    true,
    validate,
  );

  const handleCloseDialog = () => {
    props.onClose();
  };

  console.log(values);
  if (props.data === 0) {
    return (
      <Dialog open={props.open} onClose={handleCloseDialog}>
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
            xs={12}
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
                onChange={(event : any) => {handleInputChange(event)}}
              >
                <MenuItem value={'active'}>active</MenuItem>
                <MenuItem value={'inactive'}>inactive</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <CustomInput.TextField
            label="Poster"
            name="imageUrl"
            onChange={handleInputChange}
            value={values.imageUrl}
            inputProps={{ maxLength: '64' }}
          />
          <Grid xs={12} container columnSpacing={2} item={true}>
            <Grid xs={6} item={true}>
              <CustomInput.TextField
                label="Thời lượng"
                name="duration"
                margin="dense"
                onChange={handleInputChange}
                value={values.duration}
                inputProps={{ maxLength: '32' }}
              />
            </Grid>
            <Grid xs={6} item={true}>
              <CustomInput.DatePicker
                label="Ngày khởi chiếu"
                name="openingDay"
                margin="dense"
                inputProps={{ maxLength: '32' }}
                onChange={(openingDay: any) => {
                  console.log(openingDay);
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

          <CustomInput.TextField
            label="Diễn viên"
            name="Actors"
            onChange={handleInputChange}
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Mã quốc gia"
            name="NationalityId"
            onChange={handleInputChange}
            inputProps={{ maxLength: '64' }}
          />
          <CustomInput.TextField
            label="Trailer"
            name="trailerUrl"
            onChange={handleInputChange}
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
      </Dialog>
    );
  }
  const [actors, setActors] = useState([]);

  const { data } = useGetMovieById(props.data.toString());
  console.log(data);
  let curActors = 0;
  // if(data !== undefined) curActors = data.Actors.length;
  // for(let i = 0; i < curActors; ++i) {
  // setActors([...actors,data.Actors[i]]);
  // }

  return (
    <Dialog open={props.open} onClose={handleCloseDialog}>
      (
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
        <Grid
          xs={12}
          container
          columnSpacing={2}
          sx={{ alignContent: 'center' }}
          item={true}
        >
          <Grid xs={8} item={true}>
            <CustomInput.TextField
              label="Tên phim"
              name="title"
              value={data.title}
              autoFocus
              inputProps={{ maxLength: '64' }}
            />
          </Grid>
          <Grid xs={1} item={true} />
          <Grid xs={3} item={true}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={values.status}
              onChange={event =>
                setValues({ ...values, status: event.target.value })
              }
              autoWidth
              label="Trạng thái"
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
              value={data.duration}
              inputProps={{ maxLength: '32' }}
            />
          </Grid>
          <Grid xs={6} item={true}>
            <CustomInput.DatePicker
              label="Ngày khởi chiếu"
              name="openingDay"
              margin="dense"
              value={data.openingDay}
              onChange={(openingDay: any) => {
                if (openingDay === null) return;
                validate({ openingDay: openingDay });
                setValues({
                  ...values,
                  openingDay: openingDay,
                });
              }}
              inputProps={{ maxLength: '32' }}
            />
          </Grid>
        </Grid>
        <CustomInput.TextField
          label="Diễn viên"
          name="actors"
          // value={data.Actors}
          inputProps={{ maxLength: '64' }}
        />
        <CustomInput.TextField
          label="Mã quốc gia"
          name="NationalityId"
          value={data.NationalityId}
          inputProps={{ maxLength: '64' }}
        />
        <CustomInput.TextField
          label="Poster"
          name="imageUrl"
          value={data.imageUrl}
          inputProps={{ maxLength: '64' }}
        />
        <CustomInput.TextField
          label="Trailer"
          name="trailerUrl"
          value={data.trailerUrl}
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
      )
    </Dialog>
  );
}
