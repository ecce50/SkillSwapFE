import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config/config.index.js";

const ClassReviews = ({ classId }) => {
   const [reviews, setReviews] = useState([]);

  useEffect(() => {

     const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${BACKEND_URL}/review/reviews?classId=${classId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data.reviews);
        //console.log("This is what review response is: ", response);
        //console.log(
        //  "This is what response.data.reviews is: ",
        //  response.data.reviews
        //);
        //console.log("This is what reviews is: ", reviews);
      } catch (error) {
        console.error("Error when fetching the reviews:", error);
      }
    };

    fetchReviews();



  }, [classId]);

  //console.log("Rendered Reviews:", reviews);

  return (
    
    /* This component is to show all of the classes that belong to a particular skill. 
      It is the parent/main component of the SkillDetailPage.
      It need to receive the skillid from the UserSkills component. 
      How do we do that when they are on different pages and not connected each other?\ */
    <div>
      {reviews.map((aReview) => (
        <div key={aReview._id}>
          <h4>Reviewer: {aReview.reviewer} </h4>
          <p>Content: {aReview.content}</p>
          <h4>Score: {aReview.score}</h4>
        </div>



      ))}
    </div>
  );
};

export default ClassReviews;
