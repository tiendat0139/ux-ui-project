import { Box, Typography, alpha } from "@mui/material";
import PropTypes from "prop-types";

const StatisBox = ({ count, title, color1, color2 }) => {
  return (
    <Box
      sx={{
        width: "25%",
        p: "1rem 1rem",
        backgroundImage: `linear-gradient(to top left, ${color1},${color2})`,
        borderRadius: "0.5rem"
      }}
    >
      <Typography variant="h4" color="#fff">
        {count}
      </Typography>
      <Typography variant="h6" color={alpha("#fff", 0.8)}>
        {title}
      </Typography>
    </Box>
  );
};

StatisBox.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  color1: PropTypes.string,
  color2: PropTypes.string,
};

export default StatisBox;
