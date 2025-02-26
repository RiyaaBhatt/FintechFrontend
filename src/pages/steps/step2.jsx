import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/path";
const step1 = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    salary: Yup.number()
      .typeError("Salary must be a number")
      .positive("Salary must be greater than zero")
      .required("Salary is required"),
  });

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border-4 border-purple-800">
        <h2 className="text-2xl font-bold text-purple-800 text-center mb-4">
          Enter Your Salary
        </h2>
        <Formik
          initialValues={{ salary: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            alert(`Submitted Salary: ₹${values.salary}`);
            setSubmitting(false);
            resetForm();
            navigate(paths.dashboard.home);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="salary"
                  className="block text-lg text-black font-medium mb-1"
                >
                  Salary (in INR)
                </label>
                <Field
                  type="text"
                  id="salary"
                  name="salary"
                  className="w-full p-2 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-700 outline-none"
                  placeholder="Enter your salary"
                />
                <ErrorMessage
                  name="salary"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default step1;
