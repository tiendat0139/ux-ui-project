import { Box, Button, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Evaluate = ({ editable, evaluate, setOpen }) => {
  const { palette } = useTheme();
  const handleCloseTask = () => {
    toast.info("Task closed");
    setOpen(false);
  }
  return (
    <Box>
      <Box
        display="flex"
        gap="1rem"
        justifyContent="end"
        alignItems="center"
        sx={{ mb: "3rem" }}
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
      <Box display="flex" gap="2rem" justifyContent="end" sx={{mt: "3rem"}}>
        <Button variant="outlined">Rework</Button>
        <Button variant="contained" onClick={handleCloseTask}>Close task</Button>
      </Box>
    </Box>
  );
};
Evaluate.propTypes = {
  editable: PropTypes.bool,
  evaluate: PropTypes.object,
  setOpen: PropTypes.func
};
export default Evaluate;
