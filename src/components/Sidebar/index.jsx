import { Box, Button, Typography, alpha } from "@mui/material";
import SidebarItem from "./SidebarItem";
import CustomizeAccordion from "./CustomizeAccordion";
import WorkspaceItem from "./WorkspaceItem";
import Icon from "../Icons";
import ws1 from "../../assets/img/avatar/ws1.png";
import ws2 from "../../assets/img/avatar/ws2.png";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "18%",
        py: "2rem",
        borderRight: "1px solid rgba(0,0,0,0.1)",
        position: "fixed",
        top: "4.8rem",
        bottom: "0",
        backgroundColor: "white",
      }}
      display="flex"
      flexDirection="column"
      gap="4rem"
    >
      <Box display="flex" flexDirection="column">
        <SidebarItem text="Home" icon="home" href="/" />
        <SidebarItem text="Calendar" icon="calendar" href="/calendar" />
        <SidebarItem text="Board" icon="board" href="/board" />
        <SidebarItem text="Dashboard" icon="dashboard" href="/dashboard" />
        <SidebarItem text="Source" icon="source" href="/source" />
      </Box>

      <CustomizeAccordion>
        <Box
          display="flex"
          flexDirection="column"
          gap="0.2rem"
          sx={{ pt: "1rem", pb: "3rem" }}
        >
          <Box sx={{ px: "1.6rem", mb: "1rem" }}>
            <Button
              sx={{ bgcolor: "#F4F6F8", px: "0rem", py: "0.2rem" }}
              fullWidth
            >
              <Icon name="add" size={12} color={alpha("#4A5974", 0.8)} />
              <Typography
                variant="h6"
                fontFamily="Outfit"
                color={alpha("#4A5974", 0.8)}
                sx={{ ml: "0.5rem" }}
              >
                New Workspace
              </Typography>
            </Button>
          </Box>
          <WorkspaceItem text="ITSS Project" avatar={ws1}  href="/workspace/1" />
          <WorkspaceItem text="UX UI Design" avatar={ws2}  href="/workspace/2" />
        </Box>
      </CustomizeAccordion>
    </Box>
  );
};

export default Sidebar;
