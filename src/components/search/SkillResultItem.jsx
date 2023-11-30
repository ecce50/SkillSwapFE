import React from "react";

const SkillResultItem = ({ result }) => {
  console.log("Rendering SkillResultItem with result:", result);
  return (
    <div>
      <h3 style={{ color: "green" }}>{result.title}</h3>
      <p>{result.description}</p>
      {/* Add more Skill-specific details or styling as needed */}
    </div>
  );
};

export default SkillResultItem;
