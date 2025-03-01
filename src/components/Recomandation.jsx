import React, { useEffect, useState } from "react";

const Recommendation = ({ data }) => {
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await fetch(
          "https://api.gemini.com/v1/recommendation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        setRecommendation(result.recommendation);
      } catch (error) {
        console.error("Error fetching recommendation:", error);
      }
    };

    fetchRecommendation();
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Your Investment Recommendation</h2>
      <p className="mt-4 text-gray-700">{recommendation || "Loading..."}</p>
    </div>
  );    
};

export default Recommendation;
