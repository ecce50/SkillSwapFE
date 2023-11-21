import {useContext} from "react";
import {AuthContext} from "../context/Auth.context";
import {useNavigate} from "react-router-dom";

function Logout() {

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate ();

    const logoutUser = () => {
        // Clear user data upon logout
        setUser(null);
        localStorage.removeItem('authToken'); // Remove token from localStorage

        navigate ("/")
      };      

  return (
    <button onClick={logoutUser}>
      Logout
    </button>
  )
}

export default Logout