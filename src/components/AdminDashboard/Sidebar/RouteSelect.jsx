import React from "react";
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
} from "react-icons/fi";

export const RouteSelect = ({ activePage, setActivePage }) => {
  const routes = [
    { title: "Dashboard", icon: FiHome, key: "dashboard" },
    { title: "User", icon: FiUsers, key: "user" },
    { title: "Event TimeLine", icon: FiPaperclip, key: "event" },
    { title: "Nomination", icon: FiLink, key: "nomination" },
    { title: "Voting", icon: FiLink, key: "voting" },
    { title: "Content", icon: FiLink, key: "content" },
  ];

  return (
    <div className="space-y-1">
      {routes.map((route) => (
        <Route
          key={route.key}
          Icon={route.icon}
          title={route.title}
          selected={activePage === route.key}
          onClick={() => setActivePage(route.key)}
        />
      ))}
    </div>
  );
};

const Route = ({ selected, Icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
