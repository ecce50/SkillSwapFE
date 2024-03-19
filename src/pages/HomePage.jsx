import SearchBar from "../components/search/SearchBar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import SkillSwapLogo from "../assets/templogo_1024x950.png";
import "../../style/homepage.css";


function HomePage() {
  return (
    <>
      <Navbar />
      <div className="logo-search">
        <div className="logo">
          <img src={SkillSwapLogo} alt="Skill Swap Logo" />
        </div>
        <div className="search">
          <SearchBar />
        </div>
      </div>
    </>
  );
}

export default HomePage;
