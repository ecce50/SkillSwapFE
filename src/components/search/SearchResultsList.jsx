// SearchResultsList.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import SkillResultItem from "./SkillResultItem";
import ClassResultItem from "./ClassResultItem";

const SearchResultsList = ({onSearch}) => {
  // Use the useLocation hook from react-router-dom to get the location object
  const location = useLocation();
  // Access the state object from the location
  const results = location.state?.results || [];
  //const [filteredResults, setFilteredResults] = useState(results);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("Results to render:", results);


  useEffect(() => {
    const lowerCasedTerm = searchTerm.toLowerCase().trim();
    console.log("Lowercased Term:", lowerCasedTerm);


    const filtered = results.filter((result) =>
    result.title.toLowerCase().trim().startsWith(lowerCasedTerm));

    console.log("Filtered Result:", filtered);

    setFilteredResults(filtered);

    if (onSearch) {
      onSearch(lowerCasedTerm, filtered);
    }
  }, [searchTerm, results, onSearch]);


  return (
    <div>
      {/* Render your search results here */}
      {filteredResults.map((result) => (
        <div key={result._id}>
          {/*<Link to={`/details/${result._id}`}>*/}
          {result.source === "skill" && result.title && <SkillResultItem result={result} />}
          {result.source === "class" && result.title && <ClassResultItem result={result} />}
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
