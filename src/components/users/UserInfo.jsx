import React, { useState, useContext } from "react";
import axios from "axios";
import UserImage from "./UserImage";
import { AuthContext } from "../../context/Auth.context";
import { BACKEND_URL } from "../../config/config.index.js";
import ImageDisplay from "../../utils/ImageDisplay.jsx";
import "../../../style/user-info.css";

function UserInfo() {
  const { user, setUser } = useContext(AuthContext);
  const [newUserData, setNewUserData] = useState({
    firstname: user ? user.firstname : "",
    email: user ? user.email : "",
    userImage: user ? user.profileImage : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  return (
    <div className="user-info-container">
    </div>
  );
}

export default UserInfo;
