import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth.context";
import { BACKEND_URL } from "../../config/config.index.js";

function ClassCreation({ skill }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleClassCreation = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BACKEND_URL}/class/class-creation`, {
        title,
        description,
        skillId: skill._id,
      });
      console.log("This is the axios post result", res);

      // Update the navigation to include the state information
      nav(`/skill-detail/${skill._id}`);


    } catch (error) {
      console.error("This is the error", error);
    }
  };

  return (
    <div>
      <h2>Create a class</h2>
      <form onSubmit={handleClassCreation}>
        <label>
          Class name
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
        <button type="submit">Create class</button>
      </form>
    </div>
  );
}

export default ClassCreation;
