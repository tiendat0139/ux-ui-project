import {
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBox = () => {
  return (
    <ListSubheader>
      <TextField
        placeholder="Type to search..."
        size="small"
        autoFocus
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <Search />
            </InputAdornment>
          ),
        }}
      ></TextField>
    </ListSubheader>
  );
};

export default SearchBox;
