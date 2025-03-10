"use client";

import React, { useState, useEffect } from "react";
import useDashboard from "@/hooks/useDashboard";
import EditProfileModal from "../shared/EditProfile";
import { PrivateNavbar } from "../navigation/PrivateNavbar";
import Sidebar from "../shared/Sidebar";
import { DashboardContent } from "./DashboardContent";

const Dashboard: React.FC = () => {
  const { user, loading, error, refreshDashboard } = useDashboard();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Efecto para refrescar datos inmediatamente al montar el componente
  useEffect(() => {
    refreshDashboard();

    // Configurar un listener para actualizar cuando la URL cambie (navegación interna)
    const handleRouteChange = () => {
      refreshDashboard();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [refreshDashboard]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setIsSidebarOpen(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200 dark:bg-gray-900">
        <p className="text-lg font-semibold text-red-600 dark:text-red-700">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200 dark:bg-gray-900">
        <p className="text-lg font-semibold text-red-600 dark:text-red-700">
          Error: {error}
        </p>
      </div>
    );
  }

  const handleEditProfile = () => setIsEditModalOpen(true);

  return (
    <div className="flex flex-col h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200 w-full">
      <PrivateNavbar onMenuClick={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onEditProfile={handleEditProfile}
          isMobileOpen={isSidebarOpen}
          onMobileClose={closeSidebar}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white dark:bg-neutral-900">
          {user && (
            <DashboardContent user={user} onEditProfile={handleEditProfile} />
          )}
        </main>
      </div>

      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => {
            setIsEditModalOpen(false);
            // Refrescar datos después de cerrar el modal
            refreshDashboard();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
