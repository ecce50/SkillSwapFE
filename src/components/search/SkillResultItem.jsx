import React from "react";
import { Link } from "react-router-dom";

const SkillResultItem = ({ result }) => {
  console.log("Rendering SkillResultItem with result:", result);
  return (
    <div>
      <Link to={`/skill-detail/${result._id}`}>
        <h2 style={{ color: "green" }}>{result.title}</h2>
      </Link>
      <p>{result.description}</p>
    </div>
  );
};

export default SkillResultItem;
