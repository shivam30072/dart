import { Box, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../../components/LoginForm";

const img =
  "https://plus.unsplash.com/premium_photo-1669904022334-e40da006a0a3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Login = () => {
  return (
    <Box display={"flex"} minHeight={"100vh"}>
      <Box display={{ xs: "none", md: "flex" }} flex={1}>
        <img
          src={img}
          alt=""
          height={"100%"}
          width={"100%"}
          style={{ backgroundSize: "cover" }}
        />
      </Box>
      <Box display={"flex"} flex={1}>
        <Box
          mt={{ xs: "32px", md: "120px" }}
          mx={{ xs: "20px", md: "100px" }}
          width={"100%"}
        >
          {/* ----------------LOGIN FORM-------------------- */}
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
