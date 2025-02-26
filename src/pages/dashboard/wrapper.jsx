// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../../components/Header";
// import { Outlet } from "react-router-dom";
// const Wrapper = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <Header />
//       <div className="flex mt-[50px]">
//         <div
//           className={`bg-white text-black h-screen ${
//             isOpen ? "w-64" : "w-20"
//           } transition-all duration-300 ease-in-out fixed`}
//         >
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="  p-5 focus:outline-none w-full text-right text-4xl "
//           >
//             {isOpen ? "← " : "→"}
//           </button>

//           <ul className="space-y-4 px-2">
//             <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
//               <Link to="/dashboard/home" className="flex items-center w-full">
//                 <span>🏠</span>
//                 {isOpen && <span className="ml-2">Home</span>}
//               </Link>
//             </li>

//             <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
//               <Link
//                 to="/dashboard/transaction"
//                 className="flex items-center w-full"
//               >
//                 <span>💵</span>
//                 {isOpen && <span className="ml-2">Transaction</span>}
//               </Link>
//             </li>

//             <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
//               <Link to="/dashboard/goals" className="flex items-center w-full">
//                 <span>💱</span>
//                 {isOpen && <span className="ml-2">Goals</span>}
//               </Link>
//             </li>
//             <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
//               <Link
//                 to="/dashboard/investments"
//                 className="flex items-center w-full"
//               >
//                 <span>💰</span>
//                 {isOpen && <span className="ml-2">Investments</span>}
//               </Link>
//             </li>

//             <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
//               <Link
//                 to="/dashboard/reports"
//                 className="flex items-center w-full"
//               >
//                 <span>📃</span>
//                 {isOpen && <span className="ml-2">Reports</span>}
//               </Link>
//             </li>

//             <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-300">
//               <Link
//                 to="/dashboard/settings"
//                 className="flex items-center w-full"
//               >
//                 <span>⚙️</span>
//                 {isOpen && <span className="ml-2">Settings</span>}
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="absolute xs:left-[20%] md:left-[8%] lg:left-[15%] xl:left-[18%] xxl:left-[20%] bg-site-green p-15 text-white shadow-cardShadow rounded-lg">
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default Wrapper;
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header className="bg-white text-black shadow-md p-4" />
      <div className="flex mt-[50px]">
        <div
          className={`bg-white text-black h-screen ${
            isOpen ? "w-64" : "w-20"
          } transition-all duration-300 ease-in-out fixed shadow-md rounded-r-lg p-4 border-r border-gray-300`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 w-full text-right text-4xl focus:outline-none hover:text-gray-600 transition duration-300"
          >
            {isOpen ? "←" : "→"}
          </button>

          <ul className="space-y-4 px-2">
            {[
              { to: "/dashboard/home", icon: "🏠", label: "Home" },
              {
                to: "/dashboard/transaction",
                icon: "💵",
                label: "Transaction",
              },
              { to: "/dashboard/goals", icon: "💱", label: "Goals" },
              {
                to: "/dashboard/investments",
                icon: "💰",
                label: "Investments",
              },
              { to: "/dashboard/reports", icon: "📃", label: "Reports" },
              { to: "/dashboard/settings", icon: "⚙️", label: "Settings" },
            ].map(({ to, icon, label }) => (
              <li
                key={to}
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-200 transition duration-300 hover:shadow-sm hover:scale-105"
              >
                <Link to={to} className="flex items-center w-full">
                  <span className="text-xl">{icon}</span>
                  {isOpen && (
                    <span className="ml-3 text-lg font-medium">{label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute xs:left-[20%] md:left-[8%] lg:left-[15%] xl:left-[18%] xxl:left-[20%] bg-white p-10 text-black shadow-md rounded-lg transition-all duration-300 border border-gray-300">
        <Outlet />
      </div>
    </>
  );
};

export default Wrapper;
