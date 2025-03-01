// import { useState, useRef, useEffect } from "react";
// import { Bar, Pie, Doughnut } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import Papa from "papaparse";
// import { useSelector } from "react-redux";

// Chart.register(...registerables);

// const Reports = () => {
//   const user = useSelector((state) => state.user);
//   const access = useSelector((state) => state?.user?.user?.access);
//   const chartRef = useRef(null);

//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedChart, setSelectedChart] = useState("Income vs Expenses");
//   const [selectedGraphType, setSelectedGraphType] = useState("Bar");

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8000/api/transactions/",
//           {
//             headers: {
//               Authorization: `Bearer ${access}`, // Add the access token
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await response.json();
//         setTransactions(data); // Set the fetched data
//       } catch (error) {
//         setError(error.message); // Set error message if request fails
//       } finally {
//         setLoading(false); // Set loading to false once the data is fetched
//       }
//     };

//     fetchData();
//   }, [access]);

//   // Prepare the data for the charts using the fetched transactions
//   const getCategoryData = () => {
//     const categories = {};
//     let totalIncome = 0;
//     let totalExpense = 0;

//     // Calculate totals and group transactions by category
//     transactions.forEach((transaction) => {
//       const amount = parseFloat(transaction.amount);
//       if (transaction.category === "Income") {
//         totalIncome += amount;
//       } else {
//         totalExpense += amount;
//       }
//       if (!categories[transaction.category]) {
//         categories[transaction.category] = 0;
//       }
//       categories[transaction.category] += amount;
//     });

//     const categoryLabels = Object.keys(categories);
//     const categoryValues = Object.values(categories);

//     return {
//       incomeExpenseData: {
//         labels: ["Income", "Expenses"],
//         datasets: [
//           {
//             label: "Amount (₹)",
//             data: [totalIncome, totalExpense],
//             backgroundColor: ["#4CAF50", "#F44336"],
//           },
//         ],
//       },
//       categoryData: {
//         labels: categoryLabels,
//         datasets: [
//           {
//             data: categoryValues,
//             backgroundColor: [
//               "#ff6384",
//               "#36a2eb",
//               "#ffce56",
//               "#4caf50",
//               "#8e44ad",
//             ],
//           },
//         ],
//       },
//     };
//   };

//   // Dropdown handlers
//   const handleChartChange = (event) => {
//     setSelectedChart(event.target.value);
//   };

//   const handleGraphTypeChange = (event) => {
//     setSelectedGraphType(event.target.value);
//   };

//   // Download CSV
//   const downloadCSV = () => {
//     const csv = Papa.unparse(transactions);
//     const blob = new Blob([csv], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "transactions_report.csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Download Chart as Image
//   const downloadChartAsImage = () => {
//     if (chartRef.current) {
//       const chart = chartRef.current;
//       const chartImage = chart.toBase64Image();
//       const link = document.createElement("a");
//       link.href = chartImage;
//       link.download = "chart_image.jpg";
//       link.click();
//     }
//   };

//   // Handle loading and error states
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const { incomeExpenseData, categoryData } = getCategoryData();

//   return (
//     <div className="p-6 w-full">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Reports</h2>
//         <div className="flex space-x-4">
//           <button
//             onClick={downloadChartAsImage}
//             className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
//           >
//             Download Chart as JPG
//           </button>
//           <button
//             onClick={downloadCSV}
//             className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
//           >
//             Download CSV
//           </button>
//         </div>
//       </div>

//       {/* Chart Selection Dropdown */}
//       <div className="mb-6">
//         <label htmlFor="chartSelect" className="mr-2 font-semibold">
//           Select Chart:
//         </label>
//         <select
//           id="chartSelect"
//           value={selectedChart}
//           onChange={handleChartChange}
//           className="p-2 border rounded"
//         >
//           <option value="Income vs Expenses">Income vs Expenses</option>
//           <option value="Category Breakdown">Category Breakdown</option>
//         </select>
//       </div>

//       {/* Graph Type Selection Dropdown */}
//       <div className="mb-6">
//         <label htmlFor="graphTypeSelect" className="mr-2 font-semibold">
//           Select Graph Type:
//         </label>
//         <select
//           id="graphTypeSelect"
//           value={selectedGraphType}
//           onChange={handleGraphTypeChange}
//           className="p-2 border rounded"
//         >
//           <option value="Bar">Bar</option>
//           <option value="Pie">Pie</option>
//           <option value="Doughnut">Donut</option>
//         </select>
//       </div>

//       {/* Chart Section */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {selectedChart === "Income vs Expenses" &&
//           selectedGraphType === "Bar" && (
//             <div className="bg-white p-4 shadow rounded-lg">
//               <h3 className="text-lg font-semibold mb-3">Income vs Expenses</h3>
//               <Bar ref={chartRef} data={incomeExpenseData} />
//             </div>
//           )}

//         {selectedChart === "Income vs Expenses" &&
//           selectedGraphType === "Pie" && (
//             <div className="bg-white p-4 shadow rounded-lg">
//               <h3 className="text-lg font-semibold mb-3">Income vs Expenses</h3>
//               <Pie ref={chartRef} data={incomeExpenseData} />
//             </div>
//           )}

//         {selectedChart === "Income vs Expenses" &&
//           selectedGraphType === "Doughnut" && (
//             <div className="bg-white p-4 shadow rounded-lg">
//               <h3 className="text-lg font-semibold mb-3">Income vs Expenses</h3>
//               <Doughnut ref={chartRef} data={incomeExpenseData} />
//             </div>
//           )}

