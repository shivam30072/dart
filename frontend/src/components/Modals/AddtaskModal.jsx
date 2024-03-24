import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { UserState } from "../../context/authprovider";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Label = ({ text }) => {
  return (
    <Typography fontSize={"14px"} textAlign={"start"} color={"#3c3c3c"}>
      {text}
    </Typography>
  );
};
const AddtaskModal = ({
  open,
  handleClose,
  setAllTask,
  allTask,
  editTitle,
  taskId,
  editDescription,
}) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const { token } = UserState();

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.warning("Enter all fields");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/task/add`,
        { title, description },
        config
      );

      if (data?.success) {
        setAllTask([data?.data, ...allTask]);
        handleClose();
        setTitle("");
        setDescription("");
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async () => {
    if (!title || !description) {
      toast.warning("Enter all fields");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(
        `${BASE_URL}/task/${taskId}`,
        { title, description },
        config
      );
      if (data?.success) {
        setAllTask((prevTasks) => {
          const updatedTasks = prevTasks.map((task) => {
            if (task._id === data.data._id) {
              return data?.data;
            }
            return task;
          });
          return updatedTasks;
        });
        handleClose();
        setTitle("");
        setDescription("");
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTitle(editTitle);
    setDescription(editDescription);
  }, [taskId]);
  return (
    <Dialog
      fullWidth
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{taskId ? "EDIT TASK" : "ADD TASK"}</DialogTitle>
      <DialogContent>
        {loading && (
          <Box position={"absolute"} top={"50%"} left={"50%"}>
            <CircularProgress />
          </Box>
        )}
        <Box>
          <Label text={"Title"} />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            style={{
              fontSize: "18px",
              borderRadius: "8px",
              padding: "14px 16px",
              width: "100%",
              outline: "none",
              border: "1px solid #c5c6d0",
              marginTop: "4px",
            }}
          />
        </Box>
        <Box mt={"12px"}>
          <Label text={"Description"} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
            rows={4}
            style={{
              resize: "none",
              fontSize: "18px",
              borderRadius: "8px",
              padding: "14px 16px",
              width: "100%",
              outline: "none",
              border: "1px solid #c5c6d0",
              marginTop: "4px",
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button
          sx={{
            bgcolor: "#3b40d5",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 12px",
            "&:hover": {
              bgcolor: "#3b40d5",
              color: "#fff",
            },
          }}
          onClick={taskId ? handleUpdateTask : handleSubmit}
        >
          {taskId ? "SAVE CHANGES" : "SUBMIT"}
        </Button>
        <Button
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderRadius: "8px",
            padding: "6px 8px",
            border: "1px solid #000",
            "&:hover": {
              bgcolor: "#fff",
              color: "#000",
            },
          }}
          onClick={handleClose}
        >
          CANCEl
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddtaskModal;
