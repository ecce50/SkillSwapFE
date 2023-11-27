import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";

function ClassCreation({ skillId }) {
  const [title, setTitle] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleClassCreation = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5005/class/class-creation",
        {
          title,
          skillId,
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
      <h2>Create a class</h2>
      <form onSubmit={handleClassCreation}>
        <label>
          Class
          <input
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <button type="submit">Create class</button>
      </form>
    </div>
  );
}

export default ClassCreation;
