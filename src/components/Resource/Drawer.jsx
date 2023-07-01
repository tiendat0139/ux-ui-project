import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DrawerCard from "./DrawerCard";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Drawer = ({ open }) => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:3000/tasks?workspace=${id}&assignee.id=0`
      );
      const data = await res.json();
      setTasks(data);
    };
    fetchData();
  });

  return (
    <Box
      sx={{
        width: "30rem",
        bgcolor: "#F4F6F8",
        position: "fixed",
        top: 230,
        right: open ? 0 : -500,
        bottom: 0,
        zIndex: 100,
        boxShadow: "1px 1px 10px rgba(0,0,0,0.1)",
        border: "1px solid rgba(0,0,0,0.1)",
        p: "2rem 1rem",
        transition: "right 0.4s ease-in-out",
      }}
    >
      <Typography variant="h4" fontWeight={500} sx={{ mb: "2rem", px: "1rem" }}>
        Unassigned Tasks
      </Typography>
      {tasks.map((task) => (
        <DrawerCard
          key={task.id}
          title={task.name}
          des={task.des}
          due={task.end}
          priority={task.priority}
        />
      ))}
    </Box>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool,
};

export default Drawer;
