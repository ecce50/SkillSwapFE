import React, { useState, useEffect } from "react";
import axios from "axios";
import ClassSessions from "../sessions/ClassSessions";
import SessionCreation from "../sessions/SessionCreation";
import ReviewCreation from "../reviews/ReviewCreation";
import ClassReviews from "../reviews/ClassReviews.jsx";
import { deleteClass } from "../../utils/ClassUtils.jsx";
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

  // Function to toggle edit mode and reset updated class state
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setUpdatedClass({}); // Reset updated class state
  };

  // Cancel edit function
  const handleCancelEdit = () => {
    toggleEditMode(); // Toggle edit mode and reset updated class state
  };

  const handleEdit = (classId) => {
    setEditedClasses((prevEditedClasses) => ({
      ...prevEditedClasses,
      [classId]: true,
    }));
    toggleEditMode(); // Enter edit mode
    // Set updated class to the class being edited
    const classToEdit = classes.find((c) => c._id === classId);
    setUpdatedClass(classToEdit);
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
              <button onClick={handleCancelEdit}>Cancel</button>
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ClassSessions from "../sessions/ClassSessions";
// import SessionCreation from "../sessions/SessionCreation";
// import ReviewCreation from "../reviews/ReviewCreation";
// import ClassReviews from "../reviews/ClassReviews.jsx";
// import { deleteClass } from "../../utils/ClassUtils.jsx";
// import ClassImage from "./ClassImage.jsx";

// const SkillClasses = ({ skill }) => {
//   const [classes, setClasses] = useState([]);
//   const [editedClasses, setEditedClasses] = useState({});
//   const [updatedClass, setUpdatedClass] = useState({
//     title: "",
//     description: "",
//     duration: "",
//     location: "",
//   });
//   const [editMode, setEditMode] = useState(false); // Introduce editMode state

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const response = await axios.get(
//           `http://localhost:5005/class/classes?skillId=${skill._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setClasses(response.data.classes);
//       } catch (error) {
//         console.error("Error when fetching the classes:", error);
//       }
//     };

//     fetchClasses();
//   }, [skill._id]);

//   const handleSaveEditClass = async (classId) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const url = `http://localhost:5005/class/update-class/${classId}`;

//       const response = await axios.put(url, updatedClass, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         // Update the local classes state with the new data
//         setClasses((prevClasses) =>
//           prevClasses.map((c) => (c._id === classId ? updatedClass : c))
//         );

//         setEditedClasses((prevEditedClasses) => ({
//           ...prevEditedClasses,
//           [classId]: false,
//         }));

//         console.log("Class updated successfully");
//         // Set edit mode to false after saving edits
//         setEditMode(false);
//       } else {
//         console.error("Failed to update class:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating class:", error.message);
//     }
//   };

//   return (
//     <div>
//       {classes.map((aClass) => (
//         <div key={aClass._id}>
//           {/* Common part for both edit mode and view mode */}
//           <h2>Class Title: {aClass.title} </h2>
//           <ClassImage skillClass={aClass} editMode={editMode} />
//               <h4>Teacher: {skill.teacherId}</h4>
//           <p>Class Description: {aClass.description}</p>
//           <h4>Duration: {aClass.duration}</h4>
//           <h4>Location: {aClass.location}</h4>

//           {/* Edit mode */}
//           {editMode && editedClasses[aClass._id] && (
//             <>
//               <label>
//                 Class Title
//                 <input
//                   value={updatedClass.title || aClass.title}
//                   onChange={(e) =>
//                     setUpdatedClass((prevClass) => ({
//                       ...prevClass,
//                       title: e.target.value,
//                     }))
//                   }
//                 />
//               </label>
//               <label>
//                 Class Description
//                 <textarea
//                   value={updatedClass.description || aClass.description}
//                   onChange={(e) =>
//                     setUpdatedClass((prevClass) => ({
//                       ...prevClass,
//                       description: e.target.value,
//                     }))
//                   }
//                   rows={4}
//                 />
//               </label>
//               <label>
//                 Duration
//                 <input
//                   value={updatedClass.duration || aClass.duration}
//                   onChange={(e) =>
//                     setUpdatedClass((prevClass) => ({
//                       ...prevClass,
//                       duration: e.target.value,
//                     }))
//                   }
//                 />
//               </label>
//               <label>
//                 Location
//                 <input
//                   value={updatedClass.location || aClass.location}
//                   onChange={(e) =>
//                     setUpdatedClass((prevClass) => ({
//                       ...prevClass,
//                       location: e.target.value,
//                     }))
//                   }
//                 />
//               </label>
//               <button onClick={() => handleSaveEditClass(aClass._id)}>
//                 Save
//               </button>
//             </>
//           )}

//           {/* View mode */}
//           {!editMode && !editedClasses[aClass._id] && (
//             <>
//               <button onClick={() => deleteClass(aClass._id)}>
//                 Delete Class
//               </button>
//               <button onClick={() => handleEdit(aClass._id)}>Edit Class</button>
//               {/* Other buttons and components */}
//               <h2>Reviews:</h2>
//               <ClassReviews classId={aClass._id} />
//               <ClassSessions classId={aClass._id} />
//               <ReviewCreation classId={aClass._id} />
//               <SessionCreation classId={aClass._id} />
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SkillClasses;
