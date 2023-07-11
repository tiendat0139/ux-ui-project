import { Box, Typography, useTheme } from "@mui/material";
import TaskList from "../../../components/Overview/TaskList";
import Reminder from "../../../components/Overview/Reminder";

const Home = () => {
  const { palette } = useTheme();

  const upcoming = [
    {
      id: 1,
      name: "Japanese 6",
      start: "2023-06-27T10:15",
      end: "2023-06-27T11:45",
      status: "Open",
      des: "D9 401",
      priority: "high",
      tag: "school",
      workspace: "0",
      workspaceName: "Personal",
      assignee: "1",
      recurring: "weekly",
      reminder: "false",
      source: "1",
    },
    {
      id: 2,
      name: "User interface",
      start: "2023-06-27T12:30",
      status: "In progress",
      end: "2023-06-27T15:50",
      des: "D5 503",
      priority: "high",
      tag: "school",
      workspace: "0",
      workspaceName: "Personal",
      assignee: "1",
      recurring: "weekly",
      reminder: "false",
      source: "1",
    },
    {
      id: 3,
      name: "Software Engineering",
      start: "2023-07-06T9:30",
      status: "Open",
      end: "2023-07-06T11:45",
      des: "D5 503",
      priority: "high",
      tag: "school",
      workspace: "0",
      workspaceName: "Personal",
      assignee: "1",
      recurring: "weekly",
      reminder: "false",
      source: "1",
    },
  ];

  const overdue = [
    {
      id: 12,
      name: "Write Website Specification",
      des: "Create a comprehensive specification document",
      status: "Open",
      start: "2023-06-20T00:00",
      end: "2023-06-23T00:00",
      priority: "high",
      tag: "project",
      workspace: "1",
      workspaceName: "ITSS Project",
      assignee: "1",
      reminder: "false",
      checklist: [
        {
          name: "Gather requirements from stakeholders and project team",
          checked: true,
        },
        {
          name: "Define the target audience and user personas",
          checked: true,
        },
        {
          name: "Outline the website structure and navigation",
          checked: true,
        },
        {
          name: "Specify the visual design and branding guidelines",
          checked: false,
        },
      ],
      comments: [
        {
          title:
            "Regularly update the specification as requirements evolve or change",
          time: "2 days ago",
        },
      ],
      attachment: [
        {
          name: "customer-require.pdf",
          size: "5MB  ",
        },
      ],
    },
    {
      id: 12,
      name: "ITSS Assignment",
      des: "ITSS Assignment Week 9",
      status: "Open",
      start: "2023-06-21T00:00",
      end: "2023-06-23T00:00",
      priority: "high",
      tag: "school",
      workspace: "1",
      workspaceName: "Personal",
      assignee: "1",
    },
  ];
  const reminder = [
    {
      id: 1,
      name: "Prototype introduction meeting",
      category: "project",
      time: "8:30 - 9:30 Jun 19",
      workspace: "UX UX Design",
    },
    {
      id: 2,
      name: "Do ITSS homework",
      category: "school",
      time: "19:30 - 20:30 Jun 5",
      workspace: "Personal",
    },
    {
      id: 2,
      name: "UX UI Team Meeting",
      category: "project",
      time: "19:30 - 20:30 Jun 4",
      workspace: "UX UX Design",
    },
  ];
  return (
    <Box sx={{ py: "1rem", borderRadius: "1rem" }}>
      <Typography
        variant="h3"
        fontWeight={500}
        sx={{ px: "2rem" }}
        color={palette.text.dark}
      >
        My task
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Box sx={{ width: "64%" }}>
          <Box sx={{ mt: "2rem" }}>
            <TaskList title="Ongoing" list={upcoming} />
          </Box>
          <Box sx={{ mt: "3rem" }}>
            <TaskList title="Overdue" list={overdue} />
          </Box>
        </Box>
        <Box sx={{ width: "30%" }}>
          <Reminder list={reminder} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
