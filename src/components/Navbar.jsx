import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useLocation } from "react-router-dom";
import SearchBar from "./search/SearchBar"; // Make sure you are importing it correctly
import HamburgerMenu from "./HamburgerMenu";
import "../../style/navbar.css";

const Navbar = ({ isHomePage, handleSearch }) => {
  return (
    <nav>
      <HamburgerMenu />

      {!isHomePage && (
        <Link to="/">
          <div>
       
          </div>
        </Link>
      )}

      <SearchBar onSearch={handleSearch} isNavbar />
    </nav>
  );
};


export default Navbar;
