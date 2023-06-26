import { Box } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import List from "../../../components/Source/List";

const Source = () => {
  return (
    <Box>
      <PageHeader title="Source" />
      <Box sx={{ mt: "8rem" }}>
        <List />
      </Box>
    </Box>
  );
};

export default Source;
