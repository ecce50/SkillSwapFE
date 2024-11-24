import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageDisplay from "./ImageDisplay";

function UserSkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillUpdate = (updatedSkill) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill._id === updatedSkill._id ? updatedSkill : skill
      )
    );
  };

  return (
    <div>
      {skills.map((skill) => (
        <ImageDisplay
          key={skill._id}
          editMode={true}
          imageType="skill"
          entity={skill}
          onUpdate={handleSkillUpdate} // Update the specific skill in the parent state
        />
      ))}
    </div>
  );
}

export default UserSkills;

  