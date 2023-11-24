import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      console.log("Title before request:", title);
      const res = await axios.get(
        `http://localhost:5005/search?title=${title}`
      );
      console.log("This is the axios get result search skill ", res);

      nav("/search-results", { state: { results: res.data } });
    } catch (error) {
      console.error("This is the error", error);
    }
  };
  return (
    <div>
      <h2>SearchBar</h2>
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
