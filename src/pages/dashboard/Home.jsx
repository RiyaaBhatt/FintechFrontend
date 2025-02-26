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
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Total Bank Balance</h2>
          <p className="text-2xl font-bold">₹2,345,678</p>
          <p className="text-green-500">+20% from last month</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Monthly Income</h2>
          <p className="text-2xl font-bold">₹150,000</p>
          <p className="text-green-500">+2.5% from last month</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Monthly Expenses</h2>
          <p className="text-2xl font-bold">₹85,000</p>
          <p className="text-red-500">+4.1% from last month</p>
        </div>
      </div>
      <div className="my-4 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold">Goal Progress</h2>
        <p>₹5,000,000 goal for 2 years</p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-black h-4 rounded-full" style={{ width: "24%" }}></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Portfolio Value</h2>
          <Bar data={portfolioData} />
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Asset Allocation</h2>
          <Pie data={assetData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
