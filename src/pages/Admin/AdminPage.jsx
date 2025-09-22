import React, { useState } from "react";
import Sidebar from "../../components/AdminDashboard/Sidebar/Sidebar.jsx";
import { Dashboard } from "../../components/AdminDashboard/Dashboard/Dashboard.jsx";
import EventTimelinePage from "./EventTimelinePage.jsx";
import NominationManagementPage from "./NominationPage.jsx";
import VotingManagementPage from "./VotingPage.jsx";
import ContentManagementPage from "./ContentPage.jsx";

function AdminPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "event":
        return <EventTimelinePage />;
      case "nomination":
        return <NominationManagementPage />;
      case "voting":
        return <VotingManagementPage />;
      case "content":
        return <ContentManagementPage />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="grid grid-cols-[220px_1fr] h-screen">
      <div className="bg-gray-100 border-r h-full">
        <Sidebar setActivePage={setActivePage} activePage={activePage} />
      </div>
      <div className="h-full overflow-y-scroll">{renderContent()}</div>
    </div>
  );
}

export default AdminPage;
