import React from "react";
import { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import AddTask from "./components/AddTask";
import TaskColumn from "./components/TaskColumn";
import Header from "./components/Header";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2", // Blue color
      },
      background: {
        default: "#f0f0f0", // Light gray background
      },
      columns: {
        pending: "#ffcc80",
        inprogress: "#81c784",
        completed: "#7986cb",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 500,
      },
      h3: {
        fontSize: "1.8rem",
        fontWeight: 500,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header
            openModal={openModal}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
              flexDirection: "column",
              gap: "1rem",
              width: "50%",
              textAlign: "center",
              margin: "auto",
            }}
          >
            <Typography variant="h2">Welcome to Task Management App</Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "center", marginBottom: "1rem" }}
            >
              To change the status of a task, simply click on the left or right
              arrow buttons on each task card. Click the left arrow to move a
              task to the previous status, and click the right arrow to move it
              to the next status.And also to get more details about a task, click anywhere on the task card.

            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="flex-start"
              gap={10}
              sx={{
                borderRadius: 5,
                overflowY: "auto",
                scrollBehavior: "smooth", // To enable smooth scrolling
                padding: "2rem",
                maxWidth: "80vw",
                maxHeight: "80vh",
              }}
            >
              <Grid item>
                <TaskColumn title="Pending" status="Pending" />
              </Grid>
              <Grid item>
                <TaskColumn title="InProgress" status="InProgress" />
              </Grid>
              <Grid item>
                <TaskColumn title="Completed" status="Completed" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
