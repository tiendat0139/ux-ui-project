import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  CustomMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./index.scss";
import Drawer from "./Drawer";
import Icon from "../Icons";

const Resource = () => {
  const defaultTimeStart = moment().add(-3, "day");
  const defaultTimeEnd = moment().add(3, "day");
  const [tasks, setTasks] = useState([]);
  const [freeTime, setFreeTime] = useState([]);
  const [members, setMembers] = useState([]);
  const [shared, setShared] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/workspaces/${id}`);
      const data = await res.json();
      const newFormat = data.tasks.map((item) => {
        return {
          ...item,
          type: "work",
          start: moment(item.start),
          end: moment(item.end),
          assigneeId: item.assignee.id,
          canChangeGroup: true,
          canMove: true,
          canResize: true,
        };
      });
      setTasks(newFormat);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/workspaces/1");
      const data = await res.json();
      setMembers(data.members);
    };
    fetchData();
  }, []);

  const handleShareTime = async () => {
    if (!shared) {
      const res = await fetch(
        "http://localhost:3000/tasks?assignee.id=1&workspace=0&workspace=2"
      );
      const data = await res.json();
      const newFormat = data.map((item) => {
        return {
          ...item,
          type: "freeTime",
          start: moment(item.start),
          end: moment(item.end),
          assigneeId: item.assignee.id,
        };
      });
      setFreeTime(newFormat);
    } else {
      setFreeTime([]);
    }
    setShared((prev) => !prev);
  };

  const handleChangeGroup = (itemId, dragTime, newGroupOrder) => {
    const taskChange = tasks.findIndex((task) => task.id == itemId);
    setTasks([...tasks, (tasks[taskChange].assigneeId = newGroupOrder + 1)]);
  };

  const handleChangeTask = (itemId, time, edge) => {
    const taskChange = tasks.findIndex((task) => task.id == itemId);
    if (edge === "left") {
      setTasks([...tasks, (tasks[taskChange].start = time)]);
    } else {
      setTasks([...tasks, (tasks[taskChange].end = time)]);
    }
  };

  const keys = {
    groupIdKey: "id",
    groupTitleKey: "name",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "name",
    itemDivTitleKey: "title",
    itemGroupKey: "assigneeId",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
  };

  const itemRender = ({ item, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    return (
      <Box
        {...getItemProps(item.itemProps)}
        className={item.type === "work" ? "rct-item-work" : "rct-item-free"}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}

        <Box
          className="rct-item-content"
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          {itemContext.title}
        </Box>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
      </Box>
    );
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box>
        <Box sx={{ textAlign: "right", mb: "1rem" }}>
          <Button variant="outlined" onClick={handleShareTime}>
            {!shared ? "Share time" : "Undo share time"}
          </Button>
          <IconButton
            sx={{
              bgcolor: "rgba(0,0,0,0.1)",
              ml: "1rem",
              transform: openDrawer ? "rotate(-180deg)" : "",
              transition: "transform 0.4s"
            }}
            onClick={() => setOpenDrawer((prev) => !prev)}
          >
            <Icon name="double-arrow" size={16} />
          </IconButton>
        </Box>
        <Timeline
          groups={members}
          items={[...tasks, ...freeTime]}
          itemsSorted
          keys={keys}
          itemTouchSendsClick={false}
          stackItems
          lineHeight={80}
          itemHeightRatio={0.75}
          showCursorLine
          canMove={true}
          canResize={true}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          minZoom={60 * 60}
          maxZoom={30 * 86400 * 1000}
          timeSteps={{
            hour: 1,
            day: 1,
            month: 1,
            year: 1,
          }}
          itemRenderer={itemRender}
          onItemMove={handleChangeGroup}
          onItemResize={handleChangeTask}
        >
          <CustomMarker date={Date.now()}>
            {({ styles }) => {
              const customStyles = {
                ...styles,
                backgroundColor: "#0445c7",
                width: "2px",
              };
              return <div style={customStyles} />;
            }}
          </CustomMarker>
          <TimelineHeaders className="sticky">
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <div {...getRootProps()} className="sb-header">
                    Member
                  </div>
                );
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" labelFormat="MMMM, YYYY" />
            <DateHeader
              unit="day"
              labelFormat="DD MMM"
              data={{ someData: "example" }}
              intervalRenderer={({ getIntervalProps, intervalContext }) => {
                return (
                  <div {...getIntervalProps()}>
                    {intervalContext.intervalText}
                  </div>
                );
              }}
            />
          </TimelineHeaders>
        </Timeline>
      </Box>
      <Drawer open={openDrawer} />
    </Box>
  );
};
export default Resource;
