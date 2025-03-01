// import { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useSelector } from "react-redux";

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [transactionToEdit, setTransactionToEdit] = useState(null);
//   const [transactionDetails, setTransactionDetails] = useState(null); // State to store transaction details

//   // Retrieve access token from Redux state
//   const access = useSelector((state) => state?.user?.user?.access);
//   const id = useSelector((state) => state?.user?.user?.user?.id);

//   // Categories for the transaction form
//   const categories = [
//     "Food",
//     "Salary",
//     "Rent",
//     "Groceries",
//     "Investments",
//     "Entertainment",
//     "Bills",
//     "Shopping",
//     "Other",
//   ];

//   // Fetch transactions on component mount
//   useEffect(() => {
//     if (access) {
//       fetchTransactions();
//     }
//   }, [access]);

//   // Fetch transaction data
//   const fetchTransactions = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/transactions/", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access}`, // Add Bearer token
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTransactions(data); // Set the transactions in state
//       } else {
//         console.error("Error fetching transactions:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   // Handle PUT (Update Transaction)
//   const handleUpdateTransaction = async (values) => {
//     try {
//       const adjustedAmount =
//         values.transaction_type === "expense"
//           ? -Math.abs(values.amount)
//           : Math.abs(values.amount);

//       const transactionData = {
//         description: values.description,
//         amount: adjustedAmount,
//         category: values.category,
//         payment_method: values.payment_method,
//         transaction_type: values.transaction_type,
//         user: id,
//       };

//       const response = await fetch(
//         `http://127.0.0.1:8000/api/transactions/${transactionToEdit.id}/`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access}`,
//           },
//           body: JSON.stringify(transactionData),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Transaction updated:", data);
//         setIsModalOpen(false);
//         fetchTransactions(); // Fetch updated transactions
//       } else {
//         console.error("Error updating transaction:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating transaction:", error);
//     }
//   };

//   // Handle DELETE (Delete Transaction)
//   const handleDeleteTransaction = async (transactionId) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/transactions/${transactionId}/`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access}`,
//           },
//         }
//       );

//       if (response.ok) {
//         console.log("Transaction deleted");
//         fetchTransactions(); // Fetch updated transactions
//       } else {
//         console.error("Error deleting transaction:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//     }
//   };

//   // Show transaction details
//   const handleViewDetails = (transaction) => {
//     setTransactionDetails(transaction); // Set the transaction to be displayed
//   };

//   const formik = useFormik({
//     initialValues: {
//       description: "",
//       amount: "",
//       category: "",
//       payment_method: "",
//       transaction_type: "expense", // default type
//     },
//     validationSchema: Yup.object({
//       description: Yup.string().required("Description is required"),
//       amount: Yup.number()
//         .required("Amount is required")
//         .positive("Amount must be a positive number"),
//       category: Yup.string().required("Category is required"),
//       payment_method: Yup.string(),
//       transaction_type: Yup.string().required("Transaction Type is required"),
//     }),
//     onSubmit: (values) => {
//       if (transactionToEdit) {
//         handleUpdateTransaction(values);
//       } else {
//         handleAddTransaction(values);
//       }
//     },
//   });

//   // Add a new transaction (POST request)
//   const handleAddTransaction = async (values) => {
//     try {
//       const adjustedAmount =
//         values.transaction_type === "expense"
//           ? -Math.abs(values.amount)
//           : Math.abs(values.amount);

//       const transactionData = {
//         description: values.description,
//         amount: adjustedAmount,
//         category: values.category,
//         payment_method: values.payment_method,
//         transaction_type: values.transaction_type,
//         user: id,
//       };

//       const response = await fetch("http://127.0.0.1:8000/api/transactions/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access}`, // Add Bearer token
//         },
//         body: JSON.stringify(transactionData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Transaction added:", data);
//         setIsModalOpen(false); // Close modal after successful submission
//         fetchTransactions(); // Fetch updated transactions
//       } else {
//         console.error("Error adding transaction:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error adding transaction:", error);
//     }
//   };

//   const openEditModal = (transaction) => {
//     setTransactionToEdit(transaction);
//     formik.setValues({
//       description: transaction.description,
//       amount: Math.abs(transaction.amount),
//       category: transaction.category,
//       payment_method: transaction.payment_method || "",
//       transaction_type: transaction.amount < 0 ? "expense" : "income",
//     });
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="p-6 w-full">
//       <h2 className="text-2xl font-bold mb-4">Transactions</h2>

//       <div className="grid grid-cols-3 gap-4">
//         {/* Total Income, Total Expenses, Net Balance */}
//       </div>

