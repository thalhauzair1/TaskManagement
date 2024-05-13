import React, { useState } from "react";
import { Card, CardActions, CardContent, CardHeader, Chip, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { updateStatus } from "../features/taskManagement/taskManagementSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (newStatus) => {
    dispatch(updateStatus({ taskId: task.id, newStatus }));
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleArrowClick = (newStatus) => (e) => {
    e.stopPropagation(); // Prevent card from expanding when clicking arrows
    handleStatusChange(newStatus);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent card from expanding when clicking edit icon
    console.log(task.id); // Implement your edit logic here
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent card from expanding when clicking delete icon
    console.log(task.id); // Implement your delete logic here
  };

  return (
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
