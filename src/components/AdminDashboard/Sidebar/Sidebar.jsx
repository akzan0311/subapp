import React from "react";
import { AccountToggle } from "./AccountToggle.jsx";
import { Search } from "./Search.jsx";
import { RouteSelect } from "./RouteSelect.jsx";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
      <AccountToggle />
      <Search />
      <RouteSelect activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default Sidebar;
