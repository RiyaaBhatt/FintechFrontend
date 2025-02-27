import * as Yup from "yup";

const validationSchemas = [
  Yup.object({
    fullName: Yup.string().required("Full name is required"),
    age: Yup.number().required("Age is required").positive().integer(),
  }),
  Yup.object({
    financialGoals: Yup.array().of(
      Yup.object({
        goal: Yup.string().required("Financial goal is required"),
        targetAmount: Yup.number()
          .required("Target amount is required")
          .positive(),
        deadline: Yup.date().required("Deadline is required"),
      })
    ),
  }),
  Yup.object({
    transactionMethod: Yup.string().required("Select a transaction method"),
    budgetCategories: Yup.array()
      .of(
        Yup.object({
          category: Yup.string().required("Category is required"),
          limit: Yup.number().required("Limit is required").positive(),
        })
      )
      .min(1, "At least one budget category is required"),
  }),
  Yup.object({}),
  Yup.object({
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Required"),
  }),
];
export default validationSchemas;
