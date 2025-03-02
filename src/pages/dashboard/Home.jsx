import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // For accessing the access token
import { fetchGoal } from "../../services/GoalService"; // Assuming this service handles fetching goals
import { Bar, Pie } from "react-chartjs-2"; // Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [goals, setGoals] = useState([]);
  const [firstGoal, setFirstGoal] = useState(null);
  const [categoryData, setCategoryData] = useState([]); // For category breakdown

  const access = useSelector((state) => state?.user?.user?.access);

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/transactions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
        calculateTotal(data);
        calculateCategoryBreakdown(data); // Calculate category breakdown
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const calculatePercentage = (currentSavings, targetAmount) => {
    if (targetAmount === 0) return 0;
    return (
      (parseFloat(currentSavings) / parseFloat(targetAmount)) *
      100
    ).toFixed(2);
  };
  // Calculate the totals for income and expenses
  const calculateTotal = (transactions) => {
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
      if (transaction.transaction_type === "income") {
        income += parseFloat(transaction.amount);
      } else if (transaction.transaction_type === "expense") {
        expense += parseFloat(transaction.amount);
      }
    });
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  // Calculate category breakdown for the pie chart
  const calculateCategoryBreakdown = (transactions) => {
    const categoryMap = {};
    transactions.forEach((transaction) => {
      if (transaction.transaction_type === "expense") {
        const category = transaction.category;
        if (categoryMap[category]) {
          categoryMap[category] += parseFloat(transaction.amount);
        } else {
          categoryMap[category] = parseFloat(transaction.amount);
        }
      }
    });

    setCategoryData(
      Object.keys(categoryMap).map((category) => ({
        category,
        amount: categoryMap[category],
      }))
    );
  };

  // Fetch Financial Goals (First Goal)
  const fetchGoals = async () => {
    try {
      const response = await fetchGoal(access);
      if (response && response.length > 0) {
        setGoals(response);
        setFirstGoal(response[0]);
      }
    } catch (error) {
      console.error("Error fetching financial goals:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchGoals();
  }, [access]);

  // Income vs Expense Bar Chart Data
  const incomeExpenseData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#FF6347", "#FFD700"], // Playful Colors: Tomato (Income) and Gold (Expense)
        borderColor: ["#FF6347", "#FFD700"],
        borderWidth: 1,
      },
    ],
  };

  // Category Breakdown Pie Chart Data
  const categoryDataChart = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        label: "Category Breakdown",
        data: categoryData.map((item) => item.amount),
        backgroundColor: [
          "#FFB6C1", // Light Pink
          "#98FB98", // Pale Green
          "#FFDEAD", // Navajo White
          "#20B2AA", // Light Sea Green
          "#FF69B4", // Hot Pink
          "#ADD8E6", // Light Blue
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Financial Dashboard</h1>

      {/* Cards for Income, Expense, and Total Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Total Income</h2>
          <p className="text-4xl font-bold text-green-500">
            ${totalIncome.toFixed(2)}
          </p>
        </div>

        {/* Expense Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Total Expenses</h2>
          <p className="text-4xl font-bold text-red-500">
            ${totalExpense.toFixed(2)}
          </p>
        </div>

        {/* Total Goals Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Total Goals</h2>
          <p className="text-4xl font-bold text-blue-500">{goals.length}</p>
        </div>
      </div>

      {/* Display First Goal */}

      {firstGoal && (
        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex justify-between">
            <p className="font-medium">{firstGoal.goal_name}</p>
            <p className="text-gray-500">Target: {firstGoal.target_amount}</p>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width: `${calculatePercentage(
                  firstGoal.current_savings,
                  firstGoal.target_amount
                )}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {calculatePercentage(
              firstGoal.current_savings,
              firstGoal.target_amount
            )}
            % completed
          </p>
        </div>
      )}

      {/* Graphs for Income vs Expense and Category Breakdown */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income vs Expense Bar Chart */}
        <div
          className="bg-white p-6 rounded-lg shadow-md"
          style={{ height: "350px", width: "100%" }}
        >
          <h2 className="text-2xl font-semibold mb-4">Income vs Expense</h2>
          <Bar data={incomeExpenseData} options={{ responsive: true }} />
        </div>

        {/* Category Breakdown Pie Chart */}
        <div
          className="bg-white p-6 rounded-lg shadow-md"
          style={{ height: "350px", width: "100%" }}
        >
          <h2 className="text-2xl font-semibold mb-2 w-1 h-2">
            Expense Category Breakdown
          </h2>
          <Pie
            data={categoryDataChart}
            options={{ responsive: true }}
            className="ml-20"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
