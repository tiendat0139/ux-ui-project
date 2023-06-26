import { useState } from "react";
import Proptypes from "prop-types";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { mainRouter } from "../../routes";
import Middleware from "../../components/Middleware";
import CreateTask from "../../components/Modal/CreateTask";

const CommonLayout = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)

  return (
    <Middleware>
      <Box>
        <Sidebar />
        <Navbar handleOpenModal={handleOpenModal} />
        <Box
          sx={{
            mt: "5rem",
            ml: "18%",
            height: "calc(100vh - 5rem)",
            px: "2.4rem"
          }}
        >
          <Box
            sx={{
              pt: "0.4rem",
              height: "100%",
            overflowY: "hidden",
            }}
          >
            <Routes>
              {mainRouter.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element />} />
              ))}
            </Routes>
          </Box>
        </Box>
        <CreateTask type="source" open={openModal} setOpenModal={setOpenModal} />
      </Box>
    </Middleware>
  );
};

CommonLayout.propTypes = {
  children: Proptypes.node,
  scroll: Proptypes.bool
};


export default CommonLayout;
