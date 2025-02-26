import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/Animation - 1740547119807.json"; // Add an animated Lottie JSON file

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-purple-100">
      <div className="w-96 h-96">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold text-purple-700">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        It looks like you’re lost in space. Let’s get you back home! 🚀
      </p>
      <Link
        to="/dashboard/home"
        className="mt-6 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition"
      >
        Take me home
      </Link>
    </div>
  );
};

export default NotFound;
