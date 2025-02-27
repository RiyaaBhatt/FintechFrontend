import React from "react";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
  React.useEffect(() => {
    console.log("App mounted", import.meta.env.VITE_API_URL);
  }, []);
  return (
    <div className="">
      <AppRoutes />
    </div>
  );
}
