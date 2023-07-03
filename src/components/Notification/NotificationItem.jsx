import { Avatar, Box, Typography, alpha, useTheme } from "@mui/material";
import avatar2 from "../../assets/img/avatar/2.png";
import avatar3 from "../../assets/img/avatar/3.png";
import Icon from "../Icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NotificationItem = ({member, title, time, ws, read = true, memberId=1}) => {
  const { palette } = useTheme();
  const avatars = [avatar2, avatar3];
  return (
    <Box
      display="flex"
      gap="1.6rem"
      sx={{
        p: "1rem",
        borderRadius: "1rem",
        cursor: "pointer",
        bgcolor: !read? palette.primary.light : "",
        "&:hover": {
          bgcolor: "rgba(0,0,0,0.05)",
        },
        mb: "0.5rem"
      }}
    >
      <Avatar sx={{ width: "5rem", height: "5rem" }} src={avatars[memberId-1]} />
      <Box sx={{ width: "30rem" }}>
        <p style={{ color: palette.text.dark, lineHeight: "2rem" }}>
          <span style={{ fontWeight: 500 }}>{member} </span>
          {title}
        </p>
        <Box display="flex" alignItems="center" gap="0.8rem">
          <Typography variant="h6" color={alpha(palette.text.light, 0.6)}>
            {time}
          </Typography>
          <Icon
            name="dot-filled"
            size={5}
            color={alpha(palette.text.light, 0.6)}
          />
          <Link style={{ textDecoration: "none" }}>
            <Typography variant="h6" color={alpha(palette.text.light, 0.6)}>
              {ws}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

NotificationItem.propTypes = {
  member: PropTypes.string,
  memberId: PropTypes.number,
  title: PropTypes.string,
  time: PropTypes.string,
  ws: PropTypes.string,
  read: PropTypes.bool
}
export default NotificationItem;
