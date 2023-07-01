import { Avatar, Box, Typography, alpha, useTheme } from "@mui/material";
import avatar1 from "../../assets/img/avatar/1.png";
import Icon from "../Icons";
import { Link } from "react-router-dom";
const NotificationItem = () => {
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      gap="1.6rem"
      sx={{
        p: "1rem",
        borderRadius: "1rem",
        cursor: "pointer",
        bgcolor: palette.primary.light,
        "&:hover": {
          bgcolor: "rgba(0,0,0,0.05)",
        },
      }}
    >
      <Avatar sx={{ width: "5rem", height: "5rem" }} src={avatar1} />
      <Box sx={{ width: "30rem" }}>
        <p style={{ color: palette.text.dark, lineHeight: "2rem" }}>
          <span style={{ fontWeight: 500 }}>Nguyen Duc Hoang </span>
          has evaluated your task IT-12
        </p>
        <Box display="flex" alignItems="center" gap="0.8rem">
          <Typography variant="h6" color={alpha(palette.text.light, 0.6)}>
            2h ago
          </Typography>
          <Icon
            name="dot-filled"
            size={5}
            color={alpha(palette.text.light, 0.6)}
          />
          <Link style={{ textDecoration: "none" }}>
            <Typography variant="h6" color={alpha(palette.text.light, 0.6)}>
              ITSS Project
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationItem;
