import { Box, useTheme, Typography, alpha } from "@mui/material";
import PropTypes from "prop-types";
import Icon from "../Icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";

const TaskList = ({ title, list }) => {
  const { palette } = useTheme();
  const [slicedList, setSlicedList] = useState([]);

  const getDayMonth = (timeString) => {
    let monthNumber = moment(timeString, "YYYY/MM/DD hh:mm").month();
    let monthName = dayjs().month(monthNumber).format("MMM");
    let day = moment(timeString, "YYYY/MM/DD hh:mm").date();
    return [day, monthName];
  };

  const isToday = (timeString) => {
    const today = new Date();
    const date = new Date(timeString);
    if (today.toDateString() === date.toDateString()) {
      return true;
    }
    return false;
  };

  const getTagColor = (tag) => {
    if (tag === "school") return "#039be5";
    if (tag === "project") return "#0070B1";
    if (tag === "sport") return "#1AB877";
    if (tag === "part time") return "#3f51b5";
  };
  useEffect(() => {
    let newList;
    if (title === "Overdue") newList = list.slice(0, 3);
    else newList = list.slice(0, 3);
    setSlicedList(newList);
  }, [title, list]);


  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        width: "100%",
        borderRadius: "0.6rem",
        px: "2rem",
        height: "100%",
      }}
    >
      <Box display="flex" justifyContent="space-between" sx={{ px: "1rem " }}>
        <Typography
          variant="h4"
          fontSize={18}
          fontWeight={500}
          color={palette.text.dark}
        >
          {title}
        </Typography>
        <Box display="flex" alignItems="center" gap="0.4rem">
          <Typography
            variant="h6"
            fontWeight={500}
            color={alpha(palette.text.light, 0.4)}
          >
            See all
          </Typography>
          <Icon
            name="right-double"
            size={14}
            color={alpha(palette.text.light, 0.4)}
          />
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="2rem" sx={{ mt: "1rem" }}>
        {slicedList.map((task, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            sx={{
              bgcolor: "#fff",
              p: "1rem 2rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "all .5s",
              "&:hover": {
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.2)",
              },
            }}
          >
            <Box display="flex" gap="2rem" alignItems="center">
              {isToday(task.start) ? (
                <Typography
                  variant="h4"
                  color={palette.text.light}
                  textAlign="center"
                  sx={{ width: "8rem" }}
                >
                  Today
                </Typography>
              ) : (
                <Box sx={{ width: "8rem" }}>
                  <Typography
                    variant="h4"
                    textAlign="center"
                    color={palette.primary.main}
                  >
                    {getDayMonth(task.start)[0]}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    color={alpha(palette.text.light, 0.6)}
                  >
                    {getDayMonth(task.start)[1]?.toUpperCase()}
                  </Typography>
                </Box>
              )}
              <Box display="flex" flexDirection="column" gap="0.4rem">
                <Typography
                  variant="h5"
                  fontSize={18}
                  fontWeight={500}
                  fontFamily="Roboto"
                  color={palette.text.light}
                >
                  {task.name}
                </Typography>
                <pre>
                  <Typography
                    variant="h5"
                    fontSize={13}
                    fontWeight={500}
                    fontFamily="Roboto"
                    color={
                      title === "Overdue"
                        ? alpha(palette.danger.main, 0.8)
                        : alpha(palette.text.light, 0.6)
                    }
                  >
                    Due at {task.end?.replace("T", "  ")}
                  </Typography>
                </pre>
                <Typography
                  variant="h5"
                  fontSize={13}
                  fontFamily="Roboto"
                  color={alpha(palette.text.light, 0.6)}
                >
                  {task.workspaceName}
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              sx={{ width: "22%", py: "2rem" }}
              justifyContent="space-between"
            >
              <Box
                sx={{
                  bgcolor: getTagColor(task.tag),
                  px: "1rem",
                  borderRadius: "3rem",
                  height: "2rem",
                }}
              >
                <Typography variant="h6" color="#fff" lineHeight="2rem">
                  {task.tag}
                </Typography>
              </Box>
              <Icon name="up-filled" size={20} type="filled" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
TaskList.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
};

export default TaskList;
