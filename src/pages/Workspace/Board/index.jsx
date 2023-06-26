import { Box } from "@mui/material";
import WorkspaceKanban from "../../../components/Board/WorkspaceKanban";

const WorkspaceBoard = () => {
  return (
    <Box sx={{mt: "14rem"}}>
      <WorkspaceKanban />
    </Box>
  )
}


export default WorkspaceBoard;
