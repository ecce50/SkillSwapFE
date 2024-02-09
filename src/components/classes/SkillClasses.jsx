import React, { useState, useEffect } from "react";
import axios from "axios";
import ClassSessions from "../sessions/ClassSessions";
import SessionCreation from "../sessions/SessionCreation";
import ReviewCreation from "../reviews/ReviewCreation";
import ClassReviews from "../reviews/ClassReviews.jsx";
import {
  fetchSessionsByClassId,
  deleteSessionById,
} from "../../utils/SessionUtils.jsx";
import ClassImage from "./ClassImage.jsx";

const SkillClasses = ({ skill }) => {
  const [classes, setClasses] = useState([]);
  const [editedClasses, setEditedClasses] = useState({});
  const [updatedClass, setUpdatedClass] = useState({
    title: "",
    description: "",
    duration: "",
    location: "",
  });
  const [editMode, setEditMode] = useState(false); // Introduce editMode state

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5005/class/classes?skillId=${skill._id}`,
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

  const deleteClass = async (classId) => {
    try {
      const sessions = await fetchSessionsByClassId(classId);

      console.log("Before Promise.all");
      await Promise.all(
        sessions.map(async (session) => {
          try {
            console.log("Deleting session: ", session._id);
            await deleteSessionById(session._id);
            console.log("Session deleted successfully: ", session._id);
          } catch (sessionError) {
            console.error("Error when deleting session:", sessionError);
            throw sessionError;
          }
        })
      );
      console.log("After Promise.all");
      console.log("All sessions deleted successfully");

      console.log("Deleting class: ", classId);
      const response = await axios.delete(
        `http://localhost:5005/class/delete-class/${classId}`
      );
      console.log("Class deletion response:", response.status, response.data);

      if (response.status === 200) {
        console.log("Class deleted successfully");
        // Update state to trigger a re-render
        setClasses((prevClasses) =>
          prevClasses.filter((c) => c._id !== classId)
        );
      } else {
        console.error(
          "Failed to delete class. Response:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error when deleting class and sessions:", error);
    }
  };

  const handleEdit = (classId) => {
    setEditedClasses((prevEditedClasses) => ({
      ...prevEditedClasses,
      [classId]: true,
    }));
    // Set edit mode to true
    setEditMode(true);
  };

  const handleSaveEditClass = async (classId) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `http://localhost:5005/class/update-class/${classId}`;

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
        // Set edit mode to false after saving edits
        setEditMode(false);
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
        <div key={aClass._id}>
          {/* Common part for both edit mode and view mode */}
          <h2>Class Title: {aClass.title} </h2>
          <ClassImage skillClass={aClass} editMode={editMode} />
              <h4>Teacher: {skill.teacherId}</h4>
          <p>Class Description: {aClass.description}</p>
          <h4>Duration: {aClass.duration}</h4>
          <h4>Location: {aClass.location}</h4>

          {/* Edit mode */}
          {editMode && editedClasses[aClass._id] && (
            <>
              <label>
                Class Title
                <input
                  value={updatedClass.title || aClass.title}
                  onChange={(e) =>
                    setUpdatedClass((prevClass) => ({
                      ...prevClass,
                      title: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Class Description
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
                Duration
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
                Location
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
            </>
          )}

          {/* View mode */}
          {!editMode && !editedClasses[aClass._id] && (
            <>
              <button onClick={() => deleteClass(aClass._id)}>
                Delete Class
              </button>
              <button onClick={() => handleEdit(aClass._id)}>Edit Class</button>
              {/* Other buttons and components */}
              <h2>Reviews:</h2>
              <ClassReviews classId={aClass._id} />
              <ClassSessions classId={aClass._id} />
              <ReviewCreation classId={aClass._id} />
              <SessionCreation classId={aClass._id} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillClasses;
