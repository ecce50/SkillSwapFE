import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SkillCreation from "../components/skills/SkillCreation";
import UserSkills from "../components/skills/UserSkills";
import UserInfo from "../components/users/UserInfo";
import axios from "axios";
import { BACKEND_URL } from "../config/config.index";


function Profile() {

  const [skills, setSkills] = useState([]);

    // Fetch skills from the server on page mount
    useEffect(() => {
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
    }, []);

    const handleAddSkill = (newSkill) => {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
    };
  

  return (
    <>
      <Navbar />
      <UserInfo />

      <UserSkills skills={skills} setSkills={setSkills} />
      <SkillCreation onAddSkill={handleAddSkill} />
    </>
  );
}

export default Profile;
