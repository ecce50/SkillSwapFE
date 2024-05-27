import React from "react";
import { Link } from "react-router-dom";
import "../../../style/search-results.css";

const SkillResultItem = ({ result }) => {
  console.log("Rendering SkillResultItem with result:", result);
  return (
    <div className="skill-result-item" >
      <Link to={`/skill-detail/${result._id}`}>
        <h2>skill- {result.title}</h2>
      </Link>
      <p>{result.description}</p>
    </div>
  );
};

export default SkillResultItem;
