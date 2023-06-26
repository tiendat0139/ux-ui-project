import React, { Suspense, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Backdrop,
  Fade,
  Breadcrumbs,
  Typography,
  Link,
  alpha,
  Divider,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";

import PropTypes from "prop-types";
import Header from "./Header";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import Icon from "../Icons";
import Checklist from "../_CheckList";
import FileUpload from "../FileUpload";

const CustomTimeline = React.lazy(() => import("../Timeline.jsx"));
const Comment = React.lazy(() => import("../Comment"));

const TaskDetailModal = ({ taskId, open, setOpen }) => {
  const { palette } = useTheme();
  const [task, setTask] = useState({});
  const [assignee, setAssignee] = useState({});
  const [file, setFile] = useState([]);
  const [tab, setTab] = useState(1);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color={alpha(palette.text.light, 0.5)}
      href=""
      sx={{ cursor: "pointer", fontSize: "1.3rem", fontFamily: "Outfit" }}
      fontWeight={500}
    >
      {task.workspace != 0 ? "Workspace" : "Personal"}
    </Link>,
    <Link
      underline="hover"
      key="2"
      color={alpha(palette.text.light, 0.5)}
      href=""
      sx={{ cursor: "pointer", fontSize: "1.3rem", fontFamily: "Outfit" }}
      fontWeight={500}
    >
      {task.workspaceName}
    </Link>,
    <Link
      underline="hover"
      key="2"
      color={palette.text.light}
      href=""
      sx={{ cursor: "pointer", fontSize: "1.3rem", fontFamily: "Outfit" }}
      fontWeight={500}
    >
      {`IT-${task.id}`}
    </Link>,
  ];

  const timelineList = [
    {
      id: 1,
      name: "Nguyen Tien Dat",
      action: "Added issue",
      actionType: "add",
      updateTo: "",
      addedAt: "31/05/2023 ~ 14:10PM",
    },
    {
      id: 2,
      name: "Nguyen Tien Dat",
      action: "Checklist subtask",
      actionType: "check",
      updateTo: "",
      addedAt: "31/05/2023 ~ 14:10PM",
    },
    {
      id: 3,
      name: "Nguyen Tien Dat",
      action: "Update status to",
      actionType: "update",
      updateTo: "In Progress",
      addedAt: "01/06/2023 ~ 8:10PM",
    },
    {
      id: 4,
      name: "Nguyen Tien Dat",
      action: "Upload Attachment",
      actionType: "upload",
      addedAt: "01/06/2023 ~ 8:10PM",
    },
    {
      id: 5,
      name: "Nguyen Tien Dat",
      action: "Update status to",
      actionType: "update",
      updateTo: "Resolve",
      addedAt: "01/06/2023 ~ 8:10PM",
    },
    {
      id: 3,
      name: "Nguyen Tien Dat",
      action: "Close this task",
      actionType: "close",
      addedAt: "01/06/2023 ~ 17:30PM",
    },
  ];

  const handleClose = () => setOpen(false);

  const getStatusColor = (status) => {
    if (status === "Open") return palette.info.main;
    if (status === "In Progress") return palette.info.light;
    if (status === "Resolve") return palette.success.main;
    if (status === "Close") return palette.danger.main;
  };

  const getColorByTag = (tag) => {
    let color;
    if (tag === "school") color = "#0099E7";
    if (tag === "project") color = "#0070B1";
    if (tag === "sport") color = "#1AB877";
    if (tag === "part time") color = "#3f51b5";

    return color;
  };

  const getUser = async (userId) => {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await res.json();
    return user;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(` http://localhost:3000/tasks/${taskId}`);
      const data = await res.json();
      setTask(data);
      setFile(data.attachment);
      const assignee = await getUser(data.assignee);
      setAssignee(assignee);
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

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
            width: task.workspace == 0 ? "40%" : "80%",
            height: task.workspace == 0 ? "auto" : "95%",
            borderRadius: "1.2rem",
            outline: "none",
            overflow: "hidden",
          }}
        >
          <Header titleIcon={true} handleClose={handleClose} />
          <Box sx={{ pl: "4rem", height: "100%" }}>
            {task.workspace != 0 && (
              <Breadcrumbs
                separator={
                  <NavigateNextIcon
                    sx={{ color: alpha("#4A5974", 0.5) }}
                    fontSize="small"
                  />
                }
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            )}
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ mt: "1rem" }}
              height="88%"
            >
              <Box
                sx={{ width: task.workspace == 0 ? "100%" : "45%", mb: "3rem" }}
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <Box display="flex" alignItems="center" gap="3rem">
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                    sx={{
                      bgcolor: "#F4F6F8",
                      p: "0.4rem 1rem",
                      borderRadius: "0.4rem",
                    }}
                  >
                    <Typography variant="h6" color={palette.text.light}>
                      {task.status}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: getStatusColor(task.status),
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "30rem",
                      }}
                    ></Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    light
                    sx={{ height: "3rem" }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ px: "0.5rem" }}
                      color={alpha(palette.text.light, 0.7)}
                    >
                      Due time
                    </Typography>
                    <Box display="flex" gap="0.5rem" alignItems="center">
                      <Icon
                        name="calendar2"
                        size={24}
                        color={alpha(palette.text.light, 0.8)}
                      />
                      <Typography
                        variant="h6"
                        color={alpha(palette.text.light, 0.8)}
                        fontWeight={500}
                        fontFamily="Roboto"
                      >
                        {task.end?.replace("T", " ")}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    light
                    sx={{ height: "3rem" }}
                  />
                  {task.priority == "high" && (
                    <Icon name="up-filled" size={24} type="filled" />
                  )}
                  {task.priority == "normal" && (
                    <Icon name="equal-filled" size={24} type="filled" />
                  )}
                  {task.priority == "low" && (
                    <Icon name="down-filled" size={24} type="filled" />
                  )}
                </Box>

                <Box display="flex" flexDirection="column" gap="1rem">
                  <Typography
                    fontSize="2.4rem"
                    fontWeight={500}
                    color={palette.text.dark}
                  >
                    {task.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    color={palette.text.light}
                    fontWeight={400}
                    fontFamily="Roboto"
                  >
                    {task.des}
                  </Typography>
                  <Box display="flex" gap="4rem" alignItems="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="0.5rem"
                      sx={{ width: "10rem" }}
                    >
                      <Icon
                        name="calendar2"
                        size={24}
                        color={alpha(palette.text.light, 0.8)}
                      />
                      <Typography
                        variant="h5"
                        color={alpha(palette.text.light, 0.8)}
                        fontWeight={400}
                        fontFamily="Outfit"
                      >
                        Start time
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      color={alpha(palette.text.light, 0.8)}
                      fontWeight={500}
                      fontFamily="Roboto"
                    >
                      {task.start?.replace("T", " ")}
                    </Typography>
                  </Box>
                  <Box display="flex" gap="4rem" alignItems="center">
                    <Box display="flex" gap="0.5rem" sx={{ width: "10rem" }}>
                      <Icon
                        name="tag"
                        size={24}
                        color={alpha(palette.text.light, 0.8)}
                      />
                      <Typography
                        color={alpha(palette.text.light, 0.9)}
                        fontWeight={400}
                        fontFamily="Roboto"
                      >
                        Tag
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "inline-block",
                        bgcolor: getColorByTag(task.tag),
                        px: "1rem",
                        borderRadius: "0.4rem",
                        height: "1.8rem",
                      }}
                    >
                      <Typography variant="h6" lineHeight="1.8rem" color="#fff">
                        {task.tag}
                      </Typography>
                    </Box>
                  </Box>
                  {task.workspace != 0 && (
                    <Box display="flex" alignItems="center" gap="4rem">
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="0.5rem"
                        sx={{ width: "10rem" }}
                      >
                        <Icon
                          name="user"
                          size={24}
                          color={alpha(palette.text.light, 0.8)}
                        />
                        <Typography
                          variant="h5"
                          color={alpha(palette.text.light, 0.9)}
                          fontWeight={400}
                          fontFamily="Outfit"
                        >
                          Assignee
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap="1rem">
                        <Avatar
                          src={assignee.avatar}
                          sx={{ width: "2.4rem", height: "2.4rem" }}
                        />
                        <Typography
                          color={palette.text.light}
                          fontWeight={400}
                          fontFamily="Outfit"
                        >
                          {assignee.name}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {task.workspace != 0 && (
                    <Box display="flex" alignItems="center" gap="4rem">
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="0.5rem"
                        sx={{ width: "10rem" }}
                      >
                        <Icon
                          name="clock2"
                          size={24}
                          color={alpha(palette.text.light, 0.8)}
                        />
                        <Typography
                          variant="h5"
                          color={alpha(palette.text.light, 0.9)}
                          fontWeight={400}
                          fontFamily="Outfit"
                        >
                          Estimate
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        color={alpha(palette.text.light, 0.8)}
                        fontWeight={500}
                        fontFamily="Roboto"
                      >
                        5 hours
                      </Typography>
                    </Box>
                  )}
                </Box>
                {task.workspace != 0 && <Checklist list={task.checklist} />}
                {task.workspace != 0 && (
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="500"
                      sx={{ mt: "2rem" }}
                    >
                      Attachment
                    </Typography>
                    <FileUpload fileUpload={file} setFileUpload={setFile} />
                  </Box>
                )}
              </Box>
              {task.workspace != 0 && (
                <Box
                  sx={{
                    width: "45%",
                    pt: "4rem",
                    pb: "4rem",
                    mt: "-3rem",
                    bgcolor: alpha("#F4F6F8", 0.7),
                  }}
                >
                  <Box
                    display="flex"
                    gap="3rem"
                    sx={{
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      px: "2rem",
                    }}
                  >
                    <Tabs
                      value={tab}
                      onChange={(_, newValue) => setTab(newValue)}
                    >
                      <Tab label="Recent activity" value={1} />
                      <Tab label="Comment" value={2} />
                    </Tabs>
                  </Box>

                  <Box sx={{ p: "2rem", height: "100%" }}>
                    <Suspense fallback={<div>Loading...</div>}>
                      {tab === 2 ? (
                        <Comment list={task.comments} />
                      ) : (
                        <CustomTimeline activities={timelineList} />
                      )}
                    </Suspense>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

TaskDetailModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  taskId: PropTypes.string,
};

export default TaskDetailModal;
