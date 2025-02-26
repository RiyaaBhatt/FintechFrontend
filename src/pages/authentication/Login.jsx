/* eslint-disable no-unused-vars */
import React from "react";
import { Formik, Form } from "formik";
import InputType from "../../components/InputType";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import Checkbox from "../../components/Checkbox";
import FormLabel from "../../components/FormLabel";
import { loginValidationSchema } from "../../validations/authValidationSchema";
import loginimg from "../../assets/Login.webp";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes/path";

const Login = () => {
  const [defaultInitialValues] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  async function onSubmit(paramsData) {
    const params = {
      email: paramsData?.email,
      password: paramsData?.password,
    };
    try {
      console.log("Response:", paramsData);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div className="bg-black lg:p-6 sm:p-4 p-3 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-4xl">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6 hidden md:block">
            <img src={loginimg} alt="Login" className="w-full rounded-xl" />
          </div>
          <div className="md:col-span-6 col-span-12 flex flex-col justify-center">
            <Paragraph text24 className="mb-2 text-purple-700 font-bold">
              Log in to your Account
            </Paragraph>
            <Paragraph text12 className="mb-6 text-gray-600">
              Welcome back! Please enter your details.
            </Paragraph>
            <Formik
              initialValues={defaultInitialValues}
              validationSchema={loginValidationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ isSubmitting, values, handleChange }) => (
                <Form className="space-y-5">
                  <div>
                    <FormLabel>Email address</FormLabel>
                    <InputType
                      placeholder="Type here"
                      type="text"
                      name="email"
                    />
                  </div>
                  <div>
                    <FormLabel>Password</FormLabel>
                    <InputType
                      placeholder="Type here"
                      type="password"
                      name="password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Checkbox
                      name="rememberMe"
                      id="rememberMe"
                      onChange={handleChange}
                      checked={values.rememberMe}
                    >
                      Remember me
                    </Checkbox>
                    <Link
                      to={paths.auth.forgotPassword}
                      className="text-sm font-semibold text-purple-700 hover:text-black transition-all"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Link
                    to={paths.auth.signup}
                    className="text-sm font-semibold text-purple-700 hover:text-black transition-all block"
                  >
                    Don’t have an account?
                  </Link>
                  <Button
                    primary
                    className="w-full py-3 bg-purple-700 text-white font-bold hover:bg-purple-900 transition-all"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
