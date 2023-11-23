import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";

function SkillCreation() {
  const [title, setTitle] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSkillCreation = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5005/skill/skill-creation",
        {
          title,
        }
      );
      console.log("This is the axios post result", res);

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
        <button type="submit">Create skill</button>
      </form>
    </div>
  );
}

export default SkillCreation;
