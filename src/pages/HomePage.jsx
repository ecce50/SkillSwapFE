import SearchBar from "../components/search/SearchBar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import "/style/global.css";



function HomePage() {
  return (
    <div>
      <Navbar />
      <Link to="/profile">Profile</Link>
      <Link to="/login">Log in</Link>
      <Link to="/search-results">Search results</Link>
      <h1>Skill Ƨwap</h1>

      <SearchBar />

      <ImageUpload/>
    </div>
  );
}

export default HomePage;
