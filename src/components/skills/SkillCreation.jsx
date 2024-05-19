import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config/config.index.js";
import Accordion from "../general/Accordion.jsx";

function SkillCreation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillId, setSkillId] = useState(null);
  const nav = useNavigate();

 const handleSkillCreation = async (e) => {
   e.preventDefault();

   try {
     // Create the skill
     const skillResponse = await axios.post(
       `${BACKEND_URL}/skill/create-skill`,
       {
         title,
         description,
       }
     );
       console.log("Add skill: skillResponse: ", skillResponse);

     const createdSkill = skillResponse.data.skill;
     const createdSkillId = createdSkill._id;

     // Update the user with the skillId
     const userResponse = await axios.put(
       `${BACKEND_URL}/user/add-skill`,
       {
         skillId: createdSkillId,
       }
     );
       console.log("Add skill: userResponse: ", userResponse)

     const updatedUser = userResponse.data.user;

     // Handle the updated user as needed
   } catch (error) {
     console.error("Error creating skill or updating user:", error);
   }
 };



  return (
    <div>
      <br />
      <Accordion title="Add a Skill">
      <h2>Create a skill</h2>
      <form onSubmit={handleSkillCreation}>
        <label>
          Skill title
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
        <button type="submit">Create skill</button>
      </form>
      </Accordion>
    </div>
  );
}

export default SkillCreation;
