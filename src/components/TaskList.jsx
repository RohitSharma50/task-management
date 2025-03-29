import { useState, useEffect } from "react";
import { TaskItem } from "./TaskItem";
import { Filtering } from "./Filtering.jsx";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";

export const TaskList = ({
  tasks,
  setTasks,
  taskStatus,
  editTask,
  deleteTask,
}) => {
  const [sortBy, setSortBy] = useState("default");
  const [filterControl, setFilterControl] = useState([]);

  useEffect(() => {
    let sortedTasks = [...tasks];

    if (sortBy === "status") {
      sortedTasks.sort((a, b) => a.completed - b.completed);
    } else if (sortBy === "id") {
      sortedTasks.sort((a, b) => a.id - b.id);
    } else if (sortBy === "priority") {
      sortedTasks.sort((a, b) => a.completed - b.completed);
      sortedTasks.reverse();
    }
    setFilterControl(sortedTasks);
  }, [sortBy, tasks, setFilterControl]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div>
      <Filtering setSortBy={setSortBy} />

      <ul>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filterControl.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {filterControl
              .slice()
              .reverse()
              .map((task) => (
                <TaskItem
                  sx={{
                    display: "flex",
                    width: "100%",
                    border: 1,
                  }}
                  task={task}
                  key={task.id}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  taskStatus={taskStatus}
                />
              ))}
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
};
