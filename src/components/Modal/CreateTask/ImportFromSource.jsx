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
} from "@mui/material";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import CustomDatePicker from "../../DatePicker";
import FileUpload from "../../FileUpload";
import CustomMenuItem from "../CustomMenuItem";
import { useEffect, useState } from "react";
import CheckList from "./CheckList";

const ImportFromSource = ({ setOpenModal }) => {
  const { palette } = useTheme();
  const [taskInfo, setTaskInfo] = useState({
    name: "",
    start: dayjs(new Date()),
    end: dayjs(new Date()),
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
  const [sources, setSources] = useState([]);
  const [source, setSource] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const handleChangeSource = async (e) => {
    setSource(e.target.value);
    const res = await fetch(`http://localhost:3000/sources/${e.target.value}`);
    const data = await res.json();
    setTasks(data.tasks);
  };

  const handleChangeTask = (e) => {
    setTask(e.target.value);
    const selectedTask = tasks[e.target.value];
    setTaskInfo({
      ...taskInfo,
      name: selectedTask.name,
      start: dayjs(selectedTask.start),
      end: dayjs(selectedTask.end),
      des: selectedTask.des,
    });
  };

  const handleChange = (e) => {
    setTaskInfo({ ...taskInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const data = { ...taskInfo, attachment: fileUpload, checkList: checkList };
    const res = await fetch(" http://localhost:3000/tasks", {
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
    const fetchSources = async () => {
      const res = await fetch(" http://localhost:3000/sources");
      const data = await res.json();
      setSources(data);
    };
    fetchSources();
  }, []);

  return (
    <Box>
      <Box sx={{ maxHeight: "60vh", overflowY: "scroll", mt: "2rem" }}>
        <Box display="flex" gap="4rem" sx={{ px: "4rem" }}>
          <FormControl fullWidth sx={{ mt: "0.8rem" }}>
            <InputLabel id="select-source">Source</InputLabel>
            <Select
              labelId="select-source"
              id="select-source"
              label="Source"
              name="source"
              value={source}
              onChange={(e) => handleChangeSource(e)}
            >
              {sources.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  <CustomMenuItem text={item.name} avatar={item.avatar} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: "0.8rem" }}>
            <InputLabel id="select-task">Task</InputLabel>
            <Select
              labelId="select-task"
              id="select-task"
              label="Task"
              name="task"
              value={task}
              onChange={(e) => handleChangeTask(e)}
            >
              {tasks?.map((task) => (
                <MenuItem value={task.id} key={task.id}>
                  <CustomMenuItem text={task.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" alignItems="center" sx={{ mb: "2rem", px: "4rem" }}>
          <TextField
            sx={{ mt: "2rem" }}
            fullWidth
            placeholder="Task name"
            variant="standard"
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{
              shrink: false,
              style: { fontSize: 20 },
            }}
            name="name"
            value={taskInfo.name}
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
                labelId="select-tag"
                id="select-tag"
                label="Tag"
                name="tag"
                value={taskInfo.tag}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="1">
                  <Box
                    sx={{
                      display: "inline-block",
                      bgcolor: "#0099e7",
                      px: "1rem",
                      borderRadius: "0.4rem",
                    }}
                  >
                    <Typography variant="h5" color="#fff">
                      Learning
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="2">
                  <Box
                    sx={{
                      display: "inline-block",
                      bgcolor: "#3f51b5",
                      px: "1rem",
                      borderRadius: "0.4rem",
                    }}
                  >
                    <Typography variant="h6" color="#fff">
                      Project
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="3">
                  <Box
                    sx={{
                      display: "inline-block",
                      bgcolor: "#1ab877",
                      px: "1rem",
                      borderRadius: "0.4rem",
                    }}
                  >
                    <Typography variant="h5" color="#fff">
                      Playing
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
        gap="2rem"
        justifyContent="end"
        sx={{
          p: "1.8rem 4rem",
          mt: "1rem",
          borderTop: "1px solid rgba(0,0,0, 0.2)",
        }}
      >
        <Button variant="outlined" sx={{ width: 100 }}>
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
  );
};
ImportFromSource.propTypes = {
  setOpenModal: PropTypes.func,
};
export default ImportFromSource;
