import { Box, Typography, alpha, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const ColumnTitle = ({ title, number }) => {
  const { palette } = useTheme();

  const getColor = () => {
    if (title === "Open") return palette.info.main;
    if (title === "In Progress") return palette.info.light;
    if (title === "Resolve") return palette.success.main;
    if (title === "Close") return palette.danger.main;
  };
  return (
    <Box
      sx={{
        px: "2rem",
        py: "1rem",
        bgcolor: "#F4F6F8",
        borderTop: `3.6px solid ${getColor(title)}`,
        borderTopLeftRadius: "0.4rem",
        borderTopRightRadius: "0.4rem",
      }}
    >
      <Box display="flex" gap="1rem" alignItems="center">
        <Typography variant="h5">{title}</Typography>
        <Box
          sx={{
            p: "0 1rem",
            fontSize: "1.1rem",
            backgroundColor: alpha("#000", 0.1),
            borderRadius: "1.2rem",
            fontFamily: "Outfit"
          }}
        >
          {number}
        </Box>
      </Box>
    </Box>
  );
};
ColumnTitle.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
};
ColumnTitle.defaultProps = {
  number: 6,
};
export default ColumnTitle;
