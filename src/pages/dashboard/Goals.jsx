// import { useState, useEffect } from "react";
// import { addGoal, fetchGoal } from "../../services/GoalService";
// import { useSelector } from "react-redux";
// import { Formik } from "formik";
// import formatDateToYYYYMMDD from "../../utils/commonHelper";

// const Goals = () => {
//   const user = useSelector((state) => state.user);
//   const [showAddGoalForm, setShowAddGoalForm] = useState(false);
//   const [goals, setGoals] = useState([]);
//   const access = useSelector((state) => state?.user?.user?.access);
//   const [newGoal, setNewGoal] = useState({
//     goal_name: "",
//     target_amount: null,
//     current_savings: null,
//     deadline: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userId = user?.user?.user?.id;
//         if (!userId) return;

//         const data = await fetchGoal(access); // Assuming fetchGoal returns a promise
//         console.log("Goal data", data); // Log the fetched data

//         // Check if data is an array and set it correctly
//         if (Array.isArray(data)) {
//           setGoals(data); // No need to wrap it in another array
//         } else {
//           console.error("Expected data to be an array, but got:", data);
//         }
//       } catch (err) {
//         console.error("Error fetching goals", err);
//       }
//     };

//     fetchData();
//   }, [access]);

//   useEffect(() => {
//     console.log("Updated goals", goals); // Log the updated goals state
//   }, [goals]); // This will run every time `goals` changes

//   const handleSubmit = async (values) => {
//     const userId = user?.user?.user?.id;
//     if (!userId) return;

//     // Convert values to appropriate types before sending to the backend
//     const goalData = {
//       ...values,
//       target_amount: parseFloat(values.target_amount), // Convert to number
//       current_savings: parseFloat(values.current_savings), // Convert to number
//       deadline: formatDateToYYYYMMDD(values.deadline), // Convert to Date object if needed
//       user: userId,
//     };

//     try {
//       console.log(goalData);

//       const newGoalData = await addGoal(access, goalData);
//       console.log("Added goal", newGoalData);
//       setGoals((prevData) => [...prevData, newGoalData]);
//       setShowAddGoalForm(false); // Close the form after adding goal
//     } catch (err) {
//       console.error("Error adding goal", err);
//     }
//   };

//   const calculatePercentage = (currentSavings, targetAmount) => {
//     if (targetAmount === 0) return 0;
//     return (
//       (parseFloat(currentSavings) / parseFloat(targetAmount)) *
//       100
//     ).toFixed(2);
//   };

//   return (
//     <div className="p-6 w-full">
//       <h2 className="text-2xl font-bold mb-4">Goals</h2>

//       <div className="bg-white shadow rounded-lg p-4">
//         <h3 className="text-lg font-semibold mb-4">Your Financial Goals</h3>

//         <div className="space-y-4">
//           {goals && goals.length > 0 ? (
//             goals.map((goal, index) => (
//               <div key={index} className="p-4 border rounded-lg shadow-sm">
//                 <div className="flex justify-between">
//                   <p className="font-medium">{goal.goal_name}</p>
//                   <p className="text-gray-500">Target: {goal.target_amount}</p>
//                 </div>
//                 <div className="mt-2 bg-gray-200 rounded-full h-3">
//                   <div
//                     className="bg-green-500 h-3 rounded-full"
//                     style={{
//                       width: `${calculatePercentage(
//                         goal.current_savings,
//                         goal.target_amount
//                       )}%`,
//                     }}
//                   ></div>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {calculatePercentage(
//                     goal.current_savings,
//                     goal.target_amount
//                   )}
//                   % completed
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No goals available.</p>
//           )}
//         </div>
//       </div>

//       <button
//         className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg"
//         onClick={() => setShowAddGoalForm(true)}
//       >
//         + Add Goal
//       </button>

//       {showAddGoalForm && (
//         <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>

