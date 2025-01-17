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
    <section className="bg-gray-900 text-white p-6 rounded-lg shadow-lg space-y-8">
      {/* Sección principal: Imagen, Video y Nombre */}
      <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 p-6 rounded-lg shadow space-y-6 md:space-y-0 md:space-x-6">
        {/* Imagen de perfil */}
        <ProfilePhotoUploader
          currentPhotoUrl={user?.profile_photo_url || '/default-avatar.png'}
          onPhotoUpdated={handlePhotoUpdated}
        />

        {/* Información principal */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">{user?.name || 'User Name'}</h1>
          <p className="text-sm text-blue-400 underline cursor-pointer">
            {user?.email || 'email@example.com'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {user?.address || 'Address'}
          </p>
          <p className="text-sm text-gray-400">{user?.phone || 'Phone'}</p>
          <button
            onClick={onEditProfile}
            className="mt-4 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
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
      <div className="bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="space-y-2">
          <p>
            <strong className="text-gray-200">Phone:</strong>{' '}
            {user?.phone || 'N/A'}
          </p>
          <p>
            <strong className="text-gray-200">Address:</strong>{' '}
            {user?.address || 'N/A'}
          </p>
          <p>
            <strong className="text-gray-200">ZIP Code:</strong>{' '}
            {user?.zip_code || 'N/A'}
          </p>
        </div>
      </div>

      {/* Roles */}
      {/* <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Roles</h3>
        {user?.roles?.length ? (
          <ul className="list-disc pl-5 space-y-2">
            {user.roles.map((role, index) => (
              <li key={index} className="text-gray-400">
                {role}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No roles assigned</p>
        )}
      </div> */}
    </section>
  );
};

export default UserProfileDetails;
