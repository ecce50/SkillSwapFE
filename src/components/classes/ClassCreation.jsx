import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth.context";
import "/style/global.css";
import "/style/creationTemp.css";

function ClassCreation({ skillId, skillTitle}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleClassCreation = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5005/class/class-creation",
        {
          title,
          description,
          skillId,
        }
      );
      console.log("This is the axios post result", res);

      // Assuming the created class data is available in the response
      const createdClass = res.data.class;

      // Update the navigation to include the state information
      nav({
        pathname: "/skill-detail",
        // state: {
        //   skill: {
        //     _id: skillId,
        //     title: skillTitle,
        //     // Add other properties as needed
        //   },
        //   // You can also include the created class data if needed
        //   createdClass,
        // },
      });
    } catch (error) {
      console.error("This is the error", error);
    }
  };

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5005/class/class-creation",
  //       {
  //         title,
  //         description,
  //         skillId,
  //       }
  //     );
  //     console.log("This is the axios post result", res);

  //     //await authenticateUser();
  //     nav("/skill-detail")
  //   } catch (error) {
  //     console.error("This is the error", error);
  //   }
  // };

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
