import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  useTheme,
  IconButton,
  AvatarGroup,
  alpha,
  Tabs,
  Tab,
} from "@mui/material";
import PropTypes from "prop-types";
import Icon from "../../components/Icons";
import WorkspaceSetting from "../Modal/WorkspaceSetting";
import avt1 from "../../assets/img/avatar/1.png";
import avt2 from "../../assets/img/avatar/2.png";
import avt3 from "../../assets/img/avatar/3.png";
import avt4 from "../../assets/img/avatar/4.png";

import { useEffect } from "react";

const WorkspaceHeader = ({ setPageTitle }) => {
  const { palette } = useTheme();
  const [tab, setTab] = useState("List");
  const [openSetting, setOpenSetting] = useState(false);

  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: "",
    avatar: ""
  });

  let { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (_, newValue) => {
    if (newValue === "List") {
      setTab("List");
      navigate(`/workspace/${id}`);
      setPageTitle("List");
    } else {
      setTab(newValue);
      setPageTitle(newValue);
      navigate(`/workspace/${id}/${newValue.toLowerCase()}`);
    }
  };

  useEffect(() => {
    let path = location.pathname;
    if (path.includes("gantt")) setTab("Gantt");
    else if (path.includes("board")) setTab("Board");
    else setTab("List");
  }, [location.pathname, tab]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://workmate.onrender.com/workspaces/${id}`);
      const data = await res.json();
      setWorkspaceInfo({name: data.name, avatar: data.avatar});
    }
    fetchData();
  }, [id])
  return (
    <Box sx={{ pt: "1rem", m: "0 -2.4rem 3rem -2.4rem", width: "100%" }}>
      <Box display="flex" justifyContent="space-between" sx={{ px: "2.4rem", pr: "30rem"}}>
        <Box display="flex" alignItems="center" gap="1rem">
          <Avatar
            sx={{
              width: "2.8rem",
              height: "2.8rem",
            }}
            src={workspaceInfo.avatar}
            variant="square"
          />
          <Typography
            variant="h3"
            fontSize="2.4rem"
            color={palette.text.light}
            fontWeight={700}
          >
            {workspaceInfo.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="2rem">
          <IconButton
            sx={{
              width: "3.6rem",
              height: "3.6rem",
              bgcolor: "#D2EAFF",
              "&:hover": { bgcolor: alpha("#D2EAFF", 0.6) },
            }}
          >
            <Icon name="add" size={11} color={palette.primary.main} />
          </IconButton>
          <AvatarGroup onClick={() => setOpenSetting(true)} sx={{cursor: "pointer"}}>
            <Avatar sx={{ width: "3.6rem", height: "3.6rem" }} src={avt1} />
            <Avatar sx={{ width: "3.6rem", height: "3.6rem" }} src={avt2} />
            <Avatar sx={{ width: "3.6rem", height: "3.6rem" }} src={avt3} />
            <Avatar sx={{ width: "3.6rem", height: "3.6rem" }} src={avt4} />
            <Avatar
              sx={{
                width: "3.6rem",
                height: "3.6rem",
                bgcolor: "#E7EBEF",
                color: palette.text.light,
                fontSize: "1.4rem",
              }}
            >
              +9
            </Avatar>
          </AvatarGroup>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} sx={{ px: "2.4rem" }}>
          <Tab value="List" label="List" />
          <Tab value="Board" label="Board" />
          <Tab value="Gantt" label="Gantt" />
        </Tabs>
      </Box>
      <WorkspaceSetting open={openSetting} setOpenModal={setOpenSetting} />
    </Box>
  );
};

WorkspaceHeader.propTypes = {
  workspaceName: PropTypes.string,
  setPageTitle: PropTypes.func,
};

export default WorkspaceHeader;
