import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth.context";
import { BACKEND_URL } from "../../config/config.index.js";
import Accordion from "../general/Accordion.jsx";

function ClassCreation({ skill, onAddClass }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleClassCreation = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${BACKEND_URL}/class/class-creation`,
        {
          skillId: skill._id,
          title,
          classLocation,
          classDuration,
          description,
          level,
          classImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("This is the axios post result CLASS CREATION", res);

      if (res.status === 201) {
        // Call the onAddSkill function to add the new skill to the list
        onAddClass(res.data.class);
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to create class:", res.data.message);
      }

      // Update the navigation to include the state information
      // nav(`/skill-detail/${skill._id}`);
    } catch (error) {
      console.error("This is the error CLASS CREATION", error);
    }
  };

  return (
    <div style={{ backgroundColor: "green" }}>
      <Accordion title="Create a class">
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
      </Accordion>
    </div>
  );
}

export default ClassCreation;
