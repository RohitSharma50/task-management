import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
export const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    addTask(task);
    setTask("");
  };
  return (
    <Box
      className="taskform"
      onClick={handleSubmit}
      sx={{ display: "flex", gap: 1, p: 1, bgcolor: "white" }}
    >
      <TextField
        label="Task Name"
        value={task}
        variant="outlined"
        sx={{ display: "flex", bgcolor: "grey" }}
        onChange={(e) => setTask(e.target.value)}
      />

      <Button variant="contained">Add</Button>
    </Box>
  );
};
