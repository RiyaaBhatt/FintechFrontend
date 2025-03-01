import { useState, useEffect } from "react";
import { fetchInvestment, addInvestment } from "../../services/GoalService"; // Assuming addInvestment is a function in GoalService
import { useDispatch, useSelector } from "react-redux";
import InvestmentRecommendation from "../../components/InvesmentRecommandation.Main";

const Investments = () => {
  const dispatch = useDispatch();
  const [investments, setInvesmentData] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [newInvestment, setNewInvestment] = useState({
    investment_type: "",
    amount: "",
    category: "",
  });
  const user = useSelector((state) => state.user);

  // Fetch Investments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.user?.user?.id;
        console.log("userId", userId);
        if (!userId) return;

        const data = await fetchInvestment(userId);
        console.log("Investment data", data);

        if (Array.isArray(data)) {
          setInvesmentData(data);
        } else {
          console.error("Data is not in the expected format");
        }
      } catch (err) {
        console.error("Error fetching investments", err);
      }
    };

    fetchData();
  }, [user?.user?.user?.id]); // Add userId to dependencies

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInvestment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (add investment)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.user?.user?.id;
    if (!userId) return;

    try {
      const d = { ...newInvestment, user: userId };
      const newInvestmentData = await addInvestment(userId, d);
      console.log("Added investment", newInvestmentData);
      setInvesmentData((prevData) => [...prevData, newInvestmentData]); // Add new investment to the state
      setShowModal(false); // Close the modal after adding investment
    } catch (err) {
      console.error("Error adding investment", err);
    }
  };

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
              <th className="p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{inv?.investment_type || ""}</td>
                <td className="p-2">{inv?.amount}</td>
                <td className="p-2">{inv?.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowModal(true)} // Show modal on click
      >
        + Add Investment
      </button>

      {/* Modal for adding new investment */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add Investment</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Investment Type
                </label>
                <input
                  type="text"
                  name="investment_type"
                  value={newInvestment.investment_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter investment type"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={newInvestment.amount}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={newInvestment.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter category"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)} // Close modal without adding
                  className="bg-gray-300 text-black p-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white p-2 rounded-md"
                >
                  Add Investment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <InvestmentRecommendation />
    </div>
  );
};

export default Investments;
