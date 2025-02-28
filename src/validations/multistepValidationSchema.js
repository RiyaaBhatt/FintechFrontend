import * as Yup from "yup";

const validationSchemas = [
  // Step 1: Personal Info
  Yup.object({
    fullName: Yup.string().required("Full name is required"),
    age: Yup.number().required("Age is required").positive().integer(),
    salary: Yup.number()
      .required("Salary is required")
      .positive("Salary must be positive")
      .typeError("Salary must be a number"),
  }),

  // Step 2: Financial Goals
  Yup.object({
    financialGoals: Yup.array().of(
      Yup.object({
        goal_name: Yup.string().required("Financial goal is required"),

        target_amount: Yup.number()
          .required("Target amount is required")
          .positive("Target amount must be positive")
          .typeError("Target amount must be a number"),
        current_savings: Yup.number()
          .required("Current savings is required")
          .positive("Current savings must be positive")
          .typeError("Current savings must be a number"),
        deadline: Yup.date().required("Deadline is required"),
      })
    ),
  }),

  // Step 3: Income, Expenses & Investments
  Yup.object({
    salary: Yup.number()
      .required("Salary is required")
      .positive("Salary must be positive")
      .typeError("Salary must be a number"),
    budgetCategories: Yup.array()
      .of(
        Yup.object({
          category: Yup.string().required("Category is required"),
          limit: Yup.number()
            .required("Limit is required")
            .positive("Limit must be positive")
            .typeError("Limit must be a number"),
        })
      )
      .min(1, "At least one budget category is required"),
    investments: Yup.array().of(
      Yup.object({
        investment_type: Yup.string().required("Investment type is required"),
        amount: Yup.number()
          .required("Amount is required")
          .positive("Amount must be positive")
          .typeError("Amount must be a number"),
      })
    ),
    expenses: Yup.array().of(
      Yup.object({
        description: Yup.string().required("Description is required"),
        amount: Yup.number()
          .required("Amount is required")
          .positive("Amount must be positive")
          .typeError("Amount must be a number"),
        category: Yup.string().required("Category is required"),
        payment_method: Yup.string().required("Payment method is required"),
      })
    ),
  }),

  // Step 4: Notifications & Alerts (Optional fields, no validation needed for now)
  Yup.object({}),

  // Step 5: Review & Confirm
  Yup.object({
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Required"),
  }),
];

export default validationSchemas;
