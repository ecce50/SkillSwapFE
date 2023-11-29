// SearchResults.jsx
import React from "react";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultsList";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();

  const handleNewSearch = async (newQuery) => {
    try {
      console.log("Handling new search in SearchResults:", newQuery);

      // Make your API call to get search results
      const response = await fetch(
        `http://localhost:5173/search?title=${newQuery}`
      );
      const data = await response.json();

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
