// SearchResults.jsx
import React from "react";
import SearchBar from "../components/search/SearchBar";
import SearchResultsList from "../components/search/SearchResultsList";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const navigate = useNavigate();

  const handleNewSearch = async (newQuery) => {
    try {
      console.log("Handling new search in SearchResults:", newQuery);

      // Make your API call to get search results using axios
      const response = await axios.get(`http://localhost:5173/search`, {
        params: { title: newQuery },
      });
      const data = response.data;

      // Navigate to the SearchResultsList page with the search results in the state
      navigate("/search-results", { state: { results: data } });
    } catch (error) {
      console.error("Error handling new search:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Search Results</h1>
      <SearchBar onSearch={handleNewSearch} />
      {/* No need to pass onSearch prop here */}
      <SearchResultsList />
    </div>
  );
};

export default SearchResults;
