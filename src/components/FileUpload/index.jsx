import { Box, Button, Typography, alpha, useTheme } from "@mui/material";
import Icon from "../Icons";
import PropTypes from "prop-types";

const FileUpload = ({fileUpload, setFileUpload}) => {
  const { palette } = useTheme();

  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileSize = `${(file.size / 1024 ** 2).toFixed(2)} MB`
    setFileUpload([...fileUpload, {name: file.name, size: fileSize}])
  }
  return (
    <Box display="flex" alignItems="center" gap="2rem">
      {fileUpload?.map((file, index) => (
        <Box
          key={index}
          display="flex"
          gap="1rem"
          alignItems="center"
          sx={{
            width: "fit-content",
            px: "1rem",
            height: "4.6rem",
            border: `1px solid ${alpha(palette.text.light, 0.4)}`,
            borderRadius: "0.6rem",
          }}
        >
          <Icon name="pdf" size={26} color="#F71F13" />
          <Box>
            <Typography
              fontFamily="Outfit"
              fontSize="1.2rem"
              color={palette.text.light}
              fontWeight={500}
            >
              {file.name}
            </Typography>
            <Typography fontSize="1.2rem" color={alpha("#000", 0.5)}>
              {file.size}
            </Typography>
          </Box>
        </Box>
      ))}
      <Button component="label" sx={{width: "4.6rem", p:0}}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            height: "4.6rem",
            border: `1px dashed ${alpha(palette.text.light, 0.4)}`,
            borderRadius: "0.6rem",
            bgcolor: "#F4F6F8",
          }}
        >
          <Icon name="upload" size={24} />
        </Box>
        <input type="file" hidden onChange={e => handleChange(e)} />
      </Button>
    </Box>
  );
};
FileUpload.propTypes = {
  fileUpload: PropTypes.array,
  setFileUpload: PropTypes.func
}
export default FileUpload;
