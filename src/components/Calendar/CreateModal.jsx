import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Fade,
  Backdrop,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  TextField,
  Button,
  alpha,
  Select,
} from "@mui/material";

import PropTypes from "prop-types";
import dayjs from "dayjs";
import CustomDatePicker from "../DatePicker";
import FileUpload from "../FileUpload";
import CustomMenuItem from "../Modal/CustomMenuItem";
import CheckList from "../Modal/CreateTask/CheckList";
import { toast } from "react-toastify";
import avatar1 from "../../assets/img/avatar/1.png";

const CreateModal = ({ open, setOpenModal, addEvent, data }) => {
  const handleClose = () => setOpenModal(false);
  const { palette } = useTheme();
  const [taskInfo, setTaskInfo] = useState({
    name: "",
    start: "",
    end: "",
    des: "",
    priority: "",
    tag: "",
    workspace: 0,
    assignee: 1,
    recur: "",
    reminder: false,
  });

  const [fileUpload, setFileUpload] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [workspace, setWorkspace] = useState({});

  const handleChange = (e) => {
    setTaskInfo({ ...taskInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const data = {
      ...taskInfo,
      attachment: fileUpload,
      checkList: checkList,
      assignee: { id: taskInfo.assignee },
      start: dayjs(taskInfo.start).format("YYYY-MM-DDTHH:MM"),
      end: dayjs(taskInfo.end).format("YYYY-MM-DDTHH:MM"),
    };
    const res = await fetch(" http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 201) {
      toast.success("Create task successfully");
      addEvent(data);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    setTaskInfo({
      ...taskInfo,
      start: dayjs(data.start),
      end: dayjs(data.end),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.end, data.start]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/workspaces/0");
      const data = await res.json();
      setWorkspace(data);
    };
    fetchData();
  }, []);

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
            zIndex: 1000,
          }}
        >
          <Box>
            <Box sx={{ maxHeight: "60vh", overflowY: "scroll", mt: "2rem" }}>
              <Box
                display="flex"
                alignItems="center"
                sx={{ mb: "2rem", px: "4rem" }}
              >
                <TextField
                  sx={{ mt: "2rem" }}
                  fullWidth
                  placeholder="Task name"
                  variant="standard"
                  inputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{
                    shrink: false,
                    style: { fontSize: 20 },
                  }}
                  name="name"
                  value={taskInfo.value}
                  onChange={(e) => handleChange(e)}
                />
              </Box>
              <Box
                sx={{ p: "1rem 4rem" }}
                display="flex"
                flexDirection="column"
                gap="2rem"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <CustomDatePicker
                    label="Start"
                    name="start"
                    value={taskInfo.start}
                    setValue={setTaskInfo}
                  />
                  <Box
                    sx={{
                      width: "1.2rem",
                      height: "0.15rem",
                      bgcolor: palette.text.light,
                    }}
                  ></Box>
                  <CustomDatePicker
                    label="Due"
                    name="end"
                    value={taskInfo.end}
                    setValue={setTaskInfo}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Description"
                    fullWidth
                    minRows="2"
                    multiline={true}
                    name="des"
                    value={taskInfo.des}
                    onChange={(e) => handleChange(e)}
                  />
                </Box>
                <Box display="flex" gap="3rem">
                  <FormControl fullWidth sx={{ mt: "0.8rem" }}>
                    <InputLabel id="workspace">Workspace</InputLabel>
                    <Select
                      labelId="workspace"
                      id="workspace"
                      label="Workspace"
                      name="workspace"
                      value={taskInfo.workspace}
                      onChange={(e) => handleChange(e)}
                      readOnly
                    >
                      <MenuItem value={workspace.id} key={workspace.id}>
                        <CustomMenuItem
                          text={workspace.name}
                          avatar={workspace.avatar}
                        />
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: "0.8rem" }}>
                    <InputLabel id="assignee">Assignee</InputLabel>
                    <Select
                      labelId="assignee"
                      id="assignee"
                      label="Assignee"
                      name="assignee"
                      value={taskInfo.assignee}
                      onChange={(e) => handleChange(e)}
                      readOnly
                    >
                      <MenuItem value="1">
                        <CustomMenuItem text="Me" avatar={avatar1} />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  display="flex"
                  gap="3rem"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControl fullWidth sx={{ mt: "0.8rem" }}>
                    <InputLabel id="priority">Priority</InputLabel>
                    <Select
                      labelId="priority"
                      id="priority"
                      label="Priority"
                      name="priority"
                      value={taskInfo.priority}
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="high">
                        <CustomMenuItem
                          text="Hight"
                          icon="up-filled"
                          color="#F0440A"
                        />
                      </MenuItem>
                      <MenuItem value="medium">
                        <CustomMenuItem
                          text="Medium"
                          icon="equal-filled"
                          color="#FFCC00"
                        />
                      </MenuItem>
                      <MenuItem value="low">
                        <CustomMenuItem
                          text="Low"
                          icon="down-filled"
                          color="#2683FF"
                        />
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: "0.8rem" }}>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select
                      labelId="Tag"
                      id="selec-tag"
                      label="tag"
                      name="tag"
                      value={taskInfo.tag}
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="school">
                        <Box
                          sx={{
                            display: "inline-block",
                            bgcolor: "#039be5",
                            px: "1rem",
                            borderRadius: "0.4rem",
                          }}
                        >
                          <Typography variant="h5" color="#fff">
                            school
                          </Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="project">
                        <Box
                          sx={{
                            display: "inline-block",
                            bgcolor: "#0070B1",
                            px: "1rem",
                            borderRadius: "0.4rem",
                          }}
                        >
                          <Typography variant="h6" color="#fff">
                            project
                          </Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="sport">
                        <Box
                          sx={{
                            display: "inline-block",
                            bgcolor: "#1ab877",
                            px: "1rem",
                            borderRadius: "0.4rem",
                          }}
                        >
                          <Typography variant="h5" color="#fff">
                            playing
                          </Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="part time">
                        <Box
                          sx={{
                            display: "inline-block",
                            bgcolor: "#3f51b5",
                            px: "1rem",
                            borderRadius: "0.4rem",
                          }}
                        >
                          <Typography variant="h5" color="#fff">
                            part time
                          </Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: "0.8rem" }}>
                    <InputLabel id="recur">Recurring</InputLabel>
                    <Select
                      labelId="recur"
                      id="recur"
                      label="Recurring"
                      name="recur"
                      value={taskInfo.recur}
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="daily">
                        <Typography variant="h6">Daily</Typography>
                      </MenuItem>
                      <MenuItem value="weekly">
                        <Typography variant="h6">Weekly</Typography>
                      </MenuItem>
                      <MenuItem value="monthly">
                        <Typography variant="h6">Monthly</Typography>
                      </MenuItem>
                      <MenuItem value="yearly">
                        <Typography variant="h6">Yearly</Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <CheckList
                    checkList={checkList}
                    setCheckList={setCheckList}
                  />
                </Box>
                <Typography variant="h5" fontWeight="500" sx={{ mt: "2rem" }}>
                  Attachment
                </Typography>
                <FileUpload
                  fileUpload={fileUpload}
                  setFileUpload={setFileUpload}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              gap="2rem"
              justifyContent="end"
              sx={{
                p: "1.8rem 4rem",
                mt: "1rem",
                borderTop: "1px solid rgba(0,0,0, 0.2)",
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: 100 }}
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: 100,
                  "&:hover": { bgcolor: alpha(palette.primary.main, 0.9) },
                }}
                onClick={(e) => handleSubmit(e)}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

CreateModal.propTypes = {
  open: PropTypes.bool,
  setOpenModal: PropTypes.func,
  data: PropTypes.object,
  addEvent: PropTypes.func,
};
CreateModal.defaultProps = {
  data: {},
};
export default CreateModal;
