import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const Input = ({ name, label, type, icon }) => {
  const { palette } = useTheme();

  const CssTextField = styled(TextField)({
    "label + &": {
      fontSize: 16,
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      fontSize: 16,
      padding: "10px 12px",
    },
    "& .MuiOutlinedInput-root": {
      height: "50px",
      "&:hover fieldset": {
        borderColor: palette.primary.main,
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.6rem",
      lineHeight: "1.6rem",
    },
  });

  return (
    <CssTextField
      name={name}
      label={label}
      type={type}
      autoComplete="on"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            { icon }
          </InputAdornment>
        ),
      }}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
};

export default Input;
