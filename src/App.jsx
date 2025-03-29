import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import {
  setLocalStorageData,
  getLocalStorageTaskData,
} from "./components/LocalStorage";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState(() => getLocalStorageTaskData());
  setLocalStorageData(tasks);

  const addTask = (task) => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const taskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const editTask = (id, newText) => {
    if (!newText.trim()) return;
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  return (
    <>
      <Container sx={{ border: 1, bgcolor: "black", mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
          Task Management App
        </Typography>
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          deleteTask={deleteTask}
          taskStatus={taskStatus}
          editTask={editTask}
        />
      </Container>
    </>
  );
}

export default App;
