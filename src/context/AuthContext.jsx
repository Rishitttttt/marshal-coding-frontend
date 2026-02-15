import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../api/auth.api.js";
import { connectSocket, disconnectSocket } from "../socket/socket.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      console.log("Found token + userId, connecting socket...");
      setIsAuthenticated(true);
      connectSocket(token);
    }
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);

    console.log("Login response:", res);

    // 🔥 STORE BOTH
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("userId", res.user.id);

    setIsAuthenticated(true);

    connectSocket(res.accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId"); // 🔥 also remove this
    disconnectSocket();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
