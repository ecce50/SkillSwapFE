import React, { useState, useEffect } from "react";
import ClassCreation from "./ClassCreation";
import axios from "axios";

const TeacherSkills = ({ onAddClass }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [editedSkills, setEditedSkills] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5173/skill/skills?timestamp=${Date.now()}`,
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

  const handleAddClass = (skillId) => {
    console.log("Clicked Add Class button for skillId:", skillId);
    setSelectedSkills((prevSelectedSkills) => ({
      ...prevSelectedSkills,
      [skillId]: true,
    }));
    onAddClass();
  };

  const handleEdit = (skillId) => {
    setEditedSkills((prevEditedSkills) => ({
      ...prevEditedSkills,
      [skillId]: true,
    }));
  };

  const handleSaveEdit = async (skillId, title, description) => {
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

  return (
    <div className="creation-container">
      <h2>Your Skills</h2>
      {skills.map((skill) => (
        <div key={skill._id}>
          {editedSkills[skill._id] ? (
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
                  handleSaveEdit(skill._id, skill.title, skill.description)
                }
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <button onClick={() => handleAddClass(skill._id)}>
                Add Class
              </button>
              <button onClick={() => handleEdit(skill._id)}>Edit</button>
              <button onClick={() => handleDelete(skill._id)}>Delete</button>
              {selectedSkills[skill._id] && (
                <ClassCreation skillId={skill._id} />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeacherSkills;
