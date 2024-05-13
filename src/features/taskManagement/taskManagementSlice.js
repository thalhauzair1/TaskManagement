import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const initialState = {
  tasks: tasks || [],
};

export const taskManagementSlice = createSlice({
  name: "taskManagement",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        status: "Pending",
      };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const { id, title, description, dueDate, status } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.title = title;
        taskToUpdate.description = description;
        taskToUpdate.dueDate = dueDate;
        taskToUpdate.status = status;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, removeTask, updateTask, updateStatus } = taskManagementSlice.actions;

export default taskManagementSlice.reducer;
