/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  //this is how we grab things from the context
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5005/auth/login", {
        email,
        password,
      });
      console.log("here is the Login response", data);
      localStorage.setItem("authToken", data.token);

      //Make sure you await the authenticate User as it takes time and you cant access the private route until its finished
      await authenticateUser();
      nav("/profile");
      
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.errorMessage);
    }
  };
  return (
    <div>
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