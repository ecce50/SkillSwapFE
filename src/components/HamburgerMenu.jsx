import React from "react";
import "../../style/HamburgerMenu.css";
import Logout from "./auth/Logout";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useState } from "react";

import "/style/global.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(AuthContext).user;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
        <button className="menu-button" onClick={toggleMenu}>
          ☰ Menu
        </button>

        <div className={`menu-links ${isOpen ? "open" : ""}`}>
          <div className="user-menu">
            <button className="user-button">
              {user ? `Welcome, ${user.email}` : "User ▼"}
            </button>
          </div>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          {user ? null : <Link to="/login">Log in</Link>}
          {user ? null : <Link to="/signup">Sign up</Link>}
          {user && <Logout />}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
