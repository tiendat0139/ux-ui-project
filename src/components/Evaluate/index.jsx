import { Box, Button, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import EvaluateItem from "./EvaluateItem";

const Evaluate = ({ editable, evaluate, setOpen }) => {
  const { palette } = useTheme();
  const handleCloseTask = () => {
    if (editable) {
      toast.info("Close task successfully", { autoClose: 2000 });
      setOpen(false);
    } else {
      toast.warning("You have no right to change", { autoClose: 1000 });
    }
  };
  return (
    <Box>
      <Box>
        {evaluate.length > 0 &&
          evaluate.map((item, index) => (
            <EvaluateItem
              editable={editable}
              key={index}
              name={item.name}
              checked={item.checked}
              feedback={item.feedback}
            />
          ))}
        {evaluate.length == 0 && (
          <Typography
            variant="h5"
            textAlign="center"
            color={palette.text.light}
          >
            No evaluate due to the task not being in resolve status
          </Typography>
        )}
      </Box>
      {editable && evaluate.length == 0 && (
        <Box display="flex" gap="2rem" justifyContent="end" sx={{ mt: "3rem" }}>
          <Button variant="outlined">Rework</Button>
          <Button variant="contained" onClick={handleCloseTask}>
            Close task
          </Button>
        </Box>
      )}
    </Box>
  );
};
Evaluate.propTypes = {
  editable: PropTypes.bool,
  evaluate: PropTypes.object,
  setOpen: PropTypes.func,
  checklist: PropTypes.array,
};
export default Evaluate;
