import React from "react";
import { Grid, Typography, Paper, useTheme } from "@mui/material";
import Tasks from "./Tasks";

// Create a TaskColumn component
const TaskColumn = ({ title, status }) => {
  const theme = useTheme();
  const columnColor = theme.palette.columns[status.toLowerCase()];

  // Return a Grid component with a Paper component containing the title and a Tasks component
  return (
    <Grid
      item
      xs={12}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
      sx={{
        borderRadius: "10px",
        padding: "1.5rem",
        backgroundColor: columnColor || "#f9f9f9", // Fallback to a default color if status color is not found
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",
      }}
    >
     <Paper
  sx={{
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#f9f9f9", // Background color
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center", // Center align text
  }}
>
  <Typography variant="h2">{title}</Typography>
</Paper>
      <Tasks
        status={status}
        sx={{ overflowY: "auto", width: "100%" }} // Adjust width to fill the container
      />
    </Grid>
  );
};

export default TaskColumn;
