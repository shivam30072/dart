import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUser(userDetails?.user);
    setToken(userDetails?.token);
    if (!userDetails) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
