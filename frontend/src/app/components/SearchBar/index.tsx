import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material"
import useStyles  from "./styles"

export default function SearchBar(){
    const classes = useStyles();
return (
    <Paper
      elevation={2}
      className={classes.searchBar}
    >
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            className={classes.searchInput}
          />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search"><Search /></IconButton>
        </Paper>
)
}