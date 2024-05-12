// SearchBar.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style/search-bar.css";
import { BACKEND_URL } from "../../config/config.index.js";

function SearchBar({ onSearch, isNavbar }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleSearch = async (e) => {
    // Ensure the event object is properly received
    e && e.preventDefault();

    try {
      console.log("Title before request:", title);
      const res = await axios.get(
        `${BACKEND_URL}/search?title=${title}`
      );
      console.log("This is the axios get result search skill ", res);

      // Added the following check and call to onSearch prop
      if (onSearch) {
        onSearch(title, res.data);
      }

      // Use navigate to go to the SearchResults page
      navigate("/search-results", { state: { results: res.data } });
    } catch (error) {
      console.error("This is the error", error);
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  if (isNavbar) {
    return (
      <div className="nav-search-bar">
        <label>
          <input
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
        </label>
        <button className="test-button" type="button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    );
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <label>
          <input
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
