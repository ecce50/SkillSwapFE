import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";

function SkillCreation() {
  const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  const { authenticateUser, user, setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const updateUserSkills = async (skillId) => {
    try {
      const userId = user._id;
      console.log("Frontend - UserID:", userId); // Log user ID
      console.log("Frontend - SkillID:", skillId); // Log skill ID
      const res = await axios.put(
        `http://localhost:5005/user/add-skill`,
        { skillId }
      );

      console.log("Update User Skills Response:", res.data);

      // Handle the response as needed
    } catch (error) {
      console.error("Error updating user skills:", error);
    }
  };

  const handleSkillCreation = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5005/skill/skill-creation",
        {
          title,
          description,
        }
      );
      console.log("This is the axios post result", res);

      const createdSkill = res.data.skill;
      const skillId = createdSkill._id;
      console.log("Frontend - Created SkillID:", skillId); // Log created skill ID
      // const skillTitle = createdSkill.title;

      // Update the user's skills array
      setUser((prevUser) => ({
        ...prevUser,
        skills: [...prevUser.skills, skillId],
      }));

      await updateUserSkills(skillId);

      await authenticateUser();
      nav("/profile");
    } catch (error) {
      console.error("This is the error", error);
    }
  };

  return (
    <div>
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
            rows={4} // Set the number of visible rows
          />
        </label>
        <button type="submit">Create skill</button>
      </form>
    </div>
  );
}

export default SkillCreation;