//             <Formik
//               initialValues={newGoal}
//               onSubmit={handleSubmit}
//               validate={(values) => {
//                 const errors = {};
//                 if (!values.goal_name) {
//                   errors.goal_name = "Goal name is required";
//                 }
//                 if (!values.target_amount || values.target_amount <= 0) {
//                   errors.target_amount = "Target amount must be greater than 0";
//                 }
//                 if (!values.current_savings || values.current_savings < 0) {
//                   errors.current_savings = "Current savings cannot be negative";
//                 }
//                 if (!values.deadline) {
//                   errors.deadline = "Deadline is required";
//                 }
//                 return errors;
//               }}
//             >
//               {({
//                 handleChange,
//                 handleBlur,
//                 handleSubmit,
//                 values,
//                 touched,
//                 errors,
//               }) => (
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label
//                       className="block mb-2 text-sm font-medium"
//                       htmlFor="goal_name"
//                     >
//                       Goal Name
//                     </label>
//                     <input
//                       type="text"
//                       id="goal_name"
//                       name="goal_name"
//                       value={values.goal_name}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className="w-full p-2 border rounded"
//                     />
//                     {touched.goal_name && errors.goal_name && (
//                       <p className="text-red-500 text-sm">{errors.goal_name}</p>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block mb-2 text-sm font-medium"
//                       htmlFor="target_amount"
//                     >
//                       Target Amount
//                     </label>
//                     <input
//                       type="number"
//                       id="target_amount"
//                       name="target_amount"
//                       value={values.target_amount}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className="w-full p-2 border rounded"
//                     />
//                     {touched.target_amount && errors.target_amount && (
//                       <p className="text-red-500 text-sm">
//                         {errors.target_amount}
//                       </p>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block mb-2 text-sm font-medium"
//                       htmlFor="current_savings"
//                     >
//                       Current Savings
//                     </label>
//                     <input
//                       type="number"
//                       id="current_savings"
//                       name="current_savings"
//                       value={values.current_savings}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className="w-full p-2 border rounded"
//                     />
//                     {touched.current_savings && errors.current_savings && (
//                       <p className="text-red-500 text-sm">
//                         {errors.current_savings}
//                       </p>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label
//                       className="block mb-2 text-sm font-medium"
//                       htmlFor="deadline"
//                     >
//                       Deadline
//                     </label>
//                     <input
//                       type="date"
//                       id="deadline"
//                       name="deadline"
//                       value={values.deadline}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className="w-full p-2 border rounded"
//                     />
//                     {touched.deadline && errors.deadline && (
//                       <p className="text-red-500 text-sm">{errors.deadline}</p>
//                     )}
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-black text-white py-2 rounded"
//                   >
//                     Add Goal
//                   </button>
//                 </form>
//               )}
//             </Formik>

//             <button
//               onClick={() => setShowAddGoalForm(false)}
//               className="mt-4 w-full text-center text-sm text-gray-500"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Goals;
import { useState, useEffect } from "react";
import { addGoal, fetchGoal, updateGoal } from "../../services/GoalService";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import formatDateToYYYYMMDD from "../../utils/commonHelper";

