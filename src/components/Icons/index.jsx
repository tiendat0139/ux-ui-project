import { Box } from "@mui/material";
import PropTypes from "prop-types";
import "./index.scss";
const Icon = ({ name, size, color, type }) => {

  return (
    <Box
      id={name}
      className="custom-icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: type === "filled" ? "none" : color,
      }}
    ></Box>
  );
};

export default Icon;

Icon.propTypes = {
  name: PropTypes.string ,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  type: PropTypes.string
};

Icon.defaultProps = {
  color: "#4A5974"
}
