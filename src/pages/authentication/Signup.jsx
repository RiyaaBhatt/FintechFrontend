import React from "react";
import { Formik, Form } from "formik";
import InputType from "../../components/InputType";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import Checkbox from "../../components/Checkbox";
import FormLabel from "../../components/FormLabel";
import { signupValidationSchema } from "../../validations/authValidationSchema";
import Signupimg from "../../assets/login.webp";
import { Link } from "react-router-dom";
import { paths } from "../../routes/path";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [defaultInitialValues] = React.useState({
    phone_number: "",
    first_name: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  async function onSubmit(paramsData) {
    console.log("Response:", paramsData);
    navigate(paths.information.profile);
  }

  return (
    <div className="bg-black lg:p-6 sm:p-4 p-3 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 w-full max-w-4xl">
        <div className="grid grid-cols-12 gap-6">
          {/* Image Section */}
          <div className="col-span-6 hidden md:flex items-center justify-center">
            <img
              src={Signupimg}
              alt="Signup Illustration"
              className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Form Section */}
          <div className="md:col-span-6 col-span-12">
            <div className="flex flex-col justify-center min-h-full">
              <Paragraph text24 className="mb-2 font-bold text-purple-700">
                Start your journey by signing up
              </Paragraph>
              <Paragraph text12 className="mb-6 text-gray-600">
                Welcome! Let's get started.
              </Paragraph>

              <Formik
                initialValues={defaultInitialValues}
                validationSchema={signupValidationSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form className="w-full">
                    <div className="grid grid-cols-12 gap-4">
                      {/* Name Field */}
                      <div className="col-span-12">
                        <FormLabel className="text-purple-700">Name</FormLabel>
                        <InputType
                          placeholder="Enter your name"
                          type="text"
                          name="first_name"
                          className="border-gray-300 focus:border-purple-700 focus:ring-2 focus:ring-purple-700"
                        />
                      </div>

                      {/* Phone Number Field */}
                      <div className="col-span-12">
                        <FormLabel className="text-purple-700">
                          Phone Number
                        </FormLabel>
                        <InputType
                          placeholder="Enter your phone number"
                          type="text"
                          name="phone_number"
                          className="border-gray-300 focus:border-purple-700 focus:ring-2 focus:ring-purple-700"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="col-span-12">
                        <FormLabel className="text-purple-700">
                          Email Address
                        </FormLabel>
                        <InputType
                          placeholder="Enter your email"
                          type="email"
                          name="email"
                          className="border-gray-300 focus:border-purple-700 focus:ring-2 focus:ring-purple-700"
                        />
                      </div>

                      {/* Password Field */}
                      <div className="col-span-12">
                        <FormLabel className="text-purple-700">
                          Password
                        </FormLabel>
                        <InputType
                          placeholder="Enter your password"
                          type="password"
                          name="password"
                          className="border-gray-300 focus:border-purple-700 focus:ring-2 focus:ring-purple-700"
                        />
                      </div>

                      {/* Remember Me & Login Link */}
                      <div className="col-span-12 flex justify-between items-center">
                        <Checkbox
                          name="rememberMe"
                          id="rememberMe"
                          onChange={handleChange}
                          checked={values.rememberMe}
                          className="text-purple-700"
                        >
                          Remember me
                        </Checkbox>
                        <Link
                          to={paths.auth.login}
                          className="text-purple-700 font-medium hover:underline"
                        >
                          Already have an account?
                        </Link>
                      </div>

                      {/* Signup Button */}
                      <div className="col-span-12">
                        <Button
                          primary
                          className="w-full py-3 bg-purple-700 text-white hover:bg-purple-900 transition-all duration-300 rounded-lg shadow-md"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Signup
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
