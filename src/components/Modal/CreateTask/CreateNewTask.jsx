import { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  TextField,
  Button,
  alpha,
  Select,
  Tooltip,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import CustomDatePicker from "../../DatePicker";
import FileUpload from "../../FileUpload";
import CustomMenuItem from "../CustomMenuItem";
import avatar1 from "../../../assets/img/avatar/1.png";
import avatar2 from "../../../assets/img/avatar/2.png";
import avatar3 from "../../../assets/img/avatar/3.png";
import avatar4 from "../../../assets/img/avatar/4.png";
import CheckList from "./CheckList";
import { toast } from "react-toastify";
import Icon from "../../Icons";

const CreateNewTask = ({ setOpenModal }) => {
  const { palette } = useTheme();
  const [reminder, setReminder] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const [taskInfo, setTaskInfo] = useState({
    name: "",
    start: null,
    end: null,
    des: "",
    priority: "",
    tag: "",
    workspace: "",
    assignee: "",
    assessor: "",
    recur: "",
    reminder: false,
  });
  const [fileUpload, setFileUpload] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);

  const handleChange = (e) => {
    if (e.target.name == "workspace" && e.target.value == 0) {
      setIsPersonal(true);
    } else {
      setIsPersonal(false);
    }
    setTaskInfo({ ...taskInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const data = { ...taskInfo, attachment: fileUpload, checkList: checkList };
    const res = await fetch("https://workmate.onrender.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 201) {
      toast.success("Create task successfully");
      setOpenModal(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://workmate.onrender.com/workspaces");
      const data = await res.json();
      setWorkspaces([data[0], data[2]]);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Box sx={{ maxHeight: "60vh", overflowY: "scroll", mt: "2rem" }}>
        <Box display="flex" alignItems="center" sx={{ mb: "2rem", px: "4rem" }}>
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
              >
                {workspaces.map((workspace) => (
                  <MenuItem value={workspace.id} key={workspace.id}>
                    <CustomMenuItem
                      text={workspace.name}
                      avatar={workspace.avatar}
                    />
                  </MenuItem>
                ))}
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
              <InputLabel id="assignee">Assignee</InputLabel>
              <Select
                labelId="assignee"
                id="assignee"
                label="Assignee"
                name="assignee"
                value={taskInfo.assignee}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="1">
                  <CustomMenuItem text="Me" avatar={avatar1} />
                </MenuItem>
                <MenuItem value="2">
                  <CustomMenuItem text="Nguyen Duc Hoang" avatar={avatar2} />
                </MenuItem>
                <MenuItem value="3">
                  <CustomMenuItem text="Hoang The Anh" avatar={avatar3} />
                </MenuItem>
                <MenuItem value="4">
                  <CustomMenuItem text="Pham Xuan Duy" avatar={avatar4} />
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: "0.8rem" }}>
              <InputLabel id="assessor">Evaluator</InputLabel>
              <Select
                labelId="assessor"
                id="assessor"
                label="Evaluator"
                name="assessor"
                value={taskInfo.assessor}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="1">
                  <CustomMenuItem text="Me" avatar={avatar1} />
                </MenuItem>
                <MenuItem value="2">
                  <CustomMenuItem text="Nguyen Duc Hoang" avatar={avatar2} />
                </MenuItem>
                <MenuItem value="3">
                  <CustomMenuItem text="Hoang The Anh" avatar={avatar3} />
                </MenuItem>
                <MenuItem value="4">
                  <CustomMenuItem text="Pham Xuan Duy" avatar={avatar4} />
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
            <CheckList checkList={checkList} setCheckList={setCheckList} />
          </Box>
          <Typography variant="h5" fontWeight="500" sx={{ mt: "2rem" }}>
            Attachment
          </Typography>
          <FileUpload fileUpload={fileUpload} setFileUpload={setFileUpload} />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap="2rem"
        justifyContent={isPersonal ? "space-between" : "end"}
        sx={{
          p: "1.8rem 4rem",
          mt: "1rem",
          borderTop: "1px solid rgba(0,0,0, 0.2)",
        }}
      >
        {isPersonal && (
          <Tooltip title="Reminder" placement="top-start">
            <IconButton
              sx={{ p: 0 }}
              onClick={() => setReminder((prev) => !prev)}
            >
              <Icon
                name="alarm"
                color={
                  !reminder
                    ? alpha(palette.text.light, 0.3)
                    : palette.primary.main
                }
                size={36}
              ></Icon>
            </IconButton>
          </Tooltip>
        )}
        <Box>
          <Button
            variant="outlined"
            sx={{ width: 100, mr: "2rem" }}
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
  );
};
CreateNewTask.propTypes = {
  setOpenModal: PropTypes.func,
};
export default CreateNewTask;
