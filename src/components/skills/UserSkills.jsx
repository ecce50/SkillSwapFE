import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// UserSkills component
const UserSkills = () => {
  // State for skills and edited skill
  const [skills, setSkills] = useState([]);
  const [editedSkills, setEditedSkills] = useState({});
  const nav = useNavigate(); // Add useNavigate

  // Fetch skills from the server on component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5005/skill/skills?timestamp=${Date.now()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSkills(response.data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  // Handle the "Edit" button click
  const handleEdit = (skillId) => {
    setEditedSkills((prevEditedSkills) => ({
      ...prevEditedSkills,
      [skillId]: true,
    }));
  };

  // Handle the "Save" button click for editing a skill
  const handleSaveEditSkill = async (skillId, title, description) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `http://localhost:5173/skill/update-skill/${skillId}`;

      const response = await axios.put(
        url,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the local skills state with the new data
        setSkills((prevSkills) =>
          prevSkills.map((s) =>
            s._id === skillId ? { ...s, title, description } : s
          )
        );

        setEditedSkills((prevEditedSkills) => ({
          ...prevEditedSkills,
          [skillId]: false,
        }));

        console.log("Skill updated successfully");
      } else {
        console.error("Failed to update skill:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating skill:", error.message);
    }
  };

  // Handle the "Delete" button click
  const handleDelete = async (skillId) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `http://localhost:5173/skill/delete-skill/${skillId}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Remove the deleted skill from the local state
        setSkills((prevSkills) => prevSkills.filter((s) => s._id !== skillId));

        console.log("Skill deleted successfully");
      } else {
        console.error("Failed to delete skill:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting skill:", error.message);
    }
  };

  // Render the UserSkills component
  return (
    <div className="creation-container">
      <h2>Your Skills</h2>
      {skills.map((skill) => (
        <div key={skill._id}>
          {editedSkills[skill._id] ? (
            // Render edit form for the skill
            <>
              <label>
                Title
                <input
                  value={skill.title}
                  onChange={(e) =>
                    setSkills((prevSkills) =>
                      prevSkills.map((s) =>
                        s._id === skill._id
                          ? { ...s, title: e.target.value }
                          : s
                      )
                    )
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  value={skill.description}
                  onChange={(e) =>
                    setSkills((prevSkills) =>
                      prevSkills.map((s) =>
                        s._id === skill._id
                          ? { ...s, description: e.target.value }
                          : s
                      )
                    )
                  }
                  rows={4}
                />
              </label>
              <button
                onClick={() =>
                  handleSaveEditSkill(skill._id, skill.title, skill.description)
                }
              >
                Save
              </button>
            </>
          ) : (
            // Render skill details and action buttons
            <>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              {/* Use navigate for manual navigation */}
              <button
                onClick={() =>
                  nav(`/skill-detail`, {
                    state: {
                      skill,
                    },
                  })
                }
                // Trying to pass entire skill object, not just certain attributes – below is how it was before
                // onClick={() =>
                //   nav(`/skill-detail`, {
                //     state: {
                //       skillId: skill._id,
                //       skillTitle: skill.title,
                //     },
                //   })
                // }
              >
                Read more
              </button>

              <button onClick={() => handleEdit(skill._id)}>Edit</button>
              <button onClick={() => handleDelete(skill._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserSkills;
