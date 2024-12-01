import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { fetchClassesBySkillId } from "../../utils/ClassUtils";
import { deleteSkill } from "../../utils/SkillUtils";
import "../../../style/user-skills.css";
import GenericModal from "../../utils/GenericModal.jsx";
import ImageDisplay from "../../utils/ImageDisplay.jsx";


const UserSkills = ({skills, setSkills}) => {
  const nav = useNavigate();

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [skillToDelete, setSkillToDelete] = useState(null);


  const handleDeleteButtonClick = (skillId) => {
    setShowDeleteModal(true);
    setSkillToDelete(skillId);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSkillToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteSkill(skillToDelete, setSkills);
    setShowDeleteModal(false);
    setSkillToDelete(null);
  };

  const handleSkillUpdate = (updatedSkill) => {
    console.log("this is the updated image of the skill:", (updatedSkill))
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill._id === updatedSkill._id ? updatedSkill : skill
      )
    );
  };

  return (
    <div>
      <h2>Your skills</h2>
      {skills.map((skill) => (
        <div className="user-skill-container" key={skill._id}>
            <>
              <ImageDisplay
                imageType="skill"
                entity={skill}
                key={skill._id} //Do we need this twice?
                onUpdate={handleSkillUpdate} // Update the specific skill in the parent state
              />
              ;<h3>{skill.title}</h3>
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
              <button onClick={() => handleDeleteButtonClick(skill._id)}>
                Delete
              </button>
            </>
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
