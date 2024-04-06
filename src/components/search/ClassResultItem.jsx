import React from "react";
import { Link } from "react-router-dom";

const ClassResultItem = ({ result }) => {
  console.log("Rendering ClassResultItem with result:", result);
  console.log("Class Result Item SkillId: ", result.skillId);
  const idAsString = result._id.toString();
  console.log("This is the id as a string: ", idAsString);
  return (
    <div id={idAsString}>
      <Link to={`/skill-detail/${result.skillId}#${idAsString}`}>
        <h2 style={{ color: "blue" }}>{result.title}</h2>
      </Link>
      <p>{result.description}</p>
      {/* Add more Class-specific details or styling as needed */}
    </div>
  );
};

export default ClassResultItem;
