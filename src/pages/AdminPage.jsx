import React from "react";
import Sidebar from "../components/AdminDashboard/Sidebar/Sidebar.jsx";
import { Dashboard } from "../components/AdminDashboard/Dashboard/Dashboard.jsx";

function AdminPage() {
  return (
    <div className="grid grid-cols-[220px_1fr] h-screen">
      <div className="bg-gray-100 border-r h-full">
        <Sidebar />
      </div>
      <div className="h-full overflow-y-scroll">
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminPage;
