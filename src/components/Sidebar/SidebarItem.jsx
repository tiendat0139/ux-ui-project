import { useLocation, useNavigate } from "react-router-dom";
import Proptypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";
import Icon from "../Icons";

const SidebarItem = ({ icon, text, href }) => {
  const { palette } = useTheme();
  const currentPath = useLocation();
  const navigate = useNavigate();

  const active = currentPath.pathname === href;

  return (
    <Box sx={{px: "1.6rem"}}>
      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        sx={{
          p: "1.1rem 2rem",
          borderRadius: "0.6rem",
          backgroundColor: active ? palette.primary.light : "",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: active ? palette.primary.light : "#F4F6F8",
          }
        }}
        onClick={() => navigate(href)}
      >
        <Icon
          name={icon}
          size={16}
          color={active ? palette.primary.main : palette.text.light}
        />
        <Typography
          variant="h5"
          color={active ? palette.primary.main : palette.text.light}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

SidebarItem.propTypes = {
  icon: Proptypes.string,
  text: Proptypes.string,
  href: Proptypes.string,
};
SidebarItem.defaultProps = {
  href: "#",
};

export default SidebarItem;
