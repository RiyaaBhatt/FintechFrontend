import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

Chart.register(...registerables);

const Reports = () => {
  const transactions = [
    { category: "Food", amount: 500, date: "2023-06-15", method: "UPI" },
    {
      category: "Salary",
      amount: 50000,
      date: "2023-06-01",
      method: "Bank Transfer",
    },
    {
      category: "Rent",
      amount: 15000,
      date: "2023-06-05",
      method: "Bank Transfer",
    },
    {
      category: "Groceries",
      amount: 2000,
      date: "2023-06-10",
      method: "Credit Card",
    },
    {
      category: "Investments",
      amount: 10000,
      date: "2023-06-07",
      method: "Bank Transfer",
    },
  ];

  const incomeExpenseData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [50000, 27500],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const categoryData = {
    labels: ["Food", "Salary", "Rent", "Groceries", "Investments"],
    datasets: [
      {
        data: [500, 50000, 15000, 2000, 10000],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4caf50",
          "#8e44ad",
        ],
      },
    ],
  };

  // Function to download report as CSV
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

  // Function to download report as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["Category", "Amount (₹)", "Date", "Payment Method"]],
      body: transactions.map((t) => [t.category, t.amount, t.date, t.method]),
    });
    doc.save("transactions_report.pdf");
  };

  return (
    <div className="p-6 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reports</h2>
        <div className="flex space-x-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Download PDF
          </button>
          <button
            onClick={downloadCSV}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Income vs Expenses</h3>
          <Bar data={incomeExpenseData} />
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
          <Pie data={categoryData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
