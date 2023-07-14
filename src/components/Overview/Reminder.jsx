import { Avatar, Box, Typography, alpha, useTheme } from "@mui/material";
import ws1 from "../../assets/img/avatar/ws1.png";
import avatar from "../../assets/img/avatar.svg";

import PropTypes from "prop-types";

const Reminder = ({ list }) => {
  const { palette } = useTheme();
  
  const getTagColor = (tag) => {
    if (tag === "project") return "#85CDFD";
    if (tag === "school") return "#DEFCF9";
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
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            cursor: "pointer",
            transition: "all .5s",
            "&:hover": {
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.2)",
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