//       <div className="mt-6 bg-white shadow rounded-lg p-4">
//         <h3 className="text-lg font-semibold mb-4">All Transactions</h3>
//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2">Category</th>
//               <th className="p-2">Amount</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Payment Method</th>
//               <th className="p-2">Notes</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((tx) => (
//               <tr key={tx.id} className="border-b">
//                 <td className="p-2">{tx.category}</td>
//                 <td
//                   className={`p-2 ${
//                     tx.amount < 0 ? "text-red-500" : "text-green-500"
//                   }`}
//                 >
//                   {tx.amount}
//                 </td>
//                 <td className="p-2">{tx.date}</td>
//                 <td className="p-2">{tx.payment_method}</td>
//                 <td className="p-2 overflow-ellipsis">
//                   {tx.description.length > 10
//                     ? tx.description.slice(0, 10) + "..."
//                     : tx.description}
//                 </td>
//                 <button
//                   className="text-blue-500 mr-2"
//                   onClick={() => openEditModal(tx)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-500"
//                   onClick={() => handleDeleteTransaction(tx.id)}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   className="pl-2 text-green-500"
//                   onClick={() => handleViewDetails(tx)}
//                 >
//                   View Details
//                 </button>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Transaction Details Modal */}
//       {transactionDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//             <h3 className="text-2xl font-bold mb-4">Transaction Details</h3>
//             <p>
//               <strong>Description:</strong> {transactionDetails.description}
//             </p>
//             <p>
//               <strong>Amount:</strong> {transactionDetails.amount}
//             </p>
//             <p>
//               <strong>Category:</strong> {transactionDetails.category}
//             </p>
//             <p>
//               <strong>Payment Method:</strong>{" "}
//               {transactionDetails.payment_method}
//             </p>
//             <p>
//               <strong>Transaction Type:</strong>{" "}
//               {transactionDetails.transaction_type}
//             </p>
//             <button
//               className="mt-4 bg-gray-300 text-black p-2 rounded"
//               onClick={() => setTransactionDetails(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit Transaction Button */}
//       <button
//         className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg"
//         onClick={() => {
//           setTransactionToEdit(null); // Clear the edit mode
//           formik.resetForm(); // Reset form
//           setIsModalOpen(true);
//         }}
//       >
//         + Add Transaction
//       </button>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//             <h3 className="text-2xl font-bold mb-4">
//               {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
//             </h3>

