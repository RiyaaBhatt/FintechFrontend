import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/path";
import InputType from "../../components/InputType";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Financial Details" },
  { id: 3, title: "Financial Goals" },
  { id: 4, title: "Preferences" },
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    salary: "",
    expenses: "",
    savings: "",
    investments: "",
    shortTermGoal: "",
    longTermGoal: "",
    budgetTracking: false,
    notifications: false,
  };

  const validationSchemas = [
    Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      salary: Yup.number().required("Salary is required").positive(),
    }),
    Yup.object({
      expenses: Yup.number().required("Expenses are required").positive(),
      savings: Yup.number().required("Savings are required").positive(),
      investments: Yup.number().required("Investments are required").positive(),
    }),
    Yup.object({
      shortTermGoal: Yup.string().required("Short-term goal is required"),
      longTermGoal: Yup.string().required("Long-term goal is required"),
    }),
    Yup.object(),
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
    alert("Form submitted successfully!");
    navigate(paths.dashboard.home);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full p-8 bg-white shadow-lg rounded-xl border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Multi-Step Form
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
          onSubmit={step === steps.length ? handleSubmit : nextStep}
        >
          {({ values }) => (
            <Form className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {step === 1 && (
                  <>
                    <div className="mb-4">
                      <InputType
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="mb-4">
                      <InputType
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="mb-4">
                      <InputType
                        name="salary"
                        type="number"
                        placeholder="Enter Salary"
                      />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="mb-4">
                      <InputType
                        name="expenses"
                        type="number"
                        placeholder="Monthly Expenses"
                      />
                    </div>
                    <div className="mb-4">
                      <InputType
                        name="savings"
                        type="number"
                        placeholder="Savings Amount"
                      />
                    </div>
                    <div className="mb-4">
                      <InputType
                        name="investments"
                        type="number"
                        placeholder="Investments"
                      />
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="mb-4">
                      <InputType
                        name="shortTermGoal"
                        type="text"
                        placeholder="Short-Term Goal"
                      />
                    </div>
                    <div className="mb-4">
                      <InputType
                        name="longTermGoal"
                        type="text"
                        placeholder="Long-Term Goal"
                      />
                    </div>
                  </>
                )}
                {step === 4 && (
                  <>
                    <label className="block text-gray-700 flex items-center space-x-2 mb-4">
                      <Field
                        type="checkbox"
                        name="budgetTracking"
                        className="mr-2"
                      />
                      <span>Enable Budget Tracking</span>
                    </label>
                    <ErrorMessage
                      name="budgetTracking"
                      component="div"
                      className="text-red-500 text-sm mb-4"
                    />
                    <label className="block text-gray-700 flex items-center space-x-2 mb-4">
                      <Field
                        type="checkbox"
                        name="notifications"
                        className="mr-2"
                      />
                      <span>Enable Notifications</span>
                    </label>
                    <ErrorMessage
                      name="notifications"
                      component="div"
                      className="text-red-500 text-sm mb-4"
                    />
                  </>
                )}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-all"
                >
                  {step === steps.length ? "Submit" : "Next"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MultiStepForm;
