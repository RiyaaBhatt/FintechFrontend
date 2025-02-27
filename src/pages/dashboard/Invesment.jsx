import { useState } from "react";

const Investments = () => {
  const [investments, setInvestments] = useState([
    { type: "Stocks", amount: "₹1,50,000", returns: "+12%" },
    { type: "Mutual Funds", amount: "₹80,000", returns: "+8%" },
    { type: "Fixed Deposit", amount: "₹1,00,000", returns: "+6%" },
    { type: "Crypto", amount: "₹50,000", returns: "-5%" },
  ]);

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Investments</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Your Investments</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Investment Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Returns</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{inv.type}</td>
                <td className="p-2">{inv.amount}</td>
                <td
                  className={`p-2 ${
                    inv.returns.includes("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {inv.returns}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg">
        + Add Investment
      </button>
    </div>
  );
};

export default Investments;
