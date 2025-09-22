import React from "react";
import { AccountToggle } from "./AccountToggle.jsx";
import { Search } from "./Search.jsx";
import { RouteSelect } from "./RouteSelect.jsx";
const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 p-4 overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <Search />
        <RouteSelect />
      </div>

    </div>
  );
};

export default Sidebar;