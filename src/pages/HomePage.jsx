
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import "/style/global.css";


function HomePage() {
  return (
    <div>
      <Navbar />
      <h1>Skill Ƨwap</h1>

      <h4>Find Your Next Skill</h4>
      <SearchBar/>

      <h4>Want to Teach Others?</h4>
      <a href="/profile">Get Started!</a>

    </div>

  );
}

export default HomePage;
