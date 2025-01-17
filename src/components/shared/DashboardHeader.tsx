'use client';

import React from 'react';

const DashboardHeader: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
      <h1 className="text-2xl font-bold text-white">OiDiVi Helper</h1>

      <div className="flex items-center space-x-4">
        <button className="hover:text-red-500">Notifications</button>
        <button className="hover:text-red-500">Profile</button>
        <button className="hover:text-red-500" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
