import React from "react";

const ClassResultItem = ({ result }) => {
  console.log("Rendering ClassResultItem with result:", result);
  return (
    <div>
      <h3 style={{ color: "blue" }}>{result.title}</h3>
      <p>{result.description}</p>
      {/* Add more Class-specific details or styling as needed */}
    </div>
  );
};

export default ClassResultItem;
