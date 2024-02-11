import axios from "axios";
import {
  fetchSessionsByClassId,
  deleteSession,
} from "./SessionUtils.jsx";

export const fetchClassesBySkillId = async (skillId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `http://localhost:5005/class/classes?skillId=${skillId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      console.log("fetchSkillsByClassId response: ", response.data.classes)
    return response.data.classes;
  } catch (error) {
    console.error("Error when fetching classes:", error);
    return [];
  }
};

export const deleteClass = async (classId) => {
  try {
    const sessions = await fetchSessionsByClassId(classId);

    console.log("Before Promise.all");
    await Promise.all(
      sessions.map(async (session) => {
        try {
          console.log("Deleting session: ", session._id);
          await deleteSession(session._id);
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
      setClasses((prevClasses) => prevClasses.filter((c) => c._id !== classId));
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

// export default deleteClass;