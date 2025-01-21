'use client';

import React, { useState } from 'react';
import useDashboard from '@/hooks/useDashboard';
import EditProfileModal from '../shared/EditProfile';
import UserProfileDetails from '../shared/UserProfileDetails';
import UserActivities from '../shared/UserActivities';
import QuickLinks from '../shared/QuickLinks';
import DashboardFooter from '../shared/DashboardFooter';
import DashboardHeader from '../shared/DashboardHeader';
import SearchInput from '../shared/SearchInput';
import SidebarDesktop from '../shared/SidebarDesktop';
import SidebarMobile from '../shared/SidebarMobile';

const Dashboard: React.FC = () => {
  const { user, loading, error } = useDashboard();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      {/* Barra superior */}
      <DashboardHeader
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Barra lateral para dispositivos grandes */}
        <SidebarDesktop onEditProfile={handleEditProfile} />

        {/* Barra lateral para dispositivos pequeños */}
        {isSidebarOpen && (
          <SidebarMobile
            onEditProfile={handleEditProfile}
            onClose={closeSidebar}
          />
        )}

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
          <SearchInput />
          <UserProfileDetails user={user} onEditProfile={handleEditProfile} />
          <UserActivities
            activities={{ activeRequests: 5, offeredServices: 10 }}
          />
          <QuickLinks
            links={[
              {
                label: 'Find Helpers',
                onClick: () => console.log('Find Helpers'),
              },
              {
                label: 'Offer Services',
                onClick: () => console.log('Offer Services'),
              },
            ]}
          />
        </main>
      </div>

      <DashboardFooter />

      {/* Modal de edición */}
      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
