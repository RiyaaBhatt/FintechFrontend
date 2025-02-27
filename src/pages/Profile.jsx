import { useState } from "react";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 25,
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
        <p className="text-gray-500">Manage your account information</p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Password Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Password */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Current Password"
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-1/3 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
