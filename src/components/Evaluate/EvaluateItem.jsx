import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Checkbox,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Icon from "../Icons";
import PropTypes from "prop-types";
import { useState } from "react";

const EvaluateItem = ({ name, checked, feedback, editable }) => {
  const [idchecked, setIsChecked] = useState(checked);
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      expanded={expanded}
      sx={{
        mb: "1rem",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "none",
      }}
    >
      <AccordionSummary
        sx={{ m: 0 }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box display="flex" alignItems="center">
          <Checkbox
            icon={<Icon name="check-box" size={24} color="rgba(0,0,0,0.2)" />}
            checkedIcon={
              <Icon name="checkbox-checked" size={24} color={"#00a640"} />
            }
            disabled={!editable}
            checked={idchecked}
            onChange={() => setIsChecked((prev) => !prev)}
          />
          <Box
            sx={{ height: "100%" }}
            display="flex"
            alignItems="center"
            onClick={() => setExpanded((prev) => !prev)}
          >
            <Typography>{name}</Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          disabled={!editable}
          defaultValue={feedback}
          fullWidth
          label="Feedback"
          multiline={true}
          minRows={2}
        />
      </AccordionDetails>
    </Accordion>
  );
};
EvaluateItem.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  feedback: PropTypes.string,
  editable: PropTypes.bool,
};
export default EvaluateItem;
