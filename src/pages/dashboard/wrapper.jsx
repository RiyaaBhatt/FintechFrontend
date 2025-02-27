import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Header at the top */}
      <Header />

      {/* Sidebar + Main Content Wrapper */}
      <div className="flex h-screen mt-[50px]">
        {/* Sidebar (now below the header) */}
        <div
          className={`bg-white text-black h-full shadow-md transition-all duration-300 ease-in-out ${
            isOpen ? "w-64" : "w-20"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-5 focus:outline-none w-full text-right text-4xl"
          >
            {isOpen ? "← " : "→"}
          </button>

          <ul className="space-y-4 px-2">
            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
              <Link to="/dashboard/home" className="flex items-center w-full">
                <span>🏠</span>
                {isOpen && <span className="ml-2">Home</span>}
              </Link>
            </li>

            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
              <Link
                to="/dashboard/transaction"
                className="flex items-center w-full"
              >
                <span>💵</span>
                {isOpen && <span className="ml-2">Transaction</span>}
              </Link>
            </li>

            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
              <Link to="/dashboard/goals" className="flex items-center w-full">
                <span>💱</span>
                {isOpen && <span className="ml-2">Goals</span>}
              </Link>
            </li>

            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
              <Link
                to="/dashboard/investments"
                className="flex items-center w-full"
              >
                <span>💰</span>
                {isOpen && <span className="ml-2">Investments</span>}
              </Link>
            </li>

            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
              <Link
                to="/dashboard/reports"
                className="flex items-center w-full"
              >
                <span>📃</span>
                {isOpen && <span className="ml-2">Reports</span>}
              </Link>
            </li>

            <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
              <Link
                to="/dashboard/settings"
                className="flex items-center w-full"
              >
                <span>⚙️</span>
                {isOpen && <span className="ml-2">Settings</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area (takes remaining space) */}
        <div className="flex-1 p-6 shadow-card rounded-lg">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Wrapper;
