import { useState } from "react";
import { Link } from "react-router-dom";

const Transactions = () => {
  const transactions = [
    {
      category: "Food",
      amount: "-₹500",
      date: "2023-06-15",
      method: "UPI",
      notes: "Lunch with colleagues",
    },
    {
      category: "Salary",
      amount: "₹50,000",
      date: "2023-06-01",
      method: "Bank Transfer",
      notes: "Monthly salary",
    },
    {
      category: "Rent",
      amount: "-₹15,000",
      date: "2023-06-05",
      method: "Bank Transfer",
      notes: "Monthly rent",
    },
    {
      category: "Groceries",
      amount: "-₹2,000",
      date: "2023-06-10",
      method: "Credit Card",
      notes: "Weekly groceries",
    },
    {
      category: "Investments",
      amount: "-₹10,000",
      date: "2023-06-07",
      method: "Bank Transfer",
      notes: "Monthly SIP",
    },
  ];

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <p className="text-gray-600">Total Income</p>
          <p className="text-green-500 font-bold text-lg">₹50,000</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <p className="text-gray-600">Total Expenses</p>
          <p className="text-red-500 font-bold text-lg">₹27,500</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <p className="text-gray-600">Net Balance</p>
          <p className="text-blue-500 font-bold text-lg">₹22,500</p>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">All Transactions</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2">Payment Method</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{tx.category}</td>
                <td
                  className={`p-2 ${
                    tx.amount.includes("-") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {tx.amount}
                </td>
                <td className="p-2">{tx.date}</td>
                <td className="p-2">{tx.method}</td>
                <td className="p-2">{tx.notes}</td>
                <td className="p-2">
                  <button className="text-blue-500 mr-2">Edit</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg">
        + Add Transaction
      </button>
    </div>
  );
};

export default Transactions;
