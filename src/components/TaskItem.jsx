import { useState } from "react";
import {
  ListItem,
  Checkbox,
  TextField,
  IconButton,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskItem = ({ task, taskStatus, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id, disabled: isEditing });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setNewText(task.text);
    setIsEditing(false);
  };

  return (
    <Container
      ref={setNodeRef}
      style={style}
      sx={{
        display: "flex",
        border: 1,
        bgcolor: "grey",
        "&:hover": {
          bgcolor: "primary.dark",
        },
      }}
    >
      <ListItem
        sx={{
          display: "flex",
          p: 0,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            p: 2,
          }}
        >
          <Checkbox
            sx={{
              ml: -3,
            }}
            checked={task.completed}
            onChange={() => taskStatus(task.id)}
          />
          {isEditing ? (
            <TextField
              label="Task Name"
              value={newText.trim() ?? task.text}
              variant="outlined"
              onChange={(e) => setNewText(e.target.value)}
            />
          ) : (
            <div
              {...attributes}
              {...listeners}
              style={{
                flex: 2,
                cursor: "grab",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">
                <span
                  style={{
                    flex: 1,
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              </Typography>
            </div>
          )}
        </Box>
        <Box>
          {isEditing ? (
            <>
              <IconButton
                color="success"
                onClick={handleSave}
                disabled={!newText?.trim()}
              >
                <SaveIcon />
              </IconButton>
              <IconButton color="error" onClick={handleCancel}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                variant="contained"
                color="success"
                sx={{
                  mr: -1,
                }}
                onClick={handleEdit}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant="contained"
                onClick={() => {
                  deleteTask(task.id);
                }}
                sx={{
                  mr: -2.5,
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </ListItem>
    </Container>
  );
};
