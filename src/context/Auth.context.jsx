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
        setUser(data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("error on the authenticate user function", err);
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
