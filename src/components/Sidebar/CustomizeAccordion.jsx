import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandMore } from "@mui/icons-material";
import PropTypes from "prop-types";

const CustomizeAccordion = ({ children }) => {

  const CustomizeAccordion = styled((props) => (
    <Accordion disableGutters elevation={1} square {...props} />
  ))(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  return (
    <CustomizeAccordion sx={{ boxShadow: "none" }}>
      <AccordionSummary
        sx={{
          fontSize: "2.4rem",
          "&:hover": {
            backgroundColor: "#f3f4f7",
          },
        }}
        expandIcon={<ExpandMore fontSize="medium"/>}
      >
        <Typography variant="h6" fontWeight="500" color="#666">
          WORKSPACES
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
    </CustomizeAccordion>
  );
};

CustomizeAccordion.propTypes = {
  children: PropTypes.node,
};

export default CustomizeAccordion;
