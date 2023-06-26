import { useState } from "react";
import Proptypes from "prop-types";
import {
  Box,
  Avatar,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
const Dropdown = ({ menuItemList }) => {
  const { palette } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" sx={{ flex: "1 1 auto" }} justifyContent="end">
      <Tooltip title={<span style={{fontSize: "1rem"}}>Account settings</span>}>
        <IconButton
          onClick={handleClick}
          aria-controls={openAnchor ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openAnchor ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: "3.2rem",
              height: "3.2rem",
              bgcolor: palette.primary.main,
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={openAnchor}
        id="account-menu"
        onClick={handleClose}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: "0.5rem",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: "1rem",
              height: "1rem",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menuItemList.map((item, index) => (
          <MenuItem
            key={index}
            href={item.href ? item.href : ""}
            onClick={item.action ? item.action : null}
          >
            <ListItemIcon >{item.icon}</ListItemIcon>
            <Typography variant="h6">{item.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

Dropdown.propTypes = {
  menuItemList: Proptypes.arrayOf(
    Proptypes.shape({
      text: Proptypes.string,
      href: Proptypes.string,
      icon: Proptypes.node,
      action: Proptypes.func,
    })
  ),
};

export default Dropdown;
