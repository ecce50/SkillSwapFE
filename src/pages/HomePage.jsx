
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import "/style/global.css";
import { Link } from "react-router-dom";




function HomePage() {
  return (
    <div>
      <Navbar />
      <Link to="/profile">Profile</Link>
      <Link to="/login">Log in</Link>
      <Link to="/search-results">Search results</Link>
      <h1>Skill Ƨwap</h1>

      <SearchBar />
    </div>
  );
}

export default HomePage;
