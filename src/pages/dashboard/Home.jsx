import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Home = () => {
  const portfolioData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Portfolio Value",
        data: [1000000, 1050000, 1100000, 1150000, 1200000, 1234567],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const assetData = {
    labels: ["Stocks", "Bonds", "Real Estate", "Cash"],
    datasets: [
      {
        label: "Asset Allocation",
        data: [50, 20, 20, 10],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-full mx-auto px-8 py-8">
        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow transition-transform duration-300 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Bank Balance
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-3">₹2,345,678</p>
            <p className="text-green-500 flex items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              +20% from last month
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow transition-transform duration-300 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">
              Monthly Income
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-3">₹150,000</p>
            <p className="text-green-500 flex items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              +2.5% from last month
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow transition-transform duration-300 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">
              Monthly Expenses
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-3">₹85,000</p>
            <p className="text-red-500 flex items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
              +4.1% from last month
            </p>
          </div>
        </div>

        {/* Goal Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Goal Progress
          </h2>
          <p className="text-gray-600 mb-4">₹5,000,000 goal for 2 years</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              style={{ width: "24%" }}
            ></div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow h-96">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Portfolio Value
            </h2>
            <Bar
              data={portfolioData}
              options={{ maintainAspectRatio: false }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow h-96">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Asset Allocation
            </h2>
            <Pie data={assetData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow">
        <div className="max-w-full mx-auto px-8 py-4 text-center text-gray-600">
          © 2025 My Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
