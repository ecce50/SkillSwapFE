/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useLocation } from "react-router-dom";
import "/style/navbar.css";
import "/style/global.css";
import navBurger from "../assets/navBurger.png";
import navLogo from "../assets/navLogo.png";
import navSearch from "../assets/navSearch.png";
import NavbarSearch from "./NavbarSearch";

function Navbar() {

    const { user } = useContext(AuthContext);
    const location = useLocation();

    const isHomePage = location.pathname === "/";

    return (
      <nav>
        <div className="navBurger">
                <img src={navBurger} alt="hamburger menu"/>
        </div>

        {!isHomePage && (
          <Link to="/">
            <div className="navLogo">
              <img src={navLogo} alt="navbar logo"/>
            </div>
          </Link>
        )}

            {/* <div className="navSearch"></div> */}
            <NavbarSearch/>
            {/* <img src={navSearch} alt="search icon" /> */}
      </nav>
    );
}

export default Navbar;