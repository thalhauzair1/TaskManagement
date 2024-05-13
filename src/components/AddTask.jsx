import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
} from "../features/taskManagement/taskManagementSlice";
import {
  Button,
  Modal,
  FormControl,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddTask = ({ open, handleClose, task }) => {
  // create a state to store the input values
  const [input, setInput] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  // update the input values when the task prop changes
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
  
  // get the dispatch function from the useDispatch hook
  const dispatch = useDispatch();
  
  // handle the input change event
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    // remove the time part of the date
    newDate = dayjs(newDate).format("YYYY-MM-DD");
      // handle the input change event
    setInput({ ...input, dueDate: newDate });
  };
  // handle the form submit event
  const handleSubmit = (e) => {
    // prevent the default form submission behavior
    e.preventDefault();
    // check if the title, description, and due date are not empty
    if (!input.title || !input.description ) {
      alert("Please fill in all fields");
      return;
    }
 // set the due date to the current date if it is not provided
    if (!input.dueDate) {
      input.dueDate = dayjs().toISOString();
    }
    // dispatch the addTask or updateTask action based on the task prop
    if (task) {
      dispatch(updateTask(input));
    } else {
      dispatch(addTask(input));
    }
    // reset the input values
    setInput({
      title: "",
      description: "",
      dueDate: "",
    });

    handleClose();
  };
 
  return (
    // create a modal component to display the form
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
        {/*display the form title based on the task prop */}
        {task ? (
          <Typography variant="h2">Edit Task</Typography>
        ) : (
          <Typography variant="h2">Add Task</Typography>
        )}
        {/* create a form to add or update a task */}
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
          <DatePicker
            label="Due Date"
            value={dayjs(
              input.dueDate ? input.dueDate : new Date().toISOString()
            )}
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
