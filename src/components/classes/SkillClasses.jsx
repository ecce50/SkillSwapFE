import React, { useState, useEffect, useContext } from "react";
import ClassSessions from "../sessions/ClassSessions";
import SessionCreation from "../sessions/SessionCreation";
import ReviewCreation from "../reviews/ReviewCreation";
import ClassReviews from "../reviews/ClassReviews.jsx";
import { deleteClass } from "../../utils/ClassUtils.jsx";
import { fetchTeacherByUserId } from "../../utils/UserUtils";
import { AuthContext } from "../../context/Auth.context.jsx";
import GenericModal from "../../utils/GenericModal.jsx";
import { fetchSessionsByClassId } from "../../utils/SessionUtils.jsx";
import ImageDisplay from "../../utils/ImageDisplay.jsx";

const SkillClasses = ({ skill, setClasses, classes }) => {
  const [updatedClass, setUpdatedClass] = useState({
    title: "",
    description: "",
    duration: "",
    location: "",
  });
  const [teacherInfo, setTeacherInfo] = useState("");
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  // Fetch sessions when component mounts or classes change
  useEffect(() => {
    const fetchSessions = async (classId) => {
      try {
        const fetchedSessions = await fetchSessionsByClassId(classId);
        setSessions((prevSessions) => ({
          ...prevSessions,
          [classId]: fetchedSessions,
        }));
        console.log("Here are the sessions: ", fetchedSessions);
      } catch (error) {
        console.error("Error when fetching the sessions:", error);
      }
    };

    // Fetch sessions for each class
    classes.forEach((aClass) => {
      fetchSessions(aClass._id);
    });
  }, [classes]);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        console.log("fetchTeacherinfo skill.teacherId ", skill.teacherId);
        const teacher = await fetchTeacherByUserId(skill.teacherId);
        setTeacherInfo(teacher);
      } catch (error) {
        console.error("Error fetching teacher name:", error);
      }
    };

    fetchTeacherInfo();
  }, [skill.teacherId]);

  const handleDeleteButtonClick = (classId) => {
    setShowDeleteModal(true);
    setClassToDelete(classId);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setClassToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteClass(classToDelete, setClasses);
    setShowDeleteModal(false);
    setClassToDelete(null);
  };

  const handleAddSession = (newSession) => {
    setSessions((prevSessions) => ({
      ...prevSessions,
      [newSession.classId]: [
        ...(prevSessions[newSession.classId] || []),
        newSession,
      ],
    }));
  };

  const handleClassUpdate = (updatedClass) => {
    console.log("this is the updated image of the class:", (updatedClass))
    setClasses((prevClasses) =>
      prevClasses.map((aClass) =>
        aClass._id === updatedClass._id ? updatedClass : aClass
      )
    );
  };

  return (
    <div style={{ backgroundColor: "darkblue" }}>
      {console.log("Classes from the return: ", classes)}
      {console.log("Sessions from the return: ", sessions)}
      {classes.map((aClass) => (
        <div key={aClass._id} id={aClass._id}>
              <ImageDisplay
                imageType="class"
                entity={aClass}
                key={aClass._id} //Do we need this twice?
                onUpdate={handleClassUpdate} // Update the specific class in the parent state
              />
          <h2>
              {aClass.title}
          </h2>
            <>
              <p>Taught by {teacherInfo.firstname}</p>
              <p>{aClass.description}</p>
              <p>Duration: {aClass.duration}</p>
              <p>Location: {aClass.location}</p>
            </>

          {/* View mode buttons */}
            <>
              {skill && user && user._id === skill.teacherId && (
                <>
                  <button onClick={() => handleDeleteButtonClick(aClass._id)}>
                    Delete class
                  </button>
                </>
              )}
              <GenericModal
                show={showDeleteModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this class?"
                confirmText="Delete"
                cancelText="Cancel"
              />
              <ClassReviews classId={aClass._id} />

              {skill && user && user._id !== aClass.teacherId && (
                <ReviewCreation classId={aClass._id} />
              )}

              <ClassSessions
                classId={aClass._id}
                sessions={sessions[aClass._id] || []}
                setSessions={(newSessions) =>
                  setSessions((prevSessions) => ({
                    ...prevSessions,
                    [aClass._id]: newSessions,
                  }))
                }
              />

              {skill && user && user._id === skill.teacherId && (
                <SessionCreation
                  teacherId={aClass.teacherId}
                  classId={aClass._id}
                  onAddSession={handleAddSession}
                />
              )}
            </>
        </div>
      ))}
    </div>
  );
};

export default SkillClasses;
