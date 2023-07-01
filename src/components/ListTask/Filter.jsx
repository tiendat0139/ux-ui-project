import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  alpha,
  Popover,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import PropTypes from "prop-types";
import CustomMenuItem from "../Modal/CustomMenuItem";
import avatar1 from "../../assets/img/avatar/1.png";
import avatar2 from "../../assets/img/avatar/2.png";
import avatar3 from "../../assets/img/avatar/3.png";
import avatar4 from "../../assets/img/avatar/4.png";
import noMember from "../../assets/img/avatar/no.png";
import Icon from "../Icons";

const Filter = ({ setFiltered }) => {
  let { id } = useParams();

  const [filter, setFilter] = useState({
    assignee: "",
    reviewer: "",
    status: "",
  });

  const { palette } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ModalId = open ? "simple-popover" : undefined;

  const handleFilter = async (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    const params = { ...filter, [e.target.name]: e.target.value };

    const res = await fetch(
      `http://localhost:3000/tasks?workspace=${id}&&${
        params.assignee && `assignee.id=${params.assignee}&&`
      }${params.reviewer && `assessor.id=${params.assessor}&&`}${
        params.status && `status=${params.status}`
      }&&_page=1&_limit=5`
    );
    const data = await res.json();
    setFiltered(data);
  };

  return (
    <Box>
      <Box
        display="flex"
        gap="0.5rem"
        aria-describedby={ModalId}
        onClick={handleClick}
      >
        <Icon name="filter" size={20} />
        <Typography color={alpha(palette.text.light, 0.8)}>Filters</Typography>
      </Box>
      <Popover
        id={ModalId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: -10,
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            p: "2rem",
            bgcolor: "background.paper",
            boxShadow: "1px 1px 10px rgba(0,0,0,0.3)",
            borderRadius: "1rem",
            width: "36rem",
          }}
        >
          <FormControl fullWidth>
            <Box display="flex" gap="2rem" alignItems="center">
              <Typography color={palette.text.dark} sx={{ width: "10rem" }}>
                Assignee
              </Typography>
              <Select
                fullWidth
                name="assignee"
                size="small"
                value={filter.assignee}
                onChange={handleFilter}
              >
                <MenuItem value="">
                  <Box>
                    <Typography sx={{ pl: "3rem" }}>All member</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="0">
                  <CustomMenuItem text="Unassigned" avatar={noMember} />
                </MenuItem>
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
            </Box>
          </FormControl>
          <FormControl fullWidth sx={{ mt: "2rem" }}>
            <Box display="flex" gap="2rem" alignItems="center">
              <Typography color={palette.text.dark} sx={{ width: "10rem" }}>
              Evaluator
              </Typography>
              <Select
                fullWidth
                name="reviewer"
                size="small"
                value={filter.reviewer}
                onChange={handleFilter}
              >
                <MenuItem value="">
                  <Typography sx={{ pl: "3rem" }}>All member</Typography>
                </MenuItem>
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
            </Box>
          </FormControl>
          <FormControl fullWidth sx={{ mt: "2rem" }}>
            <Box display="flex" gap="2rem" alignItems="center">
              <Typography color={palette.text.dark} sx={{ width: "10rem" }}>
                Status
              </Typography>
              <Select
                fullWidth
                name="status"
                size="small"
                onChange={handleFilter}
                value={filter.status}
              >
                <MenuItem value="">
                  <Typography sx={{ pl: "3rem" }}>All status</Typography>
                </MenuItem>
                <MenuItem value="Open">
                  <TaskStatus status="Open" />
                </MenuItem>
                <MenuItem value="In progress">
                  <TaskStatus status="In progress" />
                </MenuItem>
                <MenuItem value="Resolve">
                  <TaskStatus status="Resolve" />
                </MenuItem>
                <MenuItem value="Close">
                  <TaskStatus status="Close" />
                </MenuItem>
              </Select>
            </Box>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  );
};

export const TaskStatus = ({ status }) => {
  const { palette } = useTheme();
  const getStatusColor = (status) => {
    if (status === "Open") return palette.info.main;
    if (status === "In progress") return palette.info.light;
    if (status === "Resolve") return palette.success.main;
    if (status === "Close") return palette.danger.main;
  };
  return (
    <Box
      sx={{
        bgcolor: getStatusColor(status),
        width: "8rem",
        textAlign: "center",
        borderRadius: "30rem",
      }}
    >
      <Typography color="#fff" variant="h6">
        {status}
      </Typography>
    </Box>
  );
};
TaskStatus.propTypes = {
  status: PropTypes.string,
};
Filter.propTypes = {
  setFiltered: PropTypes.func,
};
export default Filter;
