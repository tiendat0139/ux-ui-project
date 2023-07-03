import React, { Suspense, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Pagination,
  Avatar,
} from "@mui/material";
import SearchBox from "../SearchBox";
import PropTypes from "prop-types";
import Icon from "../Icons";
import Filter from "./Filter";
import { useParams } from "react-router-dom";
const TaskDetailModal = React.lazy(() => import("../Modal/TaskDetailModal"));

const Priority = ({ priority }) => {
  return (
    <Box display="flex">
      {priority === "high" && (
        <Box display="flex" gap="1rem" alignItems="center">
          <Icon name="high" size={12} color="#F0440A" />
          <Typography color="#F0440A">High</Typography>
        </Box>
      )}
      {priority === "normal" && (
        <Box display="flex" gap="1rem" alignItems="center">
          <Icon name="normal" size={9} color="#FFCC00" />
          <Typography color="#FFCC00">Normal</Typography>
        </Box>
      )}
      {priority === "low" && (
        <Box display="flex" gap="1rem" alignItems="center">
          <Icon name="low" size={12} color="#2683FF" />
          <Typography color="#2683FF">Low</Typography>
        </Box>
      )}
    </Box>
  );
};

const ListTask = () => {
  const { palette } = useTheme();
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [page, setPaget] = useState(1);
  let { id } = useParams();
  
  const getStatusColor = (status) => {
    if (status === "Open") return palette.info.main;
    if (status === "In progress") return palette.info.light;
    if (status === "Resolve") return palette.success.main;
    if (status === "Close") return palette.danger.main;
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://workmate.onrender.com/tasks?workspace=${id}&&_page=${page}&_limit=5`
      );
      const data = await res.json();
      setRows(data);
    };

    fetchData();
  }, [page, id]);

  const headCells = [
    { id: "Key", label: "Key" },
    { id: "TaskName", label: "Task name" },
    { id: "DueDate", label: "Due date" },
    { id: "Priority", label: "Priority" },
    { id: "Assignee", label: "Assignee" },
    { id: "Status", label: "Status" },
    { id: "Openration", label: "Operation" },
  ];

  const handleOpenModal = (taskId) => {
    setSelectedTask(taskId);
    setOpenModal(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="end">
        <Box display="flex" alignItems="center" gap="2rem">
          <SearchBox trailingButton={false} />
          <Box sx={{ cursor: "pointer", "&:hover": { opacity: "0.8" } }}>
            <Filter setFiltered={setRows} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TableSortLabel sx={{ color: "#666" }}>
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenModal(row.id)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: palette.primary.main, fontWeight: 500 }}
                  >
                    IT-{row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.end.replace("T", " ")}</TableCell>
                  <TableCell>
                    <Priority priority={row.priority} />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap="1rem">
                      <Avatar
                        sx={{ width: "2.6rem", height: "2.6rem" }}
                        src={row.assignee.avatar}
                      />
                      <Typography variant="h6">{row.assignee.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: getStatusColor(row.status),
                        width: "9rem",
                        textAlign: "center",
                        borderRadius: "30rem",
                      }}
                    >
                      <Typography color="#fff" variant="h6">
                        {row.status}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap="2rem">
                      <IconButton>
                        <Icon name="edit" size="20" color="#083AA9" />
                      </IconButton>
                      <IconButton>
                        <Icon name="delete" size="20" color="#E03B24" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ mt: "5rem", textAlign: "center" }}
      >
        <Pagination
          count={5}
          color="primary"
          page={page}
          onChange={(e, value) => setPaget(value)}
        />
      </Box>
      <Suspense loading={<div>Loading...</div>}>
        <TaskDetailModal
          open={openModal}
          setOpen={setOpenModal}
          taskId={selectedTask}
        />
      </Suspense>
    </Box>
  );
};

Priority.propTypes = {
  priority: PropTypes.string,
};
export default ListTask;
