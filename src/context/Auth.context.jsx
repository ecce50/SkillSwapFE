/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set the default authorization header for all axios requests
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("authToken")}`;

  const authenticateUser = async () => {
    const tokenInStorage = localStorage.getItem("authToken");

    if (tokenInStorage) {
      try {
        const { data } = await axios.get("http://localhost:5005/auth/verify");
        const { currentUser } = data;
        setUser(currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error in authenticateUser:", err);

        if (err.response) {
          // Check for specific error conditions
          if (err.response.status === 401) {
            console.warn(
              "Token verification failed (401 Unauthorized):",
              err.response.data
            );
          } else if (err.response.status === 500) {
            console.error(
              "Internal server error during token verification:",
              err.response.data
            );
          }
        }

        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };


  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticateUser, user, setUser, isLoading, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
