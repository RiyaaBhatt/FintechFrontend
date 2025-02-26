import React from "react";
import { Formik, Form } from "formik";
import InputType from "../../components/InputType";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import Checkbox from "../../components/Checkbox";
import FormLabel from "../../components/FormLabel";
import { loginValidationSchema } from "../../validations/authValidationSchema";
import loginimg from "../../assets/Login.webp";
import { Link } from "react-router-dom";
import { paths } from "../../routes/path";
const Login = () => {
  const [defaultInitialValues] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  async function onSubmit(paramsData) {
    // eslint-disable-next-line no-unused-vars
    const params = {
      email: paramsData?.email,
      password: paramsData?.password,
    };
    try {
      //   const response = await LoginUser(params);
      console.log("Response:", paramsData);
      // if (response && response.data) {
      //   await handleLoginResponse(response, paramsData);
      // } else {
      //   console.error('No response data received');
      // }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      /* empty */
    }
  }
  return (
    <div className="bg-site-black lg:p-6 sm:p-4 p-3 min-h-screen">
      <div className="bg-white rounded-2xl md:rounded-3xl p-3 sm:p-4 lg:p-8 lg:min-h-[calc(100vh-48px)] sm:min-h-[calc(100vh-32px)] min-h-[calc(100vh-24px)]">
        <div className="grid grid-cols-12 h-full lg:gap-6 gap-3">
          <div className="col-span-6 h-full md:block hidden">
            <img src={loginimg} alt="" />
          </div>
          <div className="md:col-span-6 sm:col-span-8 col-span-12 md:col-start-7 sm:col-start-3">
            <div className="flex items-start justify-center flex-col md:min-h-full min-h-[calc(100vh-64px)] xl:ps-[88px] ps-0">
              <Paragraph text24 className={"mb-2"}>
                Log in to your Account
              </Paragraph>

              <Paragraph text12 className={"md:mb-10 mb-5"}>
                Welcome back!
              </Paragraph>
              <Formik
                initialValues={defaultInitialValues}
                validationSchema={loginValidationSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form className="xxl:w-3/4 xl:w-4/5 w-full">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <FormLabel>Email address</FormLabel>
                        <InputType
                          placeholder="Type here"
                          type="text"
                          name="email"
                        />
                      </div>
                      <div className="col-span-12">
                        <FormLabel>Password</FormLabel>
                        <InputType
                          placeholder="Type here"
                          type="password"
                          name="password"
                        />
                      </div>
                      <div className="col-span-12">
                        <div className="flex items-center justify-between gap-3 mb-6">
                          <Checkbox
                            w18
                            name={"rememberMe"}
                            id={"rememberMe"}
                            onChange={handleChange}
                            checked={values.rememberMe}
                          >
                            Remember me
                          </Checkbox>
                          <Link
                            to={"paths.auth.forgotPassword"}
                            className="md:text-base md:leading-6 text-sm leading-5 font-semibold text-primary-blue hover:text-site-black transition-all duration-300"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <Link
                          to={paths.auth.signup}
                          className="md:text-base md:leading-6 text-sm leading-5 font-semibold text-primary-blue hover:text-site-black transition-all duration-300"
                        >
                          don&apos;t have account?
                        </Link>
                      </div>
                      <div className="col-span-12">
                        <Button
                          primary
                          className={"w-full lg:!py-3 bg-[#1e324d]"}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Login
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
export default Login;
