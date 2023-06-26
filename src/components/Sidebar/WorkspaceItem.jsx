import { Avatar, Box, Typography, useTheme } from "@mui/material";
import Proptypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const WorkspaceItem = ({ text, href, avatar }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const currentPath = useLocation();
  const active = currentPath.pathname.includes(href);

  return (
    <Box sx={{ px: "1.6rem" }}>
      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        sx={{
          borderRadius: "0.6rem",
          p: "0.9rem 2.1rem",
          backgroundColor: active ? palette.primary.light : "",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: active ? palette.primary.light : "#f6f7f9",
          },
        }}
        onClick={() => navigate(href)}
      >
        <Avatar
          sx={{
            width: "2rem",
            height: "2rem",
          }}
          variant="square"
          src={avatar}
        />
        <Typography
          variant="h6"
          color={active ? palette.primary.main : palette.text.light}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

WorkspaceItem.propTypes = {
  text: Proptypes.string,
  href: Proptypes.string,
  avatar: Proptypes.string
};
WorkspaceItem.defaultProps = {
  href: "#",
};

export default WorkspaceItem;
