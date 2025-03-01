import React, { useState } from "react";

const DataCollection = ({ onSubmit }) => {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ salary, expenses });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Financial Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Monthly Salary ($):
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Monthly Expenses ($):
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
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

export default DataCollection;
