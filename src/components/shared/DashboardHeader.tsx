"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <button
        onClick={onToggleSidebar}
        className="text-gray-600 dark:text-gray-300 focus:outline-none"
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} size="lg" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="text-gray-600 dark:text-gray-300 focus:outline-none"
      >
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
      </button>
    </header>
  );
};

export default DashboardHeader;
