import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import { updateTask,removeTask } from "../features/taskManagement/taskManagementSlice";

// Create a functional component named Tasks that takes a status prop.
// Inside the component, use the useSelector hook to get the tasks from the Redux store.
// Render a div element that contains all the tasks with the status equal to the status prop.
const Tasks = ({status}) => {
  const tasks = useSelector((state) => state.tasks);
  return (
    <div style={{display:'flex',flexDirection:'column', gap:'2rem'}}>
      {tasks.map((task) => ( task.status === status &&
        <TaskCard key={task.id}  task={task} />
      ))}
    </div>
  );
};

export default Tasks;
