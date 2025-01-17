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

const Dashboard: React.FC = () => {
  const { user, loading, error } = useDashboard();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-500">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  const handleEditProfile = () => setIsEditModalOpen(true);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-full">
      {/* Barra superior */}
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Barra lateral */}
        {/* <aside className="w-64 bg-gradient-to-t from-black to-red-900 p-6 hidden md:block">
          <nav className="space-y-4">
            <button className="block py-2 px-4 bg-red-600 text-white font-bold rounded hover:bg-red-700">
              Home
            </button>
            <button
              onClick={handleEditProfile}
              className="block py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Edit Profile
            </button>
            <button className="block py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700">
              Settings
            </button>
          </nav>
        </aside> */}

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-800">
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
