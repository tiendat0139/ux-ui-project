import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import $ from "jquery";
import "./index.scss";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Icon from "../Icons";
import TaskDetailModal from "../Modal/TaskDetailModal";
import CreateModal from "./CreateModal";

const DayView = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState();
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const getFormatTime = (time) => {
    return (
      String(time.getHours()).padStart(2, "0") +
      ":" +
      String(time.getMinutes()).padStart(2, "0")
    );
  };

  const getColorByTag = (tag) => {
    let color;
    if (tag === "school") color = "#039be5";
    if (tag === "project") color = "#0070B1";
    if (tag === "sport") color = "#1AB877";
    if (tag === "part time") color = "#3f51b5";

    return color;
  };

  const reFormatTasks = async (tasks) => {
    let newFormat;
    newFormat = Promise.all(
      tasks.map(async (task) => {
        return {
          ...task,
          backgroundColor: getColorByTag(task.tag),
        };
      })
    );
    return newFormat;
  };

  useEffect(() => {
    const current = new Date();
    const formatTime = getFormatTime(current);
    $(".fc-timegrid-now-indicator-arrow").attr("current-time", formatTime);

    const timer = setInterval(() => {
      const current = new Date();
      const formatTime = getFormatTime(current);
      $(".fc-timegrid-now-indicator-arrow").attr("current-time", formatTime);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://workmate.onrender.com/tasks?assignee.id=1");
      const tasks = await res.json();
      const newTasks = await reFormatTasks(tasks);
      setEvents(newTasks);
    };
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEventClick = (info) => {
    setSelectedTaskId(info.event._def.publicId);
    setOpenModal(true);
  };

  const handleAddEvent = (selectionInfo) => {
    setSelectedData(selectionInfo);
    setOpenCreateTaskModal(true);
  };

  const handleCreateEvent = (event) => {
    setEvents([...events,event])
  }
  return (
    <Box>
      <FullCalendar
        contentHeight="auto"
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        allDaySlot={false}
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        nowIndicator={true}
        buttonText={{
          today: "Today",
          week: "Week",
          day: "Day",
          month: "Month",
        }}
        slotDuration="01:00"
        events={events}
        eventDisplay="block"
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        dayMaxEvents={3}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: true,
        }}
        editable={true}
        selectable={true}
        select={handleAddEvent}
      />
      <TaskDetailModal
        taskId={selectedTaskId}
        open={openModal}
        setOpen={setOpenModal}
      />
      <CreateModal
        addEvent={handleCreateEvent}
        open={openCreateTaskModal}
        setOpenModal={setOpenCreateTaskModal}
        data={selectedData}
      />
    </Box>
  );
};
export default DayView;

const renderEventContent = (info) => {
  if (info.view.type === "timeGridDay") {
    return (
      <Box display="flex" flexDirection="column">
        <Box sx={{ px: "0.4rem" }}>
          <Typography variant="h5" fontWeight={500}>
            {info.event.extendedProps.name}
          </Typography>
        </Box>
        <Box sx={{ px: "0.4rem" }}>{info.timeText}</Box>
        <Box display="flex" alignItems="center">
          <Icon name="folder" size={24} color="#fff" />
          {info.event.extendedProps.workspaceName}
        </Box>
      </Box>
    );
  }
  if (info.view.type === "timeGridWeek") {
    return (
      <Box display="flex" flexDirection="column">
        <Box sx={{ px: "0.4rem" }}>
          <Typography
            variant="h5"
            fontWeight={500}
            sx={{
              WebkitLineClamp: 2,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {info.event.extendedProps.name}
          </Typography>
        </Box>
        <Box
          sx={{
            px: "0.4rem",
            WebkitLineClamp: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {info.timeText}
        </Box>
        <Box display="flex" alignItems="center">
          <Icon name="folder" size={24} color="#fff" />
          {info.event.extendedProps.workspaceName}
        </Box>
      </Box>
    );
  }
  if (info.view.type === "dayGridMonth") {
    return (
      <Box display="flex" sx={{ mt: "0.5rem", py: "0.2rem" }}>
        <Box sx={{ px: "0.4rem" }}>{info.timeText}</Box>
        <Box sx={{ px: "0.4rem" }}>{info.event.extendedProps.name}</Box>
      </Box>
    );
  }
};
