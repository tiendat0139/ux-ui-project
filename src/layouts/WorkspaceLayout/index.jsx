import { Route, Routes } from "react-router-dom";
import { workspaceRouter } from "../../routes";
import PageHeader from "../../components/PageHeader";
import { Box } from "@mui/material";

// import TaskDetailModal from "../../components/Modal/TaskDetailModal";

const WorkspaceLayout = () => {
  return (
    <Box>
      <PageHeader pageType="workspace" title="List" />
      <Routes>
        {workspaceRouter.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.element />}
          ></Route>
        ))}
      </Routes>
    </Box>
  );
};

export default WorkspaceLayout;
