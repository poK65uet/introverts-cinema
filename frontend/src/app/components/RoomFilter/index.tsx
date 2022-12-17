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
  const [curValue, setCurValue] = useState(null);

  const sendRequest = (data: any) => {
    props.setRoomQuery(data !== null ? data['id'] : 0);
  };
  return (
    <FormControl className={classes.roomFilter} variant="standard" fullWidth>
      <Autocomplete
        options={props.roomData?.isLoading ? [] : props.roomData.data.rows}
        fullWidth
        loading={props.roomData?.isLoading}
        getOptionLabel={(option: any) => (option.name ? option.name : null)}
        onChange={(event, value) => {
          setCurValue(value);
          sendRequest(value);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={curValue}
        renderInput={params => (
          <TextField {...params} variant="standard" placeholder="Phòng chiếu" />
        )}
      />
    </FormControl>
  );
}
