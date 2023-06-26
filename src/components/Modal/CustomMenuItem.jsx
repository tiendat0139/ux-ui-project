import { Avatar, Box, Typography } from "@mui/material";
import Icon from "../Icons";
import PropTypes from "prop-types";

const CustomMenuItem = ({ icon, text, color, avatar }) => {
  return (
    <Box display="flex">
      {icon && <Icon name={icon} size="20" color={color} />}
      {avatar && <Avatar sx={{width: "2rem", height: "2rem"}} src={avatar} />}
      <Typography variant="h6" sx={{ ml: "1.2rem", fontFamily: "Roboto" }} color="#3d474d">
        {text}
      </Typography>
    </Box>
  );
};

CustomMenuItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  avatar: PropTypes.string,
};

export default CustomMenuItem;
