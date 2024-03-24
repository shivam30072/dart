import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddTask from "../../components/Addtask/AddTask";
import axios from "axios";
import { UserState } from "../../context/authprovider";
import SingleTask from "../../components/SingleTask";
import AddtaskModal from "../../components/Modals/AddtaskModal";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";

const Home = () => {
  const { token } = UserState();
  const [allTask, setAllTask] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [taskId, setTaskId] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [deleteTasks, setDeleteTasks] = useState([]);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setTaskId("");
    setEditDescription("");
    setEditTitle("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${BASE_URL}/task`, config);
        setAllTask(data?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${BASE_URL}/task/${id}`, config);
      if (data?.success) {
        const filteredTask = allTask.filter((item) => item?._id !== id);
        setAllTask(filteredTask);
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleGetProductById = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/task/${id}`, config);
      if (data?.success) {
        setTaskId(id);
        setEditTitle(data?.data?.title);
        setEditDescription(data?.data?.description);
        handleClickOpen();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <Box>
      <Navbar />
      <Container>
        <Box mt={"24px"}>
          <AddTask
            handleOpen={handleClickOpen}
            deleteTasks={deleteTasks}
            setAllTask={setAllTask}
          />
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={"12px"} mt={"24px"}>
          {allTask.map((item) => (
            <SingleTask
              key={item?._id}
              item={item}
              handleDelete={handleDeleteTask}
              handleGetProductById={handleGetProductById}
              setDeleteTasks={setDeleteTasks}
            />
          ))}
        </Box>
      </Container>
      <AddtaskModal
        open={openModal}
        handleClose={handleClose}
        allTask={allTask}
        setAllTask={setAllTask}
        taskId={taskId}
        editTitle={editTitle}
        editDescription={editDescription}
      />
    </Box>
  );
};

export default Home;
