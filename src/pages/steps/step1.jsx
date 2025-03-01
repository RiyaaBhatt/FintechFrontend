// import React, { useState } from "react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import InputType from "../../components/InputType";
// import validationSchemas from "../../validations/multistepValidationSchema";
// import { paths } from "../../routes/path";
// import { useSelector } from "react-redux";
// import formatDateToYYYYMMDD from "../../utils/commonHelper";
// import {
//   updateUserProfile,
//   addBudgetCategory,
//   addInvestment,
//   addExpense,
//   addGoal,
// } from "../../services/GoalService";
// const steps = [
//   { id: 1, title: "Personal Info" },
//   { id: 2, title: "Financial Goals" },
//   { id: 3, title: "Income, Expenses & Investments" },
//   { id: 4, title: "Notifications & Alerts" },
//   { id: 5, title: "Review & Confirm" },
// ];
// const financialGoalOptions = [
//   "Saving",
//   "Investing",
//   "Debt Repayment",
//   "Wealth Growth",
//   "Other",
// ];
// const investmentOptions = [
//   "Stocks",
//   "Mutual Funds",
//   "Real Estate",
//   "Crypto",
//   "Bonds",
//   "Gold",
// ];

// const MultiStepForm = () => {
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();

//   const userData = useSelector((state) => state?.user?.user);
//   console.log(userData?.user?.id);
//   const initialValues = {
//     fullName: "",
//     age: "",
//     financialGoals: [
//       { goal: "", customGoal: "", targetAmount: "", deadline: "" },
//     ],
//     transactionMethod: "",
//     budgetCategories: [{ category: "", limit: "" }],
//     investments: [{ type: "", category: "", amount: "" }],
//     budgetOverspending: false,
//     stockUpdates: false,
//     marketTrends: false,
//     agreeToTerms: false,
//   };
//   const nextStep = async (validateForm, setTouched, values) => {
//     // Mark all fields in the current step as touched (including checkboxes)
//     console.log("clicked", values);
//     await setTouched(
//       Object.keys(values).reduce((acc, key) => {
//         acc[key] = true;
//         return acc;
//       }, {})
//     );

//     // Validate the form after touching fields
//     const errors = await validateForm();
//     console.log(errors);

//     if (Object.keys(errors).length === 0) {
//       setStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => setStep((prev) => prev - 1);
//   const handleSubmit = async (values) => {
//     console.log("userdata.user", userData?.user?.id);
//     console.log("values", values.financialGoals);

//     await updateUserProfile(userData?.user?.id, {
//       full_name: values.full_name,
//       age: values.age,
//       transaction_method: values.transaction_method,
//       salary: values.salary,
//       budget_overspending: values.budget_overspending,
//       stock_updates: values.stock_updates,
//       market_trends: values.market_trends,
//     });

//     // Use optional chaining and default empty array to avoid errors
//     await Promise.all(
//       (values.financialGoals ?? []).map((goal) =>
//         addGoal({
//           goal_name: goal.goal_name,
//           target_amount: goal.targetAmount,
//           deadline: formatDateToYYYYMMDD(goal.deadline),
//           user: userData?.user?.id,
//         })
//       )
//     );

//     // await Promise.all(
//     //   (values.budget_categories ?? []).map((category) =>
//     //     addBudgetCategory(userData?.user?.id, category)
//     //   )
//     // );

//     await Promise.all(
//       (values.investments ?? []).map((investment) =>
//         addInvestment(userData?.user?.id, investment)
//       )
//     );

//     await Promise.all(
//       (values.expenses ?? []).map((expense) =>
//         addExpense(userData?.user?.id, expense)
//       )
//     );

//     navigate(paths.dashboard.home);
//   };

//   // const handleSubmit = async (values) => {
//   //   console.log("Form Submitted:", values.financialGoals);
//   //   await addGoal({
//   //     goal_name: values.financialGoals[0].goal,
//   //     target_amount: values.financialGoals[0].targetAmount,
//   //     deadline: formatDateToYYYYMMDD(values.financialGoals[0].deadline),
//   //     user: userData?.user?.data,
//   //   });
//   //   alert("Form submitted successfully!");
//   //   navigate(paths.dashboard.home);
//   // };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-xl w-full p-8 bg-white shadow-lg rounded-xl border border-gray-300">
//         <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
//           Financial Advisor Signup
//         </h2>

