import { useState } from "react";
import {
  Badge,
  Box,
  IconButton,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import Icon from "../Icons";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  const { palette } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge variant="dot" color="primary">
          <Icon
            name="alert"
            size={16}
            color={anchorEl ? palette.primary.main : palette.text.light}
          />
        </Badge>
      </IconButton>
      <Popover
        sx={{ borderRadius: "100rem" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: -6,
          horizontal: "center",
        }}
      >
        <Box sx={{ p: "2rem 1rem" }}>
          <Typography
            variant="h4"
            fontSize={22}
            fontWeight={500}
            color={palette.text.dark}
            sx={{ px: "1rem", mb: "1rem" }}
          >
            Notifications
          </Typography>
          <NotificationItem />
        </Box>
      </Popover>
    </Box>
  );
};

export default Notification;
