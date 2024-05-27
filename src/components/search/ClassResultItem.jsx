import React from "react";
import { Link } from "react-router-dom";
import "../../../style/search-results.css";

const ClassResultItem = ({ result }) => {
  console.log("Rendering ClassResultItem with result:", result);
  console.log("Class Result Item SkillId: ", result.skillId);
  const idAsString = result._id.toString();
  console.log("This is the id as a string: ", idAsString);
  return (
    <div id={idAsString} className="class-result-item">
      <Link to={`/skill-detail/${result.skillId}#${idAsString}`}>
        <h2>class- {result.title}</h2>
      </Link>
      <p>{result.description}</p>
      {/* Add more Class-specific details or styling as needed */}
    </div>
  );
};

export default ClassResultItem;
