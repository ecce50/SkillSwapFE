// SkillCreation.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SkillCreation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillId, setSkillId] = useState(null);
  const nav = useNavigate();

  const handleSkillCreation = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5005/skill/create-skill", {
        title,
        description,
      });

      const createdSkill = res.data.skill;
      const createdSkillId = createdSkill._id;

      setSkillId(createdSkillId);
    } catch (error) {
      console.error("Error creating skill:", error);
    }
  };

  return (
    <div className="creation-container">
      <h2>Create a skill</h2>
      <form onSubmit={handleSkillCreation}>
        <label>
          Skill
          <input
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows={4}
          />
        </label>
        {/* Add the missing button for skill creation */}
        <button type="submit">Create Skill</button>
      </form>
    </div>
  );
}

export default SkillCreation;
