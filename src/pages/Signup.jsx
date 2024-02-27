import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import Navbar from "../components/Navbar";
import "../../style/sign-up.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5005/auth/signup", {
        email,
        password,
      });
      console.log("This is the result from the signup route:", res);

      //If signup is successful, go on with the login
      const loginRes = await axios.post("http://localhost:5005/auth/login", {
        email,
        password,
      });

      localStorage.setItem("authToken", loginRes.data.token);
      console.log("This is the result from the login route", loginRes);
        console.log("This is the token in storage", loginRes.data.token);

      await authenticateUser();

      nav("/profile");
    } catch (error) {
      console.error("This is the error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="sign-up-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
