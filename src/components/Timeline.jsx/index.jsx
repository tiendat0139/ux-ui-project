import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from "@mui/lab";
import PropTypes from "prop-types";
import Icon from "../Icons";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { useEffect, useState } from "react";


const CustomTimeline = ({ activities }) => {
  const { palette } = useTheme();
  const [actList, setActList] = useState([]);

  const checkStatusColor = (status) => {
    if (status === "In Progress") return palette.info.light;
    if (status === "Resolve") return palette.success.main;
  };

  const checkActIcon = (actionType) => {
    if (actionType === "add") return "add-task";
    if (actionType === "check") return "check-list";
    if (actionType === "update") return "update";
    if (actionType === "upload") return "attachment";
    if (actionType === "close") return "close-task";
  };

  useEffect(() => {
    const sortedList = activities.sort((a, b) => {
      if (a.id < b.id) return 1;
      if (a.id > b.id) return -1;
      return 0;
    });
    setActList([...sortedList]);
  }, [activities]);

  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {actList.map((actItem, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot variant="outlined" sx={{p: "0.5rem"}}>
              <Icon name={checkActIcon(actItem.actionType)} size={14} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Box
              display="flex"
              gap="0.5rem"
              alignItems="center"
              sx={{ color: palette.text.light, fontSize: 14 }}
            >
              <Typography fontWeight={500}>{actItem.name}</Typography>
              <Box display="flex" gap="0.5rem">
                <Typography fontSize="1.4rem">{actItem.action}</Typography>
                <Box sx={{ px: "1rem", borderRadius:"1rem", bgcolor: checkStatusColor(actItem.updateTo) }}>
                  <Typography
                    fontSize="1.4rem"
                    fontFamily="Outfit"
                    fontWeight={500}
                    color="#fff"
                  >
                    {actItem.updateTo}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              fontSize="1.2rem"
              color={alpha(palette.text.light, 0.8)}
            >
              Added at {actItem.addedAt}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

CustomTimeline.propTypes = {
  activities: PropTypes.array,
};

export default CustomTimeline;
