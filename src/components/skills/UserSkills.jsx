import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchClassesBySkillId } from "../../utils/ClassUtils";
import { deleteSkill } from "../../utils/SkillUtils";
import { BACKEND_URL } from "../../config/config.index.js";
import "../../../style/user-skills.css";
import GenericModal from "../../utils/GenericModal.jsx";


// UserSkills component
const UserSkills = ({skills, setSkills}) => {
  // State for skills and edited skill
  //const [skills, setSkills] = useState([]);
  const [editedSkills, setEditedSkills] = useState({});
  const nav = useNavigate();

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [skillToDelete, setSkillToDelete] = useState(null);

  // Fetch skills from the server on component mount
/*  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${BACKEND_URL}/skill/skills?timestamp=${Date.now()}`,
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
  }, []); */

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
      const url = `http://localhost:5005/skill/update-skill/${skillId}`;

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

  const handleDeleteButtonClick = (skillId) => {
    setShowDeleteModal(true);
    setSkillToDelete(skillId);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSkillToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteSkill(skillToDelete);
    setShowDeleteModal(false);
    setSkillToDelete(null);
  };

  return (
    <div>
      <h2>Your skills</h2>
      {skills.map((skill) => (
        <div className="user-skill-container" key={skill._id}>
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
                  nav(`/skill-detail/${skill._id}`, {
                    state: {
                      skill,
                    },
                  })
                }
              >
                Read more
              </button>
              <button onClick={() => handleEdit(skill._id)}>Edit</button>
              <button onClick={() => handleDeleteButtonClick(skill._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
      <GenericModal
        show={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this skill?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default UserSkills;
