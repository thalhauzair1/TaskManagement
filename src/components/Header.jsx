import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTask from "./AddTask";

// creating a Header component
const Header = ({ openModal, isModalOpen, closeModal }) => {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "#1976d2", height: "10vh", padding: "0 1rem", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <Grid item>
          <Typography variant="h4" sx={{ color: "#fff" }}>
            Task Management App
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={openModal} sx={{ color: "#fff", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
            <AddIcon fontSize="large" sx={{ borderRadius: "50%", border: "2px solid #fff" }} />
          </IconButton>
          <AddTask open={isModalOpen} handleClose={closeModal} />
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
