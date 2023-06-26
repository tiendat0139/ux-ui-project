import { Box, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";

import Icon from "../Icons";

const NavItem = ({ name }) => {
  const { palette } = useTheme();
  return (
    <Box display="flex" alignItems="center" gap="0.3rem">
      <Typography variant="h5" color={palette.text.light}>
        {name}
      </Typography>
      <Icon name="down" size={16} color={palette.text.light}></Icon>
    </Box>
  );
};

NavItem.propTypes = {
  name: PropTypes.string,
};


export default NavItem;
