import { Box } from "@mui/material";
import Kanban from "../../../components/Board/Kanban";
import PageHeader from "../../../components/PageHeader";

const Board = () => {
  return (
    <Box>
      <PageHeader title="Board" />
      <Box sx={{mt: "8rem"}}>
        <Kanban  />
      </Box>
    </Box>
  )
}


export default Board;
