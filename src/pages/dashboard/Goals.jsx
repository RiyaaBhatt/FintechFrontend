import { useState } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([
    { title: "Save for Vacation", target: "₹50,000", progress: 60 },
    { title: "Buy a New Laptop", target: "₹80,000", progress: 40 },
    { title: "Emergency Fund", target: "₹1,00,000", progress: 25 },
  ]);

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Goals</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Your Financial Goals</h3>

        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <p className="font-medium">{goal.title}</p>
                <p className="text-gray-500">Target: {goal.target}</p>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {goal.progress}% completed
              </p>
            </div>
          ))}
        </div>
      </div>

      <button className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg">
        + Add Goal
      </button>
    </div>
  );
};

export default Goals;
