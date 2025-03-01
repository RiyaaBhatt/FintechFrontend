import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const FollowUpPrompt = ({ onSubmit }) => {
  const [riskCapacity, setRiskCapacity] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ riskCapacity, expectedReturn });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Tell Us More</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Risk Capacity (1-10):
          <input
            type="number"
            min="1"
            max="10"
            value={riskCapacity}
            onChange={(e) => setRiskCapacity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expected Annual Return (%):
          <input
            type="number"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default FollowUpPrompt;
