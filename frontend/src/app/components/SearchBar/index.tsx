import { Search } from '@mui/icons-material';
import {
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

export default function SearchBar(props: any) {
  const classes = useStyles();
  const [input, setInput] = useState('');

  const sendRequest = () => {
    props.setQuery(input);
  };
  return (
    <FormControl className={classes.searchBar} variant="standard">
      <Input
        value={input}
        onChange={event => setInput(event.target.value)}
        onKeyDown={async (event: React.KeyboardEvent) => {
          if (event.code === 'Enter') {
            sendRequest();
          }
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Tìm kiếm" onClick={sendRequest}>
              <Search />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
