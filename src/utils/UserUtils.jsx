import axios from "axios";

export const fetchTeacherByUserId = async (teacherId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `http://localhost:5005/user/userinfo?teacherId=${teacherId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("fetchTeacherByUserId response: ", response.data.teacher);
    return response.data.teacher;
  } catch (error) {
    console.error("Error when fetching teacher:", error);
    return [];
  }
};