//         {/* Progress Bar */}
//         <div className="flex justify-between mb-6">
//           {steps.map((s) => (
//             <div
//               key={s.id}
//               className={`flex-1 text-center text-sm font-semibold py-2 rounded-lg transition-all duration-300 ${
//                 s.id === step
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               {s.title}
//             </div>
//           ))}
//         </div>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchemas[step - 1]}
//           onSubmit={handleSubmit}
//         >
//           {({ values, setTouched, validateForm }) => (
//             <Form className="space-y-6">
//               {/* Step 1: Personal Info */}
//               {step === 1 && (
//                 <>
//                   <InputType
//                     name="fullName"
//                     type="text"
//                     placeholder="Full Name"
//                   />
//                   <InputType name="age" type="number" placeholder="Age" />
//                 </>
//               )}

//               {/* Step 2: Financial Goals */}
//               {step === 2 && (
//                 <FieldArray name="financialGoals">
//                   {({ push, remove }) => (
//                     <>
//                       {values.financialGoals.map((goal, index) => (
//                         <div key={index} className="mb-4 p-4 border rounded-lg">
//                           <Field
//                             as="select"
//                             name={`financialGoals[${index}].goal`}
//                             className="w-full p-2 border rounded"
//                           >
//                             <option value="">Select Financial Goal</option>
//                             {financialGoalOptions.map((goal) => (
//                               <option key={goal} value={goal}>
//                                 {goal}
//                               </option>
//                             ))}
//                           </Field>

//                           {values.financialGoals[index].goal === "Other" && (
//                             <InputType
//                               name={`financialGoals[${index}].customGoal`}
//                               type="text"
//                               placeholder="Enter Goal"
//                             />
//                           )}

//                           <InputType
//                             name={`financialGoals[${index}].targetAmount`}
//                             type="number"
//                             placeholder="Target Amount"
//                           />
//                           <InputType
//                             name={`financialGoals[${index}].deadline`}
//                             type="date"
//                             placeholder="Goal Deadline"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => remove(index)}
//                             className="text-red-500"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() =>
//                           push({
//                             goal: "",
//                             customGoal: "",
//                             targetAmount: "",
//                             deadline: "",
//                           })
//                         }
//                         className="text-blue-500"
//                       >
//                         + Add Goal
//                       </button>
//                     </>
//                   )}
//                 </FieldArray>
//               )}

//               {step === 3 && (
//                 <div>
//                   <h3>How do you manage transactions?</h3>
//                   <div>
//                     <label>
//                       <Field
//                         type="radio"
//                         name="transactionMethod"
//                         value="Manual Entry"
//                       />
//                       Manual Entry
//                     </label>
//                     <label>
//                       <Field
//                         type="radio"
//                         name="transactionMethod"
//                         value="Linked Bank"
//                       />
//                       Linked Bank
//                     </label>
//                     <label>
//                       <Field
//                         type="radio"
//                         name="transactionMethod"
//                         value="CSV Upload"
//                       />
//                       CSV Upload
//                     </label>
//                     <ErrorMessage
//                       name="transactionMethod"
//                       component="div"
//                       className="error"
//                     />
//                   </div>

//                   <h3>Budget Categories</h3>
//                   <FieldArray name="budgetCategories">
//                     {({ push, remove }) => (
//                       <div>
//                         {values.budgetCategories.map((category, index) => (
//                           <div key={index}>
//                             <Field
//                               name={`budgetCategories[${index}].category`}
//                               placeholder="Category"
//                             />
//                             <ErrorMessage
//                               name={`budgetCategories[${index}].category`}
//                               component="div"
//                               className="error"
//                             />

//                             <Field
//                               name={`budgetCategories[${index}].limit`}
//                               placeholder="Limit"
//                               type="number"
//                             />
//                             <ErrorMessage
//                               name={`budgetCategories[${index}].limit`}
//                               component="div"
//                               className="error"
//                             />

