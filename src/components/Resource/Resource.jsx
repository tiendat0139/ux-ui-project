import { useState, useEffect } from "react";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  CustomMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./index.scss";

const Resource = () => {
  const defaultTimeStart = moment().add(-3, "day");
  const defaultTimeEnd = moment().add(3, "day");
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/tasks?workspace=1");
      const data = await res.json();
      const newFormat = data.map((item) => {
        return {
          ...item,
          start: moment(item.start),
          end: moment(item.end),
          canChangeGroup: true,
          canMove: true,
          itemProps: {
            style: {
              backgroundColor: "#039be5",
              border: "none",
            },
          },
        };
      });
      setTasks(newFormat);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/workspaces/1");
      const data = await res.json();
      setMembers(data.membersDetail);
    };
    fetchData();
  }, []);

  const keys = {
    groupIdKey: "id",
    groupTitleKey: "name",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "name",
    itemDivTitleKey: "title",
    itemGroupKey: "assignee",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
  };

  return (
    <Timeline
      groups={members}
      items={tasks}
      itemsSorted
      keys={keys}
      itemTouchSendsClick={false}
      stackItems
      lineHeight={80}
      itemHeightRatio={0.75}
      showCursorLine
      canMove={false}
      canResize={false}
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
    >
      <CustomMarker date={Date.now()}>
        {/* custom renderer for this marker */}
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
              <div {...getIntervalProps()}>{intervalContext.intervalText}</div>
            );
          }}
        />
      </TimelineHeaders>
    </Timeline>
  );
};
export default Resource;
