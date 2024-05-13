import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import { updateTask,removeTask } from "../features/taskManagement/taskManagementSlice";

const Tasks = ({status}) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
    const deleteTask = (id) => {
        console.log(id);
        dispatch(removeTask({ id }));
    };
  return (
    <div style={{display:'flex',flexDirection:'column', gap:'2rem'}}>
      {tasks.map((task) => ( task.status === status &&
        <TaskCard key={task.id}  task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
    </div>
  );
};

export default Tasks;
