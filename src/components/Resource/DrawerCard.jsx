import { Box, Typography, useTheme, alpha } from "@mui/material";
import Icon from "../Icons";
import PropTypes from "prop-types";

const DrawerCard = ({ title, des, due, priority }) => {
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1.2rem"
      sx={{
        bgcolor: "#fff",
        p: "1rem",
        mb: "2rem",
        borderRadius: "0.8rem",
        boxShadow: "1px 2px 2px rgba(0,0,0,0.15)",
      }}
    >
      <Box display="flex" flexDirection="column" gap="0.6rem">
        <Typography
          fontWeight={500}
          variant="h5"
          color={alpha("#000", 0.8)}
          fontFamily="Roboto"
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          color={palette.text.light}
          fontWeight={400}
          fontFamily="Roboto"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {des}
        </Typography>
      </Box>
      <Box display="flex" gap="1rem">
        <Box
          display="flex"
          gap="0.6rem"
          sx={{
            p: "0.2rem 0.8rem",
            bgcolor: palette.background.light,
            borderRadius: "0.4rem",
          }}
        >
          <Icon name="calendar" size={16} />
          <Typography fontSize="1.2rem" color={palette.text.light}>
            {due}
          </Typography>
        </Box>
        <Box
          display="flex"
          gap="0.6rem"
          sx={{
            p: "0.2rem 0.8rem",
            bgcolor: palette.background.light,
            borderRadius: "0.4rem",
          }}
        >
          <Icon name="clock" size={16} />
          <Typography fontSize="1.2rem" color={palette.text.light}>
            8 hours
          </Typography>
        </Box>
        {priority == "high" && (
          <Icon name="up-filled" size={22} type="filled" />
        )}
        {priority == "normal" && (
          <Icon name="equal-filled" size={22} type="filled" />
        )}
        {priority == "low" && (
          <Icon name="down-filled" size={24} type="filled" />
        )}
      </Box>
    </Box>
  );
};

DrawerCard.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
  due: PropTypes.string,
  priority: PropTypes.string,
  workspaceId: PropTypes.string,
};
export default DrawerCard;
