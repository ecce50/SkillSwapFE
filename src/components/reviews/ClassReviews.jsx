import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config/config.index.js";
import Accordion from "../general/Accordion.jsx";

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

      } catch (error) {
        console.error("Error when fetching the reviews:", error);
      }
    };

    fetchReviews();



  }, [classId]);



  return (
    <div>
      <Accordion title="Reviews">
      <h2>Reviews</h2>
      {reviews.map((aReview) => (
        <div key={aReview._id}>
          <p>Reviewer {aReview.reviewer} </p>
          <p>Content {aReview.content}</p>
          <p>Score {aReview.score}</p>
        </div>
      ))}
      </Accordion>
    </div>
  );
};

export default ClassReviews;
