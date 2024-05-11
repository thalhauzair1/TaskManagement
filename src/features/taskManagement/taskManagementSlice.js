import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
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
        status: "open",
      };
      state.tasks.push(newTask);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTask: (state, action) => {
        const { id, title, description, dueDate } = action.payload;
        const taskToUpdate = state.tasks.find(task => task.id === id);
        if (taskToUpdate) {
          taskToUpdate.title = title;
          taskToUpdate.description = description;
          taskToUpdate.dueDate = dueDate;
        }
      },
  },
});


export const { addTask, removeTask, updateTask } = taskManagementSlice.actions;

export default taskManagementSlice.reducer;
