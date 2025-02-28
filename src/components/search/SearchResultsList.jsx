// SearchResultsList.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    const lowerCasedTerm = searchTerm.toLowerCase();
    console.log("Lowercased Term:", lowerCasedTerm);


   // const filtered = results.filter((result) =>
   // result.title.toLowerCase().startsWith(lowerCasedTerm));

   const filtered = results.filter((result) => {
    const lowerCasedTitle = result.title.toLowerCase().trim();
    const startsWith = lowerCasedTitle.startsWith(lowerCasedTerm);

    // Log the titles being compared
    console.log(`Comparing "${lowerCasedTitle}" with "${lowerCasedTerm}": ${startsWith}`);

    return startsWith;
  });

    console.log("Filtered Result:", filtered);

    setFilteredResults(filtered);

    if (onSearch) {
      onSearch(lowerCasedTerm, filtered);
    }
  }, [searchTerm, results, onSearch]);

  // A second useEffect to log the state after it's updated
  useEffect(() => {
    console.log("Current search term state:", searchTerm);
  }, [searchTerm]);


  return (
    <div>
      {filteredResults.length === 0 ? (
        <p>Sorry, there are no results. Maybe you can be the first to teach this?</p>
      ) : (
        filteredResults.map((result) => (
          <div key={result._id}>
            {result.objectType === "skill" && result.title && (
              <SkillResultItem result={result} />
            )}
            {result.objectType === "class" && result.title && (
              <ClassResultItem result={result} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResultsList;
