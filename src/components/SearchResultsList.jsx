// SearchResultsList.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import SkillResultItem from "../components/SkillResultItem";
import ClassResultItem from "../components/ClassResultItem";

const SearchResultsList = () => {
  // Use the useLocation hook from react-router-dom to get the location object
  const location = useLocation();
  // Access the state object from the location
  const results = location.state?.results || [];

  console.log("Results to render:", results);

  return (
    <div>
      {/* Render your search results here */}
      {results.map((result) => (
        <div key={result._id}>
          {result.source === "skill" && <SkillResultItem result={result} />}
          {result.source === "class" && <ClassResultItem result={result} />}
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
