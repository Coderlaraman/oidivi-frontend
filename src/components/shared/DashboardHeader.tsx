'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-200 dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        {/* Botón de hamburguesa minimalista */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-900 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} size="lg" />
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
          OiDiVi Helper
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-900 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-700">
          Notifications
        </button>
        <button className="text-gray-900 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-700">
          Profile
        </button>
        <button
          className="text-gray-900 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
