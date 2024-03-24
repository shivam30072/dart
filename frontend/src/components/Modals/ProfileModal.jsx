import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { UserState } from "../../context/authprovider";

const ProfileModal = ({ open, handleClose }) => {
  const { user } = UserState();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"PROFILE"}</DialogTitle>
      <DialogContent>
        <Box display={"flex"} gap={"8px"}>
          <Typography color={"#3c3c3c"}>Name:</Typography>
          <Typography fontWeight={700} textTransform={"capitalize"}>
            {user?.name}
          </Typography>
        </Box>
        <Box display={"flex"} gap={"8px"} mt={2}>
          <Typography color={"#3c3c3c"}>Email:</Typography>
          <Typography fontWeight={700}>{user?.email}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "12px 16px" }}>
        <Button
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            borderRadius: "4px",
            padding: "8px 12px",
            "&:hover": {
              bgcolor: "#3b40d5",
              color: "#fff",
            },
          }}
          onClick={handleClose}
          autoFocus
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModal;
