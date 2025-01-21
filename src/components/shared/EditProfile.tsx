/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import AddressInput from '@/components/shared/AddressInput';
import { updateProfileData } from '@/lib/api';
import { User } from '@/types';

interface EditProfileProps {
  user: User | null;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    zip_code: user?.zip_code || '',
    latitude: user?.latitude || 0,
    longitude: user?.longitude || 0,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSelected = (location: {
    address: string;
    zip_code: string;
    latitude: number;
    longitude: number;
  }) => {
    setFormData({
      ...formData,
      address: location.address,
      zip_code: location.zip_code,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await updateProfileData(formData);
      setSuccessMessage('Profile updated successfully!');
      onClose();
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Failed to update profile.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-700 mb-6">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 dark:focus:ring-red-700 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 dark:focus:ring-red-700 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 dark:focus:ring-red-700 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <AddressInput onAddressSelected={handleAddressSelected} />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 dark:bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg hover:from-red-700 hover:to-red-900"
            >
              Update
            </button>
          </div>

          {/* Feedback Messages */}
          {successMessage && (
            <p className="text-green-600 dark:text-green-400 text-center">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 dark:text-red-400 text-center">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
