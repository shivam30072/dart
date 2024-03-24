import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

const DeleteModal = ({ open, handleClose, handleDeleteItem }) => {
  const deleteItem = () => {
    handleDeleteItem();
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"DELETE"}</DialogTitle>
      <DialogContent>
        <Box display={"flex"} gap={"8px"}>
          <Typography color={"#3c3c3c"}>
            Are you really sure you want to delete this task?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "12px 16px" }}>
        <Button
          sx={{
            bgcolor: "#e50000",
            color: "#fff",
            borderRadius: "4px",
            padding: "8px 12px",
            "&:hover": {
              bgcolor: "#e50000",
              color: "#fff",
            },
          }}
          onClick={deleteItem}
          autoFocus
        >
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
