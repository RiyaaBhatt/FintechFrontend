import { useState, useEffect } from "react";
import { addGoal, fetchGoal } from "../../services/GoalService";
import { useSelector } from "react-redux";
import { Formik } from "formik";

const Goals = () => {
  const user = useSelector((state) => state.user);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [goals, setGoals] = useState([]);
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
        console.log("userId", userId);
        if (!userId) return;

        const data = await fetchGoal(userId); // Assuming fetchGoal returns a promise
        console.log("Goal data", data);

        // Check if data is an array and set it correctly
        if (data.staus == 200) {
          setGoals(data); // No need to wrap it in another array
        } else {
          console.error("Data is not in the expected format");
        }
      } catch (err) {
        console.error("Error fetching goals", err);
      } finally {
        console.log("finally block", goals);
      }
    };

    fetchData();
  }, [user?.user?.user?.id]);

  const handleSubmit = async (values) => {
    const userId = user?.user?.user?.id;
    if (!userId) return;

    // Convert values to appropriate types before sending to the backend
    const goalData = {
      ...values,
      target_amount: parseFloat(values.target_amount), // Convert to number
      current_savings: parseFloat(values.current_savings), // Convert to number
      deadline: new Date(values.deadline), // Convert to Date object if needed
      user: userId,
    };

    try {
      const newGoalData = await addGoal(userId, goalData);
      console.log("Added goal", newGoalData);
      setGoals((prevData) => [...prevData, newGoalData]);
      setShowAddGoalForm(false); // Close the form after adding goal
    } catch (err) {
      console.error("Error adding goal", err);
    }
  };
  const calculatePercentage = (currentSavings, targetAmount) => {
    if (targetAmount === 0) return 0;
    return (
      (parseFloat(currentSavings) / parseFloat(targetAmount)) *
      100
    ).toFixed(2);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Goals</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Your Financial Goals</h3>

        <div className="space-y-4">
          {goals.map((goal, index) => (
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
                {calculatePercentage(goal.current_savings, goal.target_amount)}%
                completed
              </p>
            </div>
          ))}
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
