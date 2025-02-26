import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="flex mt-[50px]">
        <div
          className={`bg-white text-black h-screen ${
            isOpen ? "w-64" : "w-20"
          } transition-all duration-300 ease-in-out fixed`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="  p-5 focus:outline-none w-full text-right text-4xl "
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
      </div>
      <div className="absolute xs:left-[20%] md:left-[8%] lg:left-[15%] xl:left-[18%] xxl:left-[20%]  p-15  shadow-cardShadow rounded-lg">
        <Outlet />
      </div>
    </>
  );
};

export default Wrapper;
