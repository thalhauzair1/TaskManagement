import { configureStore } from "@reduxjs/toolkit";
import taskManagementReducer from "../features/taskManagement/taskManagementSlice";

export const store = configureStore({
  reducer: taskManagementReducer,
});

//  Create a store using the configureStore function from the @reduxjs/toolkit package.
// Pass the taskManagementReducer as the reducer to the store.
// Export the store.