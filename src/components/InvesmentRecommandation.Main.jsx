// // import React, { useState } from "react";
// // import axios from "axios";

// // const InvestmentRecommendation = () => {
// //   const [salary, setSalary] = useState("");
// //   const [expenses, setExpenses] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [recommendation, setRecommendation] = useState(null);
// //   const [error, setError] = useState(null);

// //   const geminiChatAPI = async () => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // Prepare the content to be sent in the request to Gemini's API
// //       const promptText = `Given the salary of ${salary} and expenses of ${expenses}, provide investment advice based on these inputs in JSON format.`;

// //       const response = await axios.post(
// //         "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC-FhqRC8i1H0RXBbQtownr3JzYc0-gaeE", // Replace with your actual Gemini API key
// //         {
// //           contents: [
// //             {
// //               parts: [
// //                 {
// //                   text: promptText, // Sending the dynamic content as the prompt
// //                 },
// //               ],
// //             },
// //           ],
// //         },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       // Extract the response content from the JSON structure
// //       let geminiResponse = response.data.candidates[0].content.parts[0].text;
// //       geminiResponse = geminiResponse
// //         .replace(/^```json\n/, "")
// //         .replace(/\n```$/, "");

// //       console.log(geminiResponse);
// //       // The response is in JSON format, so we parse it.
// //       const parsedResponse = JSON.parse(geminiResponse);
// //       console.log(parsedResponse);
// //       // Set the recommendation
// //       setRecommendation(parsedResponse);
// //     } catch (err) {
// //       console.error(err);
// //       setError("Error fetching recommendation. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     geminiChatAPI();
// //   };

// //   return (
// //     <div>
// //       <h1>Investment Recommendation</h1>

// //       {/* User Input Form */}
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Salary: </label>
// //           <input
// //             type="number"
// //             value={salary}
// //             onChange={(e) => setSalary(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label>Expenses: </label>
// //           <input
// //             type="number"
// //             value={expenses}
// //             onChange={(e) => setExpenses(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <button type="submit" disabled={loading}>
// //           {loading ? "Loading..." : "Get Recommendation"}
// //         </button>
// //       </form>

// //       {/* Display Recommendation */}
// //       {recommendation && (
// //         <div>
// //           <h2>Your Investment Recommendation</h2>
// //           <pre>{JSON.stringify(recommendation, null, 2)}</pre>
// //         </div>
// //       )}

// //       {/* Display Error */}
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //     </div>
// //   );
// // };

// // export default InvestmentRecommendation;
// import React, { useState } from "react";
// import axios from "axios";

// const InvestmentRecommendation = () => {
//   const [salary, setSalary] = useState("");
//   const [expenses, setExpenses] = useState("");
//   const [riskCapacity, setRiskCapacity] = useState("");
//   const [expectedReturn, setExpectedReturn] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [recommendations, setRecommendations] = useState([]);
//   const [error, setError] = useState(null);

//   // const geminiChatAPI = async () => {
//   //   setLoading(true);
//   //   setError(null);

//   //   try {
//   //     // Prepare the content to be sent in the request to Gemini's API
//   //     const promptText = `
//   //       Given the salary of ${salary}, expenses of ${expenses}, a risk capacity of ${riskCapacity},
//   //       and an expected annual return of ${expectedReturn}, provide 4-5 investment suggestions
//   //       in JSON format. Each suggestion should include 'category', 'recommendation',
//   //       'risk_profile', 'expected_return', and 'investment_options'.`;

//   //     const response = await axios.post(
//   //       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAnZRLoZ2nH-IX1Hczwxp1NfpuSao7YiaU",
//   //       {
//   //         contents: [
//   //           {
//   //             parts: [
//   //               {
//   //                 text: promptText, // Sending the dynamic content as the prompt
//   //               },
//   //             ],
//   //           },
//   //         ],
//   //       },
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     // Extract the response content from the JSON structure
//   //     let geminiResponse = response.data.candidates[0].content.parts[0].text;

//   //     // Clean up the response to remove any Markdown formatting
//   //     geminiResponse = geminiResponse
//   //       .replace(/^```json\n/, "")
//   //       .replace(/\n```$/, ""); // Remove the "```json" and closing "```"

//   //     // Log the cleaned-up response for debugging purposes
//   //     console.log("Cleaned Gemini Response:", geminiResponse);

//   //     // Now parse the cleaned-up JSON
//   //     const parsedResponse = JSON.parse(geminiResponse);

//   //     // Assuming the API returns suggestions in an array with a clear structure
//   //     const suggestions = parsedResponse.suggestions || [];

//   //     // Set the recommendations
//   //     setRecommendations(suggestions);
//   //   } catch (err) {
//   //     console.error(err);
//   //     setError("Error fetching recommendation. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const geminiChatAPI = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Prepare the content to be sent in the request to Gemini's API
//       const promptText = `
//         Given the salary of ${salary}, expenses of ${expenses}, a risk capacity of ${riskCapacity},
//         and an expected annual return of ${expectedReturn}, provide 4-5 investment suggestions
//         in JSON format. Each suggestion should include 'category', 'recommendation',
//         'risk_profile', 'expected_return', and 'investment_options'.`;

//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAnZRLoZ2nH-IX1Hczwxp1NfpuSao7YiaU",
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: promptText, // Sending the dynamic content as the prompt
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Extract the response content from the JSON structure
//       let geminiResponse = response.data.candidates[0].content.parts[0].text;

//       // Clean up the response to remove any Markdown formatting
//       geminiResponse = geminiResponse
//         .replace(/^```json\n/, "")
//         .replace(/\n```$/, ""); // Remove the "```json" and closing "```"

//       // Log the cleaned-up response for debugging purposes
//       console.log("Cleaned Gemini Response:", geminiResponse);

//       // Now parse the cleaned-up JSON
//       const parsedResponse = JSON.parse(geminiResponse);

//       // If the response is already in the expected format, directly use it
//       setRecommendations(parsedResponse); // Set the recommendations directly
//     } catch (err) {
//       console.error(err);
//       setError("Error fetching recommendation. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     geminiChatAPI();
//   };

//   return (
//     <div>
//       <h1>Investment Recommendation</h1>

//       {/* User Input Form */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Salary: </label>
//           <input
//             type="number"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Expenses: </label>
//           <input
//             type="number"
//             value={expenses}
//             onChange={(e) => setExpenses(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Risk Capacity (Low, Medium, High): </label>
//           <input
//             type="text"
//             value={riskCapacity}
//             onChange={(e) => setRiskCapacity(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Expected Annual Return (%): </label>
//           <input
//             type="number"
//             value={expectedReturn}
//             onChange={(e) => setExpectedReturn(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Loading..." : "Get Recommendations"}
//         </button>
//       </form>

//       {/* Display Recommendations in Cards */}
//       <div className="recommendation-cards">
//         {recommendations.length > 0 ? (
//           recommendations.map((suggestion, index) => (
//             <div key={index} className="card">
//               <h3>{suggestion.category}</h3>
//               <p>
//                 <strong>Recommendation:</strong> {suggestion.recommendation}
//               </p>
//               <p>
//                 <strong>Risk Profile:</strong> {suggestion.risk_profile}
//               </p>
//               <p>
//                 <strong>Expected Return:</strong> {suggestion.expected_return}%
//               </p>
//               <p>
//                 <strong>Investment Options:</strong>{" "}
//                 {suggestion.investment_options.join(", ")}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No recommendations yet. Please fill out the form and try again.</p>
//         )}
//       </div>

//       {/* Display Error */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default InvestmentRecommendation;
import React, { useState } from "react";
import axios from "axios";

const InvestmentRecommendation = () => {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState("");
  const [riskCapacity, setRiskCapacity] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const geminiChatAPI = async () => {
    setLoading(true);
    setError(null);

    try {
      // Prepare the content to be sent in the request to Gemini's API
      const promptText = `
        Given the salary of ${salary}, expenses of ${expenses}, a risk capacity of ${riskCapacity}, 
        and an expected annual return of ${expectedReturn}, provide 4-5 investment suggestions 
        in JSON format. Each suggestion should include 'category', 'recommendation', 
        'risk_profile', 'expected_return', and 'investment_options'.`;

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAnZRLoZ2nH-IX1Hczwxp1NfpuSao7YiaU",
        {
          contents: [
            {
              parts: [
                {
                  text: promptText, // Sending the dynamic content as the prompt
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract the response content from the JSON structure
      let geminiResponse = response.data.candidates[0].content.parts[0].text;

      // Clean up the response to remove any Markdown formatting
      geminiResponse = geminiResponse
        .replace(/^```json\n/, "")
        .replace(/\n```$/, ""); // Remove the "```json" and closing "```"

      // Log the cleaned-up response for debugging purposes
      console.log("Cleaned Gemini Response:", geminiResponse);

      // Now parse the cleaned-up JSON
      const parsedResponse = JSON.parse(geminiResponse);

      // If the response is already in the expected format, directly use it
      setRecommendations(parsedResponse); // Set the recommendations directly
    } catch (err) {
      console.error(err);
      setError("Error fetching recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    geminiChatAPI();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Investment Recommendation
        </h1>

        {/* User Input Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Salary:
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Expenses:
              </label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Risk Capacity (Low, Medium, High):
              </label>
              <input
                type="text"
                value={riskCapacity}
                onChange={(e) => setRiskCapacity(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Expected Annual Return (%):
              </label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Get Recommendations"}
          </button>
        </form>

        {/* Display Recommendations in Cards */}
        {recommendations.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((suggestion, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {suggestion.category}
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Recommendation:</strong> {suggestion.recommendation}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Risk Profile:</strong> {suggestion.risk_profile}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Expected Return:</strong> {suggestion.expected_return}
                  %
                </p>
                <p className="text-gray-600">
                  <strong>Investment Options:</strong>{" "}
                  {suggestion.investment_options.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Display Error */}
        {error && <p className="text-red-600 text-center mt-6">{error}</p>}
      </div>
    </div>
  );
};

export default InvestmentRecommendation;
