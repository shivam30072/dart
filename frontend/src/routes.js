import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Tasks from "./pages/SearchTask/Tasks";

export const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: "NOT FOUND",
  },
];
export const privateRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "*",
    element: "NOT FOUND",
  },
];
