'use client';

import React from 'react';
import { User } from '@/types';
import ProfilePhotoUploader from './ProfilePhotoUploader';
import ProfileVideoUploader from './ProfileVideoUploader';

interface UserProfileDetailsProps {
  user: User | null;
  onEditProfile: () => void;
}

const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({
  user,
  onEditProfile,
}) => {
  const handlePhotoUpdated = (newPhotoUrl: string) => {
    console.log('Photo updated:', newPhotoUrl);
  };

  const handleVideoUpdated = (newVideoUrl: string) => {
    console.log('Video updated:', newVideoUrl);
  };

  return (
    <section className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-6 rounded-lg shadow-lg space-y-8">
      {/* Sección principal: Imagen, Video y Nombre */}
      <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow space-y-6 md:space-y-0 md:space-x-6">
        {/* Imagen de perfil */}
        <ProfilePhotoUploader
          currentPhotoUrl={user?.profile_photo_url || '/default-avatar.png'}
          onPhotoUpdated={handlePhotoUpdated}
        />

        {/* Información principal */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">{user?.name || 'User Name'}</h1>
          <p className="text-md text-blue-600 hover:text-indigo-700 dark:text-blue-400 dark:hover:text-indigo-400 underline cursor-pointer">
            {user?.email || 'email@example.com'}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
            {user?.address || 'Address'}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {user?.phone || 'Phone'}
          </p>
          <button
            onClick={onEditProfile}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 dark:hover:bg-red-700 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Video de perfil */}
        <ProfileVideoUploader
          currentVideoUrl={user?.profile_video_url || null}
          onVideoUpdated={handleVideoUpdated}
        />
      </div>

      {/* Información adicional */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="space-y-2">
          <p>
            <strong className="text-gray-900 dark:text-gray-200">Phone:</strong>{' '}
            {user?.phone || 'N/A'}
          </p>
          <p>
            <strong className="text-gray-900 dark:text-gray-200">
              Address:
            </strong>{' '}
            {user?.address || 'N/A'}
          </p>
          <p>
            <strong className="text-gray-900 dark:text-gray-200">
              ZIP Code:
            </strong>{' '}
            {user?.zip_code || 'N/A'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserProfileDetails;
