import * as Yup from "yup";

export const loginValidationSchema = () =>
  Yup.object().shape({
    username: Yup.string()
      .trim()
      .max(255, "Maximum 255 Characters allowed")
      .required("username is required"),
    password: Yup.string()
      .trim()
      .max(255, "Maximum 255 Characters allowed")
      .min(6, "Minimum 6 Characters required")
      .required("Password is required"),
  });

export const signupValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .trim()
      .max(255, "Maximum 255 Characters allowed")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Email is invalid"),
    username: Yup.string()
      .trim()
      .max(255, "Maximum 255 Characters allowed")
      .required("username is required"),
    password: Yup.string()
      .trim()
      .max(255, "Maximum 255 Characters allowed")
      .min(6, "Minimum 6 Characters required")
      .required("Password is required"),
    first_name: Yup.string()
      .trim()
      .max(255, "Maximum 255 Characters allowed")
      .min(6, "Minimum 6 Characters required")
      .required("Name is required"),
    phone_number: Yup.string()
      .trim()
      .max(255, "Maximum 255 Characters allowed")
      .min(6, "Minimum 6 Characters required")
      .required("Phone number is required"),
  });
