import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Box, useTheme } from "@mui/material";
import ColumnTitle from "./ColumnTitle";
import TaskCard from "./TaskCard";

const Kanban = () => {
  const { palette } = useTheme();
  const [columns, setColumns] = useState({
    0: {
      name: "Open",
      tasks: [],
    },
    1: {
      name: "In Progress",
      tasks: [],
    },
    2: {
      name: "Resolve",
      tasks: [],
    },
    3: {
      name: "Close",
      tasks: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://workmate.onrender.com/tasks?assignee.id=1&_sort=start&_order=asc");
      const data = await res.json();
      const tasks = data
      const open = tasks.filter(task => task.status === "Open")
      open.sort((a,b) => Date.parse(a.start.replace("T", " ")) < Date.parse(b.start.replace("T", " ")))
      const inProgress = tasks.filter(task => task.status === "In progress")
      const resolve = tasks.filter(task => task.status === "Resolve")
      const close = tasks.filter(task => task.status === "Close")


      setColumns({
        0: { name: "Open", tasks: open },
        1: { name: "In Progress", tasks: inProgress },
        2: { name: "Resolve", tasks: resolve },
        3: { name: "Close", tasks: close },
      });
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId != destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [draggedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, draggedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      });
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" gap="2rem">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <Box
              key={columnId}
              display="flex"
              flexDirection="column"
              flex="1 0 0"
            >
              <ColumnTitle title={column.name} number={column.tasks.length} />
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      bgcolor: snapshot.isDraggingOver
                        ? palette.primary.light
                        : "#F4F6F8",
                      p: "0.8rem 1.6rem",
                      maxHeight: "80vh",
                      minHeight: "80vh",
                      overflowY: "scroll"
                    }}
                    display="flex"
                    flexDirection="column"
                  >
                    {column.tasks?.map((task, index) => {
                      return (
                        <Draggable
                          draggableId={task.id}
                          key={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                title={task.name}
                                des={task.des}
                                due={task.end.replace("T", " ")}
                                priority={task.priority}
                                workspaceId={task.workspace}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          );
        })}
      </DragDropContext>
    </Box>
  );
};


export default Kanban;
