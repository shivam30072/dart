import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Label = ({ text }) => {
  return (
    <Typography fontSize={"14px"} textAlign={"start"} color={"#3c3c3c"}>
      {text}
    </Typography>
  );
};
const LoginForm = () => {
  const [login, setLogin] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000/api/v1";

  const switchToSignUpForm = () => {
    if (login === "login") {
      setLogin("signup");
    } else {
      setLogin("login");
    }
  };

  const handleSubmitForm = () => {
    if (login === "login") {
      if (!email || !password) {
        toast.warning("Enter both fields");
        return;
      }
      submitLoginForm();
    } else {
      if (!email || !password || !name) {
        toast.warning("Enter all fields");
        return;
      }

      submitSignUpForm();
    }
  };

  const submitLoginForm = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/user/login`,
        { email, password },
        config
      );
      localStorage.setItem("userDetails", JSON.stringify(data?.data));
      if (data?.success) {
        toast.success("login Successfull");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const submitSignUpForm = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/user/signup`,
        { name, email, password },
        config
      );
      if (data?.success) {
        toast.success("Account Created");
        setLogin("login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <Typography fontSize={"32px"} letterSpacing={"2.2px"} fontWeight={300}>
        {login === "login" ? "LOGIN" : "SIGN UP"}
      </Typography>

      <Box
        mt={"24px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"16px"}
        //   bgcolor={"red"}
        width={"100%"}
      >
        {login === "signup" && (
          <Box>
            <Label text={"Name"} />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Shivam"
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
        )}
        <Box>
          <Label text={"Email"} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="shivam@gmail.com"
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
        <Box>
          <Label text={"Password"} />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
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
        <Button
          onClick={handleSubmitForm}
          sx={{
            bgcolor: "#3554d1",
            mt: "16px",
            padding: "12px 14px",
            borderRadius: "8px",
            color: "#fff",
            "&:hover": {
              bgcolor: "#3554d1",
              color: "#fff",
            },
          }}
        >
          Submit
        </Button>
        <Box>
          <Typography fontSize={"14px"}>
            Don't have an account?
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={switchToSignUpForm}
            >
              {login === "login" ? "Sign Up" : "Login"}
            </span>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
