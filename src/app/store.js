import {configureStore} from "@reduxjs/toolkit";
import taskManagementReducer from "../features/taskManagement/taskManagementSlice";



export const store = configureStore({
    reducer: taskManagementReducer,
})