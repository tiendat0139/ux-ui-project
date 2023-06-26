import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const Progress = ({ value }) => {
  const { palette } = useTheme();

  return (
    <Box sx={{ height: "0.6rem", bgcolor: "#eee", borderRadius: "1rem" }}>
      <Box
        sx={{
          width: `${value}%`,
          height: "100%",
          bgcolor: palette.success.main,
          borderRadius: "1rem",
        }}
      ></Box>
    </Box>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
};

export default Progress;
