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
import { useState } from 'react';
import useStyles from './styles';

export default function RoomFilter(props: any) {
  const classes = useStyles();
  const [value, setValue] = useState(null);

  const sendRequest = () => {
    props.setMovieQuery(value);
  };
  return (
    <FormControl className={classes.roomFilter} variant="standard" fullWidth>
      <Autocomplete
        options={props.movieData?.isLoading ? [] : props.movieData.data.rows}
        fullWidth
        loading={props.MovieData?.isLoading}
        getOptionLabel={(option: any) => option.title}
        onChange={(event, value) => {
          setValue(value);
          sendRequest();
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={value}
        renderInput={params => (
          <TextField {...params} variant="standard" placeholder="Phòng chiếu" />
        )}
      />
    </FormControl>
  );
}
