import React, { useState } from "react";
import { Card, CardActions, CardContent, CardHeader, Chip, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { updateStatus } from "../features/taskManagement/taskManagementSlice";
import DeleteModal from "./DeleteModal";
import { removeTask } from "../features/taskManagement/taskManagementSlice";
import AddTask from "./AddTask";

const TaskCard = ({ task }) => {
  // get the dispatch function from the useDispatch hook
  const dispatch = useDispatch();
  // create a state to store the expanded state of the card
  const [isExpanded, setIsExpanded] = useState(false);
  // create a state to store the open state of the delete modal 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // create a state to store the open state of the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 // handle the status change event
  const handleStatusChange = (newStatus) => {
    dispatch(updateStatus({ taskId: task.id, newStatus }));
  };
  
  // toggle the expanded state of the card
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  // handle the arrow click event
  const handleArrowClick = (newStatus) => (e) => {
    e.stopPropagation();
    handleStatusChange(newStatus);
  };
  // handle the edit click event
  const handleEditClick = (e) => {
    console.log(task.id); 
    setIsEditModalOpen(true);
  };
  // handle the delete click event
  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    setIsDeleteModalOpen(true);

  };
  // handle the delete event
  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    dispatch(removeTask({ id: task.id }));
  }

  return (
    // create a card to display the task details
    <div>
      <Card
        sx={{
          width: 250,
          display: "flex",
          flexDirection: "column",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
          cursor: "pointer",
        }}
        onClick={toggleExpand}
      >
        <CardHeader
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <ArrowBackIcon
                onClick={handleArrowClick(getPreviousStatus(task.status))}
                sx={{ cursor: task.status === "Pending" ? "not-allowed" : "pointer", opacity: task.status === "Pending" ? 0.5 : 1 }}
              />
              <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: "center" }}>{task.title}</Typography>
              <ArrowForwardIcon
                onClick={handleArrowClick(getNextStatus(task.status))}
                sx={{ cursor: task.status === "Completed" ? "not-allowed" : "pointer", opacity: task.status === "Completed" ? 0.5 : 1 }}
              />
            </div>
          }
          sx={{ textAlign: "left", borderBottom: "1px solid #e0e0e0",backgroundColor: "#f5f5f5" }}
        />
        {/*  check if the card is expanded
        if expanded, display the description  due date and status */}
        {isExpanded && (
          <>
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", textAlign: "left" }}>
              <Typography variant="body2" sx={{ marginBottom: "10px" }}>{task.description}</Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>{task.dueDate}</Typography>
            </CardContent>
            <CardActions sx={{ borderTop: "1px solid #e0e0e0", padding: "10px", backgroundColor:"#f5f5f5" }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Chip
                  
                    label={task.status}
                    color={getStatusColor(task.status)}
                    sx={{
                      backgroundColor: getStatusBackgroundColor(task.status),
                      color: "#fff",
                      borderRadius: "4px",
                      marginRight: "5px",
                      padding: "4px 8px",
                      cursor: "default",
                    }}
                  />
                </Grid>
                <Grid item>
                  <EditIcon onClick={handleEditClick} sx={{ cursor: "pointer", marginRight: "5px" }} />
                  <DeleteIcon onClick={handleDeleteClick} sx={{ cursor: "pointer" }} />
                </Grid>
              </Grid>
            </CardActions>
          </>
        )}
      </Card>
      {/* open the delete modal */}
      <DeleteModal open={isDeleteModalOpen} handleClose={() => setIsDeleteModalOpen(false)} handleDelete={handleDelete} />
      {/* open the edit modal */}
      <AddTask open={isEditModalOpen} handleClose={() => setIsEditModalOpen(false)} task={task} />
    </div>

    
  );
};

export default TaskCard;

const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case "Pending":
      return "InProgress";
    case "InProgress":
      return "Completed";
    default:
      return currentStatus;
  }
};

const getPreviousStatus = (currentStatus) => {
  switch (currentStatus) {
    case "Completed":
      return "InProgress";
    case "InProgress":
      return "Pending";
    default:
      return currentStatus;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "default";
    case "InProgress":
      return "info";
    case "Completed":
      return "success";
    default:
      return "default";
  }
};

const getStatusBackgroundColor = (status) => {
  switch (status) {
    case "Pending":
      return "#f44336"; // Red
    case "InProgress":
      return "#ff9800"; // Orange
    case "Completed":
      return "#4caf50"; // Green
    default:
      return "#757575"; // Gray
  }
};
