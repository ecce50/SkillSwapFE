import React, { useState, useEffect } from "react";
import ClassCreation from "./ClassCreation";

const TeacherSkills = ({ onAddClass }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem("authToken");

        // Make the request with the assumption that the token is always present
        const response = await fetch(
          `http://localhost:5173/skill/skills?timestamp=${Date.now()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setSkills(data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    // Call the fetchSkills function
    fetchSkills();
  }, []); // No dependencies needed here

  const handleAddClass = (skillId) => {
    console.log("Clicked Add Class button for skillId:", skillId);
    setSelectedSkills((prevSelectedSkills) => ({
      ...prevSelectedSkills,
      [skillId]: true,
    }));
    onAddClass();
  };

  return (
    <div>
      <h2>Your Skills</h2>
      {skills.map((skill) => (
        <div key={skill._id}>
          <h3>{skill.title}</h3>
          <p>{skill.description}</p>

          <button onClick={() => handleAddClass(skill._id)}>Add Class</button>
          {selectedSkills[skill._id] && <ClassCreation skillId={skill._id} />}
        </div>
      ))}
    </div>
  );
};

export default TeacherSkills;
