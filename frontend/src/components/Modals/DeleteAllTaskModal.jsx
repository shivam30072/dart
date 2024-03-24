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
import { UserState } from "../../context/authprovider";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";
import axios from "axios";

const DeleteAllTaskModal = ({ open, handleClose, deleteTasks, setAllTask }) => {
  const { token } = UserState();

  const handleDeleteAllTask = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: deleteTasks,
      };
      console.log("sss", deleteTasks);
      const { data } = await axios.delete(`${BASE_URL}/task/`, config);
      if (data?.success) {
        setAllTask((prev) => {
          const updatedTasks = prev.filter(
            (task) => !deleteTasks.includes(task._id)
          );
          return updatedTasks;
        });
        toast.success(data?.message);
        handleClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"DELETE ALL"}</DialogTitle>
      <DialogContent>
        <Box display={"flex"} gap={"8px"}>
          <Typography color={"#3c3c3c"}>
            Are you really sure you want to delete all chosen tasks?
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
          onClick={handleDeleteAllTask}
          autoFocus
        >
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAllTaskModal;
