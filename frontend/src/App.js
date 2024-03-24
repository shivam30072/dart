import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Box } from "@mui/material";
import { privateRoutes, publicRoutes } from "./routes";
import { useEffect, useState } from "react";
import { UserState } from "./context/authprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { token } = UserState();
  return (
    <>
      <ToastContainer />
      <Routes>
        {token && (
          <>
            {privateRoutes.map((item) => (
              <Route key={item.path} path={item.path} element={item.element} />
            ))}
          </>
        )}

        {publicRoutes.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
