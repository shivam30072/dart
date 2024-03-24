import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { UserState } from "../../context/authprovider";
import axios from "axios";
import SingleTask from "../../components/SingleTask";

const Tasks = () => {
  const location = useLocation();
  const { token } = UserState();
  const [foundTasks, setFoundTasks] = useState([]);

  const searchTask = location.search.slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${BASE_URL}/task/search?search=${searchTask}`,
          config
        );
        setFoundTasks(data?.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [searchTask]);

  return (
    <Box>
      <Navbar />
      <Container>
        {foundTasks.length === 0 ? (
          <Box mt={"24px"}>No Tasks Found</Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"12px"}
            mt={"24px"}
          >
            {foundTasks.map((item) => (
              <SingleTask key={item?._id} item={item} found={false} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Tasks;