//                             <button
//                               type="button"
//                               onClick={() => remove(index)}
//                               className="text-red-500"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() => push({ category: "", limit: "" })}
//                           className="text-blue-500"
//                         >
//                           + Add Category
//                         </button>
//                       </div>
//                     )}
//                   </FieldArray>
//                 </div>
//               )}

//               {/* Step 4: Notifications & Alerts (Fixed) */}
//               {step === 4 && (
//                 <div>
//                   <h3>Enable Notifications:</h3>

//                   {console.log(values)}
//                   <label>
//                     <Field type="checkbox" name="budgetOverspending" />
//                     Budget Overspending Alerts
//                   </label>
//                   <ErrorMessage
//                     name="budgetOverspending"
//                     component="div"
//                     className="error"
//                   />

//                   <label>
//                     <Field type="checkbox" name="stockUpdates" />
//                     Real-Time Stock Updates
//                   </label>
//                   <ErrorMessage
//                     name="stockUpdates"
//                     component="div"
//                     className="error"
//                   />

//                   <label>
//                     <Field type="checkbox" name="marketTrends" />
//                     Market Trends & Insights
//                   </label>
//                   <ErrorMessage
//                     name="marketTrends"
//                     component="div"
//                     className="error"
//                   />
//                 </div>
//               )}

//               {/* Step 5: Review & Confirm (Fixed) */}
//               {step === 5 && (
//                 <>
//                   <h3 className="text-xl font-semibold">
//                     Review Your Information
//                   </h3>
//                   <p>
//                     <strong>Full Name:</strong> {values.fullName}
//                   </p>
//                   <p>
//                     <strong>Age:</strong> {values.age}
//                   </p>
//                   <p>
//                     <strong>Financial Goals:</strong>
//                   </p>
//                   <ul>
//                     {values.financialGoals.map((goal, index) => (
//                       <li key={index}>
//                         {goal.goal} - ${goal.targetAmount} (Deadline:{" "}
//                         {goal.deadline})
//                       </li>
//                     ))}
//                   </ul>
//                   <p>
//                     <strong>Transaction Method:</strong>{" "}
//                     {values.transactionMethod}
//                   </p>
//                   <p>
//                     <strong>Investments:</strong>
//                   </p>
//                   <ul>
//                     {values.investments.map((investment, index) => (
//                       <li key={index}>
//                         {investment.type} - {investment.category} - $
//                         {investment.amount}
//                       </li>
//                     ))}
//                   </ul>
//                   <label>
//                     <Field type="checkbox" name="agreeToTerms" /> I agree to the
//                     terms and conditions
//                   </label>
//                   <ErrorMessage
//                     name="agreeToTerms"
//                     component="div"
//                     className="text-red-500 text-sm"
//                   />
//                 </>
//               )}

//               {/* Navigation Buttons */}
//               <div className="flex justify-between mt-4">
//                 {step > 1 && (
//                   <button type="button" onClick={prevStep}>
//                     Back
//                   </button>
//                 )}
//                 {step < steps.length ? (
//                   <button
//                     type="button"
//                     onClick={() => nextStep(validateForm, setTouched, values)}
//                   >
//                     Next
//                   </button>
//                 ) : (
//                   <button type="submit">Submit</button>
//                 )}
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;
import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputType from "../../components/InputType";
import validationSchemas from "../../validations/multistepValidationSchema";
import { paths } from "../../routes/path";
import { useSelector } from "react-redux";
import formatDateToYYYYMMDD from "../../utils/commonHelper";
import {
  updateUserProfile,
  addBudgetCategory,
  addInvestment,
  addExpense,
  addGoal,
  patchSavings,
} from "../../services/GoalService";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Financial Goals" },
  { id: 3, title: "Income, Expenses & Investments" },
  { id: 4, title: "Notifications & Alerts" },
  { id: 5, title: "Review & Confirm" },
];

const financialGoalOptions = [
  "Saving",
  "Investing",
  "Debt Repayment",
  "Wealth Growth",
  "Other",
];