//         {selectedChart === "Category Breakdown" &&
//           selectedGraphType === "Bar" && (
//             <div className="bg-white p-4 shadow rounded-lg">
//               <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
//               <Bar ref={chartRef} data={categoryData} />
//             </div>
//           )}

//         {selectedChart === "Category Breakdown" &&
//           selectedGraphType === "Pie" && (
//             <div className="bg-white p-4 shadow rounded-lg">
//               <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
//               <Pie ref={chartRef} data={categoryData} />
//             </div>
//           )}

//         {selectedChart === "Category Breakdown" &&
//           selectedGraphType === "Doughnut" && (
//             <div className="bg-white p-4 shadow rounded-lg">
//               <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
//               <Doughnut ref={chartRef} data={categoryData} />
//             </div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default Reports;
import { useState, useRef, useEffect } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Papa from "papaparse";
import { useSelector } from "react-redux";

Chart.register(...registerables);

const Reports = () => {
  const user = useSelector((state) => state.user);
  const access = useSelector((state) => state?.user?.user?.access);
  const chartRef = useRef(null);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChart, setSelectedChart] = useState("Income vs Expenses");
  const [selectedGraphType, setSelectedGraphType] = useState("Bar");

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/transactions/",
          {
            headers: {
              Authorization: `Bearer ${access}`, // Add the access token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setTransactions(data); // Set the fetched data
      } catch (error) {
        setError(error.message); // Set error message if request fails
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchData();
  }, [access]);

  // Prepare the data for the charts using the fetched transactions
  const getCategoryData = () => {
    const categories = {};
    let totalIncome = 0;
    let totalExpense = 0;

    // Calculate totals and group transactions by category
    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);

      // Ensure amount is a number and positive
      const parsedAmount = Math.abs(amount);

      if (transaction.transaction_type === "income") {
        totalIncome += parsedAmount;
      } else if (transaction.transaction_type === "expense") {
        totalExpense += parsedAmount;
      }

      // Group by category
      if (transaction.category) {
        if (!categories[transaction.category]) {
          categories[transaction.category] = 0;
        }
        categories[transaction.category] += parsedAmount;
      }
    });

    // Prepare chart data for Income vs Expenses
    const categoryLabels = Object.keys(categories);
    const categoryValues = Object.values(categories);

    return {
      incomeExpenseData: {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            label: "Amount (₹)",
            data: [totalIncome, totalExpense],
            backgroundColor: ["#4CAF50", "#F44336"],
          },
        ],
      },
      categoryData: {
        labels: categoryLabels,
        datasets: [
          {
            data: categoryValues,
            backgroundColor: [
              "#ff6384",
              "#36a2eb",
              "#ffce56",
              "#4caf50",
              "#8e44ad",
            ],
          },
        ],
      },
    };
  };

  // Dropdown handlers
  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  const handleGraphTypeChange = (event) => {
    setSelectedGraphType(event.target.value);
  };

  // Download CSV
  const downloadCSV = () => {
    const csv = Papa.unparse(transactions);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Chart as Image
  const downloadChartAsImage = () => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const chartImage = chart.toBase64Image();
      const link = document.createElement("a");
      link.href = chartImage;
      link.download = "chart_image.jpg";
      link.click();
    }
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { incomeExpenseData, categoryData } = getCategoryData();

  return (
    <div className="p-6 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reports</h2>
        <div className="flex space-x-4">
          <button
            onClick={downloadChartAsImage}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Download Chart as JPG
          </button>
          <button
            onClick={downloadCSV}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* Chart Selection Dropdown */}
      <div className="mb-6">
        <label htmlFor="chartSelect" className="mr-2 font-semibold">
          Select Chart:
        </label>
        <select
          id="chartSelect"
          value={selectedChart}
          onChange={handleChartChange}
          className="p-2 border rounded"
        >
          <option value="Income vs Expenses">Income vs Expenses</option>
          <option value="Category Breakdown">Category Breakdown</option>
        </select>
      </div>

      {/* Graph Type Selection Dropdown */}
      <div className="mb-6">
        <label htmlFor="graphTypeSelect" className="mr-2 font-semibold">
          Select Graph Type:
        </label>
        <select
          id="graphTypeSelect"
          value={selectedGraphType}
          onChange={handleGraphTypeChange}
          className="p-2 border rounded"
        >
          <option value="Bar">Bar</option>
          <option value="Pie">Pie</option>
          <option value="Doughnut">Donut</option>
        </select>
      </div>

      {/* Chart Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {selectedChart === "Income vs Expenses" &&
          selectedGraphType === "Bar" && (
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Income vs Expenses</h3>
              <Bar ref={chartRef} data={incomeExpenseData} />
            </div>
          )}

        {selectedChart === "Income vs Expenses" &&
          selectedGraphType === "Pie" && (
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Income vs Expenses</h3>
              <Pie ref={chartRef} data={incomeExpenseData} />
            </div>
          )}

        {selectedChart === "Income vs Expenses" &&
          selectedGraphType === "Doughnut" && (
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Income vs Expenses</h3>
              <Doughnut ref={chartRef} data={incomeExpenseData} />
            </div>
          )}

        {selectedChart === "Category Breakdown" &&
          selectedGraphType === "Bar" && (
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
              <Bar ref={chartRef} data={categoryData} />
            </div>
          )}

        {selectedChart === "Category Breakdown" &&
          selectedGraphType === "Pie" && (
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
              <Pie ref={chartRef} data={categoryData} />
            </div>
          )}

        {selectedChart === "Category Breakdown" &&
          selectedGraphType === "Doughnut" && (
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
              <Doughnut ref={chartRef} data={categoryData} />
            </div>
          )}
      </div>
    </div>
  );
};

export default Reports;
