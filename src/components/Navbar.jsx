import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useLocation } from "react-router-dom";
import navBurger from "../assets/navBurger.png";
import navLogo from "../assets/navLogo.png";
import SearchBar from "./search/SearchBar"; // Make sure you are importing it correctly
import HamburgerMenu from "./HamburgerMenu";
import "../../style/Navbar.css"
import "../../style/global.css";

const Navbar = ({ isHomePage, handleSearch }) => {
  return (
    <nav className="navbar-container">
      <HamburgerMenu />

      {!isHomePage && (
        <Link to="/">
          <div className="navLogo">
            <img src={navLogo} alt="navbar logo" />
          </div>
        </Link>
      )}

      <SearchBar onSearch={handleSearch} isNavbar />
    </nav>
  );
};


export default Navbar;
