import { createSlice, nanoid } from "@reduxjs/toolkit";

// The initial state of the taskManagement slice.
// The tasks array is initialized with the tasks stored in the local storage or an empty array.
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const initialState = {
  tasks: tasks || [],
};

// Created a taskManagement slice using the createSlice function from Redux Toolkit.
// The slice has the name taskManagement and the initial state defined above.
// The slice has three reducers: addTask, removeTask, and updateTask.

export const taskManagementSlice = createSlice({
  name: "taskManagement",
  initialState,
  reducers: {
    // The addTask reducer adds a new task to the tasks array.
    // The payload for this reducer is an object containing the title, description, and dueDate of the task.
    // The new task is created with a unique id using the nanoid function from Redux Toolkit.
    // The new task is added to the tasks array, and the updated tasks array is stored in the local storage.
  
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
    // The removeTask reducer removes a task from the tasks array.
    // The payload for this reducer is an object containing the id of the task to be removed.
    // The task with the specified id is filtered out from the tasks array, and the updated tasks array is stored in the local storage.
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    // The updateTask reducer updates the details of a task in the tasks array.
    // The payload for this reducer is an object containing the id, title, description, dueDate, and status of the task to be updated.
    // The task with the specified id is found in the tasks array, and its details are updated with the new values.
    // The updated tasks array is stored in the local storage.

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
    // The updateStatus reducer updates the status of a task in the tasks array.
    // The payload for this reducer is an object containing the taskId and the newStatus of the task.
    // The task with the specified taskId is found in the tasks array, and its status is updated with the newStatus.
    // The updated tasks array is stored in the local storage.

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

// Export the addTask, removeTask, and updateTask reducers from the taskManagement slice.
// These reducers will be used to update the tasks array in the Redux store.
export const { addTask, removeTask, updateTask, updateStatus } = taskManagementSlice.actions;

// Export the taskManagement slice reducer.
export default taskManagementSlice.reducer;