//             <form onSubmit={formik.handleSubmit}>
//               {/* Form fields for description, amount, category, etc. */}
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   name="description"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.description}
//                 />
//                 {formik.touched.description && formik.errors.description && (
//                   <div className="text-red-500 text-xs">
//                     {formik.errors.description}
//                   </div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-semibold">Amount</label>
//                 <input
//                   type="number"
//                   name="amount"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.amount}
//                 />
//                 {formik.touched.amount && formik.errors.amount && (
//                   <div className="text-red-500 text-xs">
//                     {formik.errors.amount}
//                   </div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-semibold">Category</label>
//                 <select
//                   name="category"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.category}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category, index) => (
//                     <option key={index} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//                 {formik.touched.category && formik.errors.category && (
//                   <div className="text-red-500 text-xs">
//                     {formik.errors.category}
//                   </div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-semibold">
//                   Payment Method
//                 </label>
//                 <input
//                   type="text"
//                   name="payment_method"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.payment_method}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-semibold">
//                   Transaction Type
//                 </label>
//                 <select
//                   name="transaction_type"
//                   className="w-full p-2 border border-gray-300 rounded"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.transaction_type}
//                 >
//                   <option value="income">Income</option>
//                   <option value="expense">Expense</option>
//                 </select>
//                 {formik.touched.transaction_type &&
//                   formik.errors.transaction_type && (
//                     <div className="text-red-500 text-xs">
//                       {formik.errors.transaction_type}
//                     </div>
//                   )}
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="bg-gray-300 text-black p-2 rounded mr-4"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white p-2 rounded"
//                 >
//                   {transactionToEdit ? "Update Transaction" : "Add Transaction"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Transactions;
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Retrieve access token and user ID from Redux state
  const access = useSelector((state) => state?.user?.user?.access);
  const id = useSelector((state) => state?.user?.user?.user?.id);

  // Categories for the transaction form
  const categories = [
    "Food",
    "Salary",
    "Rent",
    "Groceries",
    "Investments",
    "Entertainment",
    "Bills",
    "Shopping",
    "Other",
  ];

  // Fetch transactions on component mount
  useEffect(() => {
    if (access) {
      fetchTransactions();
    }
  }, [access]);

  // Fetch transaction data
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/transactions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`, // Add Bearer token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data); // Set the transactions in state
        calculateTotal(data); // Calculate totals after fetching data
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle image upload and fetch transaction
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload the image to the server
      const formData = new FormData();
      formData.append("image", image);

      const uploadResponse = await fetch(
        "http://localhost:8000/api/process-image/",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      // 2. After successful upload, fetch the transaction data
      fetchTransactions();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals for Income, Expenses, and Net Balance
  const calculateTotal = (transactions) => {
    const income = transactions.filter(
      (tx) => tx.transaction_type === "income"
    );
    const expenses = transactions.filter(
      (tx) => tx.transaction_type === "expense"
    );

    const totalIncome = income.reduce((sum, tx) => sum + Number(tx.amount), 0);
    const totalExpenses = expenses.reduce(
      (sum, tx) => sum + Number(tx.amount),
      0
    );
    const netBalance = totalIncome + totalExpenses;

    setTotalIncome(totalIncome);
    setTotalExpenses(totalExpenses);
    setNetBalance(netBalance);
  };

  // Format numbers to currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-In", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  // Handle PUT (Update Transaction)
  const handleUpdateTransaction = async (values) => {
    try {
      const adjustedAmount =
        values.transaction_type === "expense"
          ? -Math.abs(values.amount)
          : Math.abs(values.amount);

      const transactionData = {
        description: values.description,
        amount: adjustedAmount,
        category: values.category,
        payment_method: values.payment_method,
        transaction_type: values.transaction_type,
        user: id,
      };

      const response = await fetch(
        `http://127.0.0.1:8000/api/transactions/${transactionToEdit.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify(transactionData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Transaction updated:", data);
        setIsModalOpen(false);
        fetchTransactions(); // Fetch updated transactions
      } else {
        console.error("Error updating transaction:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  // Handle DELETE (Delete Transaction)
  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/transactions/${transactionId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.ok) {
        console.log("Transaction deleted");
        fetchTransactions(); // Fetch updated transactions
      } else {
        console.error("Error deleting transaction:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Show transaction details
  const handleViewDetails = (transaction) => {
    setTransactionDetails(transaction); // Set the transaction to be displayed
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      amount: "",
      category: "",
      payment_method: "",
      transaction_type: "expense", // default type
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be a positive number"),
      category: Yup.string().required("Category is required"),
      payment_method: Yup.string(),
      transaction_type: Yup.string().required("Transaction Type is required"),
    }),
    onSubmit: (values) => {
      if (transactionToEdit) {
        handleUpdateTransaction(values);
      } else {
        handleAddTransaction(values);
      }
    },
  });

  // Add a new transaction (POST request)
  const handleAddTransaction = async (values) => {
    try {
      const adjustedAmount =
        values.transaction_type === "expense"
          ? -Math.abs(values.amount)
          : Math.abs(values.amount);

      const transactionData = {
        description: values.description,
        amount: adjustedAmount,
        category: values.category,
        payment_method: values.payment_method,
        transaction_type: values.transaction_type,
        user: id,
      };

      const response = await fetch("http://127.0.0.1:8000/api/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`, // Add Bearer token
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Transaction added:", data);
        setIsModalOpen(false); // Close modal after successful submission
        fetchTransactions(); // Fetch updated transactions
      } else {
        console.error("Error adding transaction:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const openEditModal = (transaction) => {
    setTransactionToEdit(transaction);
    formik.setValues({
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      category: transaction.category,
      payment_method: transaction.payment_method || "",
      transaction_type: transaction.amount < 0 ? "expense" : "income",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-black text-white p-2 rounded-md"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Total Income, Total Expenses, Net Balance */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Income</h3>
          <p>{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Expenses</h3>
          <p>{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Net Balance</h3>
          <p>{formatCurrency(netBalance)}</p>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">All Transactions</h3>
        <table className="w-full text-left overflow-x-scroll">
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
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b">
                <td className="p-2">{tx.category}</td>
                <td
                  className={`p-2 ${
                    tx.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {formatCurrency(tx.amount)}
                </td>
                <td className="p-2">{tx.date}</td>
                <td className="p-2">{tx.payment_method}</td>
                <td className="p-2 overflow-ellipsis">
                  {tx.description?.length > 10
                    ? tx.description.slice(0, 10) + "..."
                    : tx.description}
                </td>
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => openEditModal(tx)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteTransaction(tx.id)}
                >
                  Delete
                </button>
                <button
                  className="pl-2 text-green-500"
                  onClick={() => handleViewDetails(tx)}
                >
                  View Details
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Details Modal */}
      {transactionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-bold mb-4">Transaction Details</h3>
            <p>
              <strong>Description:</strong> {transactionDetails.description}
            </p>
            <p>
              <strong>Amount:</strong> {transactionDetails.amount}
            </p>
            <p>
              <strong>Category:</strong> {transactionDetails.category}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {transactionDetails.payment_method}
            </p>
            <p>
              <strong>Transaction Type:</strong>{" "}
              {transactionDetails.transaction_type}
            </p>
            <button
              className="mt-4 bg-gray-300 text-black p-2 rounded"
              onClick={() => setTransactionDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Transaction Button */}
      <button
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg"
        onClick={() => {
          setTransactionToEdit(null); // Clear the edit mode
          formik.resetForm(); // Reset form
          setIsModalOpen(true);
        }}
      >
        + Add Transaction
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-bold mb-4">
              {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
            </h3>

            <form onSubmit={formik.handleSubmit}>
              {/* Form fields for description, amount, category, etc. */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.amount}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Category</label>
                <select
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.category}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Payment Method
                </label>
                <input
                  type="text"
                  name="payment_method"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payment_method}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Transaction Type
                </label>
                <select
                  name="transaction_type"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.transaction_type}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 text-black p-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
