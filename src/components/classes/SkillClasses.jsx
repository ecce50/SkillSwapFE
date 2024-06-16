import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ClassSessions from "../sessions/ClassSessions";
import SessionCreation from "../sessions/SessionCreation";
import ReviewCreation from "../reviews/ReviewCreation";
import ClassReviews from "../reviews/ClassReviews.jsx";
import { deleteClass } from "../../utils/ClassUtils.jsx";
import ClassImage from "./ClassImage.jsx";
import { fetchTeacherByUserId } from "../../utils/UserUtils";
import { BACKEND_URL } from "../../config/config.index.js";
import { AuthContext } from "../../context/Auth.context.jsx";

const SkillClasses = ({ skill }) => {
  const [classes, setClasses] = useState([]);
  const [editedClasses, setEditedClasses] = useState({});
  const [updatedClass, setUpdatedClass] = useState({
    title: "",
    description: "",
    duration: "",
    location: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${BACKEND_URL}/class/classes?skillId=${skill._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClasses(response.data.classes);
      } catch (error) {
        console.error("Error when fetching the classes:", error);
      }
    };

    fetchClasses();
  }, [skill._id]);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const teacher = await fetchTeacherByUserId(skill.teacherId);
        setTeacherInfo(teacher);
      } catch (error) {
        console.error("Error fetching teacher name:", error);
      }
    };

    fetchTeacherInfo();
  }, [skill.teacherId]);

  // Function to toggle edit mode and reset updated class state
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setUpdatedClass({});
  };


  const handleCancelEdit = () => {
    toggleEditMode(); // Toggle edit mode and reset updated class state
  };

  const handleEdit = (classId) => {
    setEditedClasses((prevEditedClasses) => ({
      ...prevEditedClasses,
      [classId]: true,
    }));
    toggleEditMode();
    // Set updated class to the class being edited
    const classToEdit = classes.find((c) => c._id === classId);
    setUpdatedClass(classToEdit);
  };

  const handleSaveEditClass = async (classId) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `${BACKEND_URL}/class/update-class/${classId}`;

      const response = await axios.put(url, updatedClass, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Update the local classes state with the new data
        setClasses((prevClasses) =>
          prevClasses.map((c) => (c._id === classId ? updatedClass : c))
        );

        setEditedClasses((prevEditedClasses) => ({
          ...prevEditedClasses,
          [classId]: false,
        }));

        console.log("Class updated successfully");
        // Exit edit mode after saving edits
        toggleEditMode();
      } else {
        console.error("Failed to update class:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating class:", error.message);
    }
  };

  return (
    <div>
      {classes.map((aClass) => (
        <div key={aClass._id} id={aClass._id}>
          {/* Common part for both edit mode and view mode */}
          <h2>{editMode && editedClasses[aClass._id] ? (
            <input
              value={updatedClass.title || aClass.title}
              onChange={(e) =>
                setUpdatedClass((prevClass) => ({
                  ...prevClass,
                  title: e.target.value,
                }))
              }
            />
          ) : (
            aClass.title
          )}
          </h2>

          {editMode && editedClasses[aClass._id] ? (
            <>
              <label>
                Description:
                <textarea
                  value={updatedClass.description || aClass.description}
                  onChange={(e) =>
                    setUpdatedClass((prevClass) => ({
                      ...prevClass,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                />
              </label>
              <label>
                Duration:
                <input
                  value={updatedClass.duration || aClass.duration}
                  onChange={(e) =>
                    setUpdatedClass((prevClass) => ({
                      ...prevClass,
                      duration: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Location:
                <input
                  value={updatedClass.location || aClass.location}
                  onChange={(e) =>
                    setUpdatedClass((prevClass) => ({
                      ...prevClass,
                      location: e.target.value,
                    }))
                  }
                />
              </label>
              <button onClick={() => handleSaveEditClass(aClass._id)}>
                Save
              </button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <ClassImage skillClass={aClass} editMode={editMode} />
              <p>Taught by {teacherInfo.firstname}</p>
              <p>{aClass.description}</p>
              <p>Duration: {aClass.duration}</p>
              <p>Location: {aClass.location}</p>
            </>
          )}

          {/* View mode buttons */}
          {!editMode && !editedClasses[aClass._id] && (
            <>

              {skill && user && user._id === skill.teacherId && (
                <button onClick={() => deleteClass(aClass._id)}>Delete class</button>,

                <button onClick={() => handleEdit(aClass._id)}>Edit class</button>
              )}



              <ClassReviews classId={aClass._id} />

              {skill && user && user._id !== aClass.teacherId && (
                <ReviewCreation classId={aClass._id} />
              )}

              <ClassSessions classId={aClass._id} />

              {skill && user && user._id === skill.teacherId && (
                <SessionCreation classId={aClass._id} />
              )}

            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillClasses;