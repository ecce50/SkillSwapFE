/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import "../../style/global.css";
import Navbar from "../components/Navbar";

// Mock authenticateUser function for demonstration purposes
const authenticateUser = async () => {
  // Your authentication logic goes here
  // For example, you might make an API request to check if the user is authenticated
  // You can return a Promise that resolves when the authentication is successful
  return new Promise((resolve, reject) => {
    // Your authentication logic goes here
    // For example, check if the user has a valid session or token
    const isAuthenticated = /* your authentication check here */ true;

    if (isAuthenticated) {
      resolve();
    } else {
      reject(new Error("User authentication failed"));
    }
  });
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5005/auth/login", {
        email,
        password,
      });

      // Ensure the token is received and stored
      localStorage.setItem("authToken", data.token);

      // Make sure you await the authenticateUser as it takes time
      await authenticateUser();

      // Retrieve the token before making a request
      const storedToken = localStorage.getItem("authToken");

      // Include the token in the Authorization header
      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };

      // Example request to a protected route
      const response = await axios.get("http://localhost:5005/auth/verify", {
        headers,
      });

      // Use navigate instead of history.push
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(err.response.data.errorMessage);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
}

export default Login;
