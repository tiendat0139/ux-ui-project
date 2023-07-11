import { Avatar, Box, Typography, alpha, useTheme } from "@mui/material";
import ws1 from "../../assets/img/avatar/ws1.png";
import avatar from "../../assets/img/avatar.svg";

import PropTypes from "prop-types";

const Reminder = ({ list }) => {
  const { palette } = useTheme();
  const getTagColor = (tag) => {
    if (tag === "school") return "#039be5";
    if (tag === "project") return "#0070B1";
    if (tag === "sport") return "#1AB877";
    if (tag === "part time") return "#3f51b5";
  };
  const getWorkspaceAvatar = (workspace) => {
    if (workspace === "UX UX Design") return ws1;
    if (workspace === "Personal") return avatar;
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      gap="2rem"
      sx={{
        borderRadius: "1rem",
        p: "2rem",
      }}
    >
      <Typography variant="h4" fontWeight={500} color={palette.text.dark}>
        Reminder
      </Typography>
      {list.map((item, index) => (
        <Box
          key={index}
          sx={{
            p: "2rem 4rem",
            bgcolor: getTagColor(item.category),
            borderRadius: "1.2rem",
            width: "100%",
            boxShadow: "-4px 4px 5px rgba(0,0,0,0.15)",
            cursor: "pointer",
            "&:hover": {
              transform: "translate(1px, -1px)",
            },
          }}
        >
          <Typography variant="h6" color={alpha(palette.text.light, 0.6)}>
            {item.time}
          </Typography>
          <Typography
            color={palette.text.light}
            fontSize={16}
            fontWeight={500}
            sx={{ mt: "0.8rem" }}
          >
            {item.name}
          </Typography>
          <Box
            display="flex"
            gap="0.4rem"
            alignItems="center"
            sx={{ mt: "1.6rem" }}
          >
            <Avatar
              src={getWorkspaceAvatar(item.workspace)}
              sx={{ width: "2rem", height: "2rem" }}
            />
            <Typography variant="h6" color={palette.text.light}>
              {item.workspace}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

Reminder.propTypes = {
  list: PropTypes.array,
};
export default Reminder;
