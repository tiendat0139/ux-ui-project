import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Icon from "../Icons";
import PropTypes from "prop-types";

const Header = ({ title, titleIcon, handleClose }) => {
  const { palette } = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: "6rem",
        bgcolor: "#F4F6F8",
        borderBottom: "1px solid rgba(0,0,0, 0.2)",
        px: "2rem",
      }}
    >
      {titleIcon ? (
        <Box display="flex" gap="1rem">
          <Icon name="link" size={24} />
          <Typography color="#4A5974" fontFamily="Outfit" fontWeight={500}>
            Copy link
          </Typography>
        </Box>
      ) : (
        <Typography variant="h4" fontWeight={500} color={palette.text.dark}>
          {title}
        </Typography>
      )}
      <IconButton onClick={handleClose} sx={{ p: "1.5rem" }}>
        <Icon name="close" size={14} color={palette.text.dark} />
      </IconButton>
    </Box>
  );
};
Header.propTypes = {
  title: PropTypes.string,
  handleClose: PropTypes.func,
  titleIcon: PropTypes.bool,
};
export default Header;
