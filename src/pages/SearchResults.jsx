// SearchResultsPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  // If there are no results, redirect to the search page
  React.useEffect(() => {
    if (!results) {
      navigate("/");
    }
  }, [results, navigate]);

  return (
    <div>
      <h2>Search Results</h2>
      {results ? (
        // Display the results if available
        results.map((result) => (
          <div key={result._id}>
            <p>{result.title}</p>
            {/* Add more details based on your data structure */}
          </div>
        ))
      ) : (
        // Display a message if there are no results
        <p>No results found. Please perform a search.</p>
      )}
    </div>
  );
}

export default SearchResults;
