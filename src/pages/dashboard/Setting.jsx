import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    currency: "INR",
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="bg-white p-4 shadow rounded-lg space-y-4">
        {/* Dark Mode */}
        <div className="flex justify-between items-center">
          <span>Dark Mode</span>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              settings.darkMode ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => toggleSetting("darkMode")}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition ${
                settings.darkMode ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Notifications */}
        <div className="flex justify-between items-center">
          <span>Enable Notifications</span>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              settings.notifications ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => toggleSetting("notifications")}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition ${
                settings.notifications ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Currency Selection */}
        <div className="flex justify-between items-center">
          <span>Currency</span>
          <select
            className="border p-2 rounded"
            value={settings.currency}
            onChange={(e) =>
              setSettings({ ...settings, currency: e.target.value })
            }
          >
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
