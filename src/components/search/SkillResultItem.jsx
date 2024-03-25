import React from "react";

const SkillResultItem = ({ result }) => {
  console.log("Rendering SkillResultItem with result:", result);
  return (
    <div>
      <h2 style={{ color: "green" }}>{result.title}</h2>
      <p>{result.description}</p>
      {/* Add more Skill-specific details or styling as needed */}
    </div>
  );
};

export default SkillResultItem;