const Goals = () => {
  const user = useSelector((state) => state.user);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [goals, setGoals] = useState([]);
  const [unalocatedFunds, setUnallocatedFunds] = useState(0); // Track unallocated funds
  const access = useSelector((state) => state?.user?.user?.access);
  const [newGoal, setNewGoal] = useState({
    goal_name: "",
    target_amount: null,
    current_savings: null,
    deadline: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.user?.user?.id;
        if (!userId) return;

        // Fetch goals
        const goalData = await fetchGoal(access);
        console.log("Goal data", goalData);

        // Fetch unallocated funds
        const savingsData = await fetchUnallocatedFunds(access);
        console.log("Unallocated funds", savingsData);

        if (Array.isArray(goalData)) {
          setGoals(goalData);
        } else {
          console.error("Goal data is not in the expected format", goalData);
        }

        if (savingsData?.amount) {
          setUnallocatedFunds(savingsData.amount); // Assuming the response has 'amount' field
        } else {
          console.error("Failed to fetch unallocated funds");
        }
      } catch (err) {
        console.error("Error fetching goals or unallocated funds", err);
      }
    };

    fetchData();
  }, [access]);

  useEffect(() => {
    console.log("Updated goals", goals);
  }, [goals]);

  const handleSubmit = async (values) => {
    const userId = user?.user?.user?.id;
    if (!userId) return;

    const goalData = {
      ...values,
      target_amount: parseFloat(values.target_amount),
      current_savings: parseFloat(values.current_savings),
      deadline: formatDateToYYYYMMDD(values.deadline),
      user: userId,
    };

    try {
      console.log(goalData);
      const newGoalData = await addGoal(access, goalData);
      console.log("Added goal", newGoalData);
      setGoals((prevData) => [...prevData, newGoalData]);
      setShowAddGoalForm(false);
    } catch (err) {
      console.error("Error adding goal", err);
    }
  };

  const allocateFundsToGoal = async (goalId, amount) => {
    try {
      if (amount <= 0 || amount > unalocatedFunds) {
        alert("Invalid allocation amount");
        return;
      }

      // Update the goal with the allocated funds
      const updatedGoal = {
        current_savings: parseFloat(amount), // Allocate the selected amount
      };

      const updatedData = await updateGoal(access, goalId, updatedGoal);
      console.log("Goal updated with allocated funds", updatedData);

      // Update the goals state with the updated goal
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId
            ? { ...goal, current_savings: goal.current_savings + amount }
            : goal
        )
      );

      // Update unallocated funds after allocation
      setUnallocatedFunds((prevFunds) => prevFunds - amount);
    } catch (err) {
      console.error("Error allocating funds to goal", err);
    }
  };

  const calculatePercentage = (currentSavings, targetAmount) => {
    if (targetAmount === 0) return 0;
    return (
      (parseFloat(currentSavings) / parseFloat(targetAmount)) *
      100
    ).toFixed(2);
  };

  // Fetch unallocated funds from the backend
  const fetchUnallocatedFunds = async (access) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/savings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error fetching unallocated funds");
      }
    } catch (err) {
      console.error("Error fetching unallocated funds", err);
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Goals</h2>

      {/* Display Unallocated Funds */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-4">Unallocated Funds</h3>
        <p className="text-xl font-medium">Amount: ${unalocatedFunds}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Your Financial Goals</h3>

        <div className="space-y-4">
          {goals && goals.length > 0 ? (
            goals.map((goal, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <p className="font-medium">{goal.goal_name}</p>
                  <p className="text-gray-500">Target: {goal.target_amount}</p>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        goal.current_savings,
                        goal.target_amount
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {calculatePercentage(
                    goal.current_savings,
                    goal.target_amount
                  )}
                  % completed
                </p>

                {/* Allocate Funds Button */}
                <button
                  onClick={() => allocateFundsToGoal(goal.id, unalocatedFunds)}
                  className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Allocate Unallocated Funds
                </button>
              </div>
            ))
          ) : (
            <p>No goals available.</p>
          )}
        </div>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowAddGoalForm(true)}
      >
        + Add Goal
      </button>

      {showAddGoalForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>

            <Formik
              initialValues={newGoal}
              onSubmit={handleSubmit}
              validate={(values) => {
                const errors = {};
                if (!values.goal_name) {
                  errors.goal_name = "Goal name is required";
                }
                if (!values.target_amount || values.target_amount <= 0) {
                  errors.target_amount = "Target amount must be greater than 0";
                }
                if (!values.current_savings || values.current_savings < 0) {
                  errors.current_savings = "Current savings cannot be negative";
                }
                if (!values.deadline) {
                  errors.deadline = "Deadline is required";
                }
                return errors;
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium"
                      htmlFor="goal_name"
                    >
                      Goal Name
                    </label>
                    <input
                      type="text"
                      id="goal_name"
                      name="goal_name"
                      value={values.goal_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border rounded"
                    />
                    {touched.goal_name && errors.goal_name && (
                      <p className="text-red-500 text-sm">{errors.goal_name}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium"
                      htmlFor="target_amount"
                    >
                      Target Amount
                    </label>
                    <input
                      type="number"
                      id="target_amount"
                      name="target_amount"
                      value={values.target_amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border rounded"
                    />
                    {touched.target_amount && errors.target_amount && (
                      <p className="text-red-500 text-sm">
                        {errors.target_amount}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium"
                      htmlFor="current_savings"
                    >
                      Current Savings
                    </label>
                    <input
                      type="number"
                      id="current_savings"
                      name="current_savings"
                      value={values.current_savings}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border rounded"
                    />
                    {touched.current_savings && errors.current_savings && (
                      <p className="text-red-500 text-sm">
                        {errors.current_savings}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium"
                      htmlFor="deadline"
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={values.deadline}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border rounded"
                    />
                    {touched.deadline && errors.deadline && (
                      <p className="text-red-500 text-sm">{errors.deadline}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded"
                  >
                    Add Goal
                  </button>
                </form>
              )}
            </Formik>

            <button
              onClick={() => setShowAddGoalForm(false)}
              className="mt-4 w-full text-center text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
