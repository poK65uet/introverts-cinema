import { Search } from '@mui/icons-material';
import {
  Autocomplete,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  Paper,
  TextField,
} from '@mui/material';
import { gridDensityValueSelector } from '@mui/x-data-grid';
import MovieDetailPage from 'app/pages/MovieDetailPage';
import { useState } from 'react';
import useStyles from './styles';

export default function FilmFilter(props: any) {
  const classes = useStyles();
  const [value, setValue] = useState(null);

  const sendRequest = (data: any) => {
    props.setMovieQuery(data !== null ? data['id'] : 0);
  };
  return (
    <FormControl className={classes.filmFilter} variant="standard" fullWidth>
      <Autocomplete
        options={props.movieData?.isLoading ? [] : props.movieData.data}
        fullWidth
        loading={props.MovieData?.isLoading}
        getOptionLabel={(option: any) => (option.title ? option.title : null)}
        onChange={(event, value) => {
          setValue(value);
          sendRequest(value);
        }}
        clearText=""
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value}
        renderInput={params => (
          <TextField {...params} variant="standard" placeholder="Phim" />
        )}
      />
    </FormControl>
  );
}
