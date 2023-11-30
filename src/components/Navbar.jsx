import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useLocation } from "react-router-dom";
import navBurger from "../assets/navBurger.png";
import navLogo from "../assets/navLogo.png";
import SearchBar from "./search/SearchBar"; // Make sure you are importing it correctly

function Navbar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleSearch = (title, results) => {
    // Handle search results if needed
    console.log("Search results:", title, results);
  };

  return (
    <nav>
      <div className="navBurger">
        <img src={navBurger} alt="hamburger menu" />
      </div>

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
}

export default Navbar;
