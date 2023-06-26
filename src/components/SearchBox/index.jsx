import { Box, InputBase, Typography, useTheme, alpha } from "@mui/material";
import Icon from "../Icons";
import PropTypes from "prop-types";

const SearchBox = ({ trailingButton=true, placeholder=false, ...styles }) => {
  const { palette } = useTheme();

  return (
    <Box
      display="flex"
      gap="1rem"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: "0.4rem 0.4rem",
        height: "3.2rem",
        backgroundColor: alpha(palette.background.light, 0.5),
        border: `1px solid ${palette.background.main}`,
        borderRadius: "0.2rem",
        ...styles
      }}
    >
      <Icon name="search" color={palette.text.light} size={19} />
      <InputBase sx={{ width: "14rem", fontSize: "1.4rem" }} placeholder={placeholder ? "Search..." : ""}/>
      {trailingButton && (
        <Box
          display="flex"
          alignItems="center"
          sx={{
            p: "0 0.4rem",
            backgroundColor: palette.background.main,
            borderRadius: "0.2rem",
          }}
        >
          <Icon name="command" color={palette.text.light} size={18} />
          <Typography variant="h6" fontWeight={500} color={palette.text.light}>
            K
          </Typography>
        </Box>
      )}
    </Box>
  );
};

SearchBox.propTypes = {
  trailingButton: PropTypes.bool,
  placeholder: PropTypes.bool
};

export default SearchBox;
