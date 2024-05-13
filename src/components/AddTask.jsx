import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/taskManagement/taskManagementSlice";
import { Button, Modal, FormControl, TextField, Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const AddTask = ({ open, handleClose, task }) => {
  const [input, setInput] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (task) {
      setInput(task);
    } else {
      setInput({
        id: "",
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
      });
    }
  }, [task]);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setInput({ ...input, dueDate: newDate.toISOString() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.title || !input.description) {
      alert("Please fill in all fields");
      return;
    }

    if (!input.dueDate) {
      input.dueDate = dayjs().toISOString();
    }

    if (task) {
      dispatch(updateTask(input));
    } else {
      dispatch(addTask(input));
    }

    setInput({
      title: "",
      description: "",
      dueDate: "",
    });

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} disablePortal>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
          border: "2px solid background.paper ",
          bgcolor: "background.paper",
        }}
      >
        <h2>{task ? "Edit Task" : "Add Task"}</h2>

        <FormControl fullWidth>
          <TextField
            name="title"
            label="Title"
            value={input.title}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={input.description}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
          <DateTimePicker
            label="Due Date"
            value={dayjs(input.dueDate)}
            onChange={handleDateChange}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ marginTop: "10px" }}
          >
            {task ? "Update Task" : "Add Task"}
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default AddTask;
