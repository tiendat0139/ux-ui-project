import { Box, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const Evaluate = ({ editable, evaluate }) => {
  const { palette } = useTheme();
  return (
    <Box>
      <Tooltip title={editable ? "" : "You are not evaluator"} placement="top">
        <TextField
          fullWidth
          label="Feedback"
          disabled={!editable}
          multiline={true}
          minRows={5}
          defaultValue={evaluate?.content}
        />
      </Tooltip>
      <Box
        display="flex"
        gap="1rem"
        justifyContent="end"
        alignItems="center"
        sx={{ mt: "2rem" }}
      >
        <Typography variant="h4" color={palette.text.dark}>
          Score:
        </Typography>
        <Tooltip
          title={editable ? "" : "You are not evaluator"}
          placement="top"
        >
          <TextField
            size="small"
            sx={{ width: "4rem", p: 0, fontSize: 20 }}
            disabled={!editable}
            defaultValue={evaluate?.point}
            inputProps={{
              style: {
                padding: 5,
              },
            }}
          />
        </Tooltip>

        <Typography fontSize={20} color={palette.text.dark}>
          /
        </Typography>
        <Typography fontSize={20} color={palette.text.dark}>
          100
        </Typography>
      </Box>
    </Box>
  );
};
Evaluate.propTypes = {
  editable: PropTypes.bool,
  evaluate: PropTypes.object,
};
export default Evaluate;
