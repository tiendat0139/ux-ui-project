import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import DrawerCard from "./DrawerCard";
import PropTypes from "prop-types";
import noMember from "../../assets/img/avatar/no.png";
import { useTheme } from "@emotion/react";

const Drawer = ({ open }) => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const {palette} = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://workmate.onrender.com/tasks?workspace=${id}&assignee.id=0`
      );
      const data = await res.json();
      setTasks(data);
    };
    fetchData();
  }, [id]);

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
      <Box display="flex" alignItems="center" gap="1rem" sx={{mb: "2rem"}}>
        <Avatar src={noMember} sx={{width: "3rem", height: "3rem"}} />
        <Typography
          variant="h5"
          fontSize={20}
          fontWeight={500}
          color={palette.text.light}
        >
          Unassigned Tasks
        </Typography>
      </Box>
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
