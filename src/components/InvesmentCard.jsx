import React, { useState } from "react";

const InvestmentCard = ({ onSelect }) => {
  const investments = [
    { id: 1, name: "Stocks", description: "High risk, high reward" },
    { id: 2, name: "Bonds", description: "Low risk, steady returns" },
    {
      id: 3,
      name: "Real Estate",
      description: "Moderate risk, long-term growth",
    },
    { id: 4, name: "Cryptocurrency", description: "Very high risk, volatile" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {investments.map((investment) => (
        <div
          key={investment.id}
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition"
          onClick={() => onSelect(investment)}
        >
          <h3 className="text-xl font-bold mb-2">{investment.name}</h3>
          <p className="text-gray-600">{investment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InvestmentCard;
