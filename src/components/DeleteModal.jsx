import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

const DeleteModal = ({open, handleClose, handleDelete}) => {
    // Create a modal to confirm the deletion of a task
  return (
    <Modal open={open} onClose={handleClose} >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Are you sure you want to delete this task?
        </Typography>
        <Button variant="contained" color="error" sx={{ marginRight: 1 }} onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Modal>
  )
}

export default DeleteModal