const investmentOptions = [
  "Stocks",
  "Mutual Funds",
  "Real Estate",
  "Crypto",
  "Bonds",
  "Gold",
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.user);
  const access = useSelector((state) => state?.user?.user?.access);

  const initialValues = {
    fullName: "",
    age: "",
    salary: "",
    financialGoals: [
      { goal_name: "", target_amount: "", current_savings: 0.0, deadline: "" },
    ],
    transaction_method: "",
    budgetCategories: [{ category: "", limit: "" }],
    investments: [{ investment_type: "", category: "", amount: "" }],
    expenses: [
      { description: "", amount: "", category: "", payment_method: "" },
    ],
    budget_overspending: false,
    stock_updates: false,
    market_trends: false,
    agreeToTerms: false,
  };

  const nextStep = async (validateForm, setTouched, values) => {
    // Mark all fields in the current step as touched
    await setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    const errors = await validateForm();
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);
  const handleSubmit = async (values) => {
    await updateUserProfile(userData?.user?.id, {
      full_name: values.fullName,
      age: values.age,
      salary: values.salary,
      transaction_method: values.transaction_method,
      budget_overspending: values.budget_overspending,
      stock_updates: values.stock_updates,
      market_trends: values.market_trends,
    });
    await patchSavings(access, { savings: values.savings });

    await Promise.all(
      values.financialGoals.map((goal) =>
        addGoal({
          goal_name:
            goal.goal_name == "Other" ? goal.customGoal : goal.goal_name,
          target_amount: goal.target_amount,
          current_savings: goal.current_savings,
          deadline: formatDateToYYYYMMDD(goal.deadline),
          user: userData?.user?.id,
        })
      )
    );

    await Promise.all(
      values.budgetCategories.map((category) =>
        addBudgetCategory(userData?.user?.id, {
          category: category.category,
          limit: category.limit,
          user: userData?.user?.id,
        })
      )
    );

    await Promise.all(
      (values.investments ?? []).map((investment) =>
        addInvestment(userData?.user?.id, {
          user: userData?.user?.id,
          investment_type: investment.investment_type,
          category: investment.category,
          amount: investment.amount,
        })
      )
    );

    // await Promise.all(
    //   values.expenses.map((expense) =>
    //     addExpense(userData?.user?.id, {
    //       description: expense.description,
    //       amount: expense.amount,
    //       category: expense.category,
    //       payment_method: expense.payment_method,
    //       user: userData?.user?.id,
    //     })
    //   )
    // );

    navigate(paths.dashboard.home);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full p-8 bg-white shadow-lg rounded-xl border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Financial Advisor Signup
        </h2>

        {/* Progress Bar */}
        <div className="flex justify-between mb-6">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`flex-1 text-center text-sm font-semibold py-2 rounded-lg transition-all duration-300 ${
                s.id === step
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {s.title}
            </div>
          ))}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step - 1]}
          onSubmit={handleSubmit}
        >
          {({ values, setTouched, validateForm }) => (
            <Form className="space-y-6">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <>
                  <InputType
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                  />
                  <InputType name="age" type="number" placeholder="Age" />
                  <InputType name="salary" type="number" placeholder="salary" />
                </>
              )}

              {/* Step 2: Financial Goals */}
              {step === 2 && (
                <FieldArray name="financialGoals">
                  {({ push, remove }) => (
                    <>
                      {values.financialGoals.map((goal, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-lg">
                          <Field
                            as="select"
                            name={`financialGoals[${index}].goal_name`}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select Financial Goal</option>
                            {financialGoalOptions.map((goal) => (
                              <option key={goal} value={goal}>
                                {goal}
                              </option>
                            ))}
                          </Field>

                          {values.financialGoals[index].goal_name ===
                            "Other" && (
                            <InputType
                              name={`financialGoals[${index}].customGoal`}
                              type="text"
                              placeholder="Enter Goal"
                            />
                          )}

                          <InputType
                            name={`financialGoals[${index}].target_amount`}
                            type="number"
                            placeholder="Target Amount"
                          />
                          <InputType
                            name={`financialGoals[${index}].current_savings`}
                            type="number"
                            placeholder="Current Savings"
                          />
                          <InputType
                            name={`financialGoals[${index}].deadline`}
                            type="date"
                            placeholder="Goal Deadline"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            goal_name: "",
                            target_amount: "",
                            current_savings: "",
                            deadline: "",
                          })
                        }
                        className="text-blue-500"
                      >
                        + Add Goal
                      </button>
                    </>
                  )}
                </FieldArray>
              )}

              {/* Step 3: Income, Expenses & Investments */}
              {step === 3 && (
                <>
                  <h3>Unallocated Fund (on hand money)</h3>
                  <Field
                    name="savings"
                    type="number"
                    placeholder="unallocated fund"
                  />
                  <ErrorMessage
                    name="savings"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />

                  <h3>Budget Categories</h3>
                  <FieldArray name="budgetCategories">
                    {({ push, remove }) => (
                      <div>
                        {values.budgetCategories.map((category, index) => (
                          <div key={index}>
                            <Field
                              name={`budgetCategories[${index}].category`}
                              placeholder="Category"
                            />
                            <Field
                              name={`budgetCategories[${index}].limit`}
                              placeholder="Limit"
                              type="number"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ category: "", limit: "" })}
                          className="text-blue-500"
                        >
                          + Add Category
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <h3>Investments</h3>
                  <FieldArray name="investments">
                    {({ push, remove }) => (
                      <div>
                        {values.investments.map((investment, index) => (
                          <div key={index}>
                            <Field
                              as="select"
                              name={`investments[${index}].investment_type`}
                              className="w-full p-2 border rounded"
                            >
                              <option value="">Select Investment Type</option>
                              {investmentOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Field>

                            <Field
                              name={`investments[${index}].category`}
                              placeholder="Category (optional)"
                            />
                            <Field
                              name={`investments[${index}].amount`}
                              placeholder="Amount"
                              type="number"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              investment_type: "",
                              category: "",
                              amount: "",
                            })
                          }
                          className="text-blue-500"
                        >
                          + Add Investment
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </>
              )}

              {/* Step 4: Notifications & Alerts */}
              {step === 4 && (
                <div>
                  <h3>Enable Notifications:</h3>
                  <label>
                    <Field type="checkbox" name="budget_overspending" />
                    Budget Overspending Alerts
                  </label>

                  <label>
                    <Field type="checkbox" name="stock_updates" />
                    Real-Time Stock Updates
                  </label>

                  <label>
                    <Field type="checkbox" name="market_trends" />
                    Market Trends & Insights
                  </label>
                </div>
              )}

              {/* Step 5: Review & Confirm */}
              {step === 5 && (
                <>
                  <h3 className="text-xl font-semibold">
                    Review Your Information
                  </h3>
                  <p>
                    <strong>Full Name:</strong> {values.fullName}
                  </p>
                  <p>
                    <strong>Age:</strong> {values.age}
                  </p>
                  <p>
                    <strong>Financial Goals:</strong>
                  </p>
                  <ul>
                    {values.financialGoals.map((goal, index) => (
                      <li key={index}>
                        {goal.goal_name} - ${goal.target_amount} (Deadline:{" "}
                        {goal.deadline})
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Transaction Method:</strong>{" "}
                    {values.transaction_method}
                  </p>
                  <p>
                    <strong>Investments:</strong>
                  </p>
                  <ul>
                    {values.investments.map((investment, index) => (
                      <li key={index}>
                        {investment.investment_type} - {investment.category} - $
                        {investment.amount}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Expenses:</strong>
                  </p>
                  <ul>
                    {values.expenses.map((expense, index) => (
                      <li key={index}>
                        {expense.description} - ${expense.amount} -{" "}
                        {expense.category}
                      </li>
                    ))}
                  </ul>
                  <label>
                    <Field type="checkbox" name="agreeToTerms" /> I agree to the
                    terms and conditions
                  </label>
                  <ErrorMessage
                    name="agreeToTerms"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <button type="button" onClick={prevStep}>
                    Back
                  </button>
                )}
                {step < steps.length ? (
                  <button
                    type="button"
                    onClick={() => nextStep(validateForm, setTouched, values)}
                  >
                    Next
                  </button>
                ) : (
                  <button type="submit">Submit</button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MultiStepForm;
