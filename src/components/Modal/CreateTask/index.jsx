import {
  Modal,
  Box,
  useTheme,
  Button,
  Fade,
  Backdrop,
} from "@mui/material";
import PropTypes from "prop-types";
import Header from "../Header";
import { useState } from "react";
import CreateNewTask from "./CreateNewTask";
import ImportFromSource from "./ImportFromSource";

const CreateTask = ({ open, setOpenModal }) => {
  const { palette } = useTheme();
  const [type, setType] = useState("new");

  const handleClose = () => setOpenModal(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            bgcolor: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            borderRadius: "1.2rem",
            outline: "none",
            overflow: "hidden",
          }}
        >
          <Header title="Create task" handleClose={handleClose} />
          <Box display="flex" gap="2rem" sx={{ px: "4rem", mt: "2rem" }}>
            <Button
              sx={{
                color:
                  type === "new" ? palette.primary.main : palette.text.light,
                bgcolor: type === "new" ? palette.primary.light : "",
                p: "0.4rem 2rem",
              }}
              onClick={() => setType("new")}
            >
              Create new task
            </Button>
            <Button
              sx={{
                color:
                  type === "source" ? palette.primary.main : palette.text.light,
                bgcolor: type === "source" ? palette.primary.light : "",
                p: "0.4rem 2rem",
              }}
              onClick={() => setType("source")}
            >
              Import from source
            </Button>
          </Box>
          {type === "new" && <CreateNewTask setOpenModal={setOpenModal} />}
          {type === "source" && <ImportFromSource setOpenModal={setOpenModal} />}
        </Box>
      </Fade>
    </Modal>
  );
};

CreateTask.propTypes = {
  open: PropTypes.bool,
  setOpenModal: PropTypes.func,
};

export default CreateTask;
