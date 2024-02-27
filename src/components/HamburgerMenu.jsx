// import React from "react";
import Logout from "./auth/Logout";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

import "../../style/hamburger-menu.css";

import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Logout from './Logout';
// import './style/index.css'; // Import your CSS file

const HamburgerMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <div className={`hamburger-menu ${isOpen ? "open" : ""}`} ref={menuRef}>
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
          <Logout />
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;



// const HamburgerMenu = () => {

//   const [isOpen, setIsOpen] = useState(false);
//   const user = useContext(AuthContext).user;

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
//         <button className="menu-button" onClick={toggleMenu}>
//           ☰ Menu
//         </button>

//         <div className={`menu-links ${isOpen ? "open" : ""}`}>
//           <div className="user-menu">
//             <button className="user-button">
//               {user ? `Welcome, ${user.email}` : "User ▼"}
//             </button>
//           </div>
//           <Link to="/">Home</Link>
//           <Link to="/profile">Profile</Link>
//           {user ? null : <Link to="/login">Log in</Link>}
//           {user ? null : <Link to="/signup">Sign up</Link>}
//           <Logout />
//         </div>
//       </div>
//     </>
//   );
// };

// export default HamburgerMenu;
