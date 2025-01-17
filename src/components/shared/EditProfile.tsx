'use client';

import React, { useState } from 'react';
import AddressInput from '@/components/shared/AddressInput';
import {
  updateProfileData,
  // uploadProfilePhoto,
  // uploadProfileVideo,
} from '@/lib/api';
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

  // const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  // const [profileVideo, setProfileVideo] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   setter: React.Dispatch<React.SetStateAction<File | null>>
  // ) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setter(e.target.files[0]);
  //   }
  // };

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

      // if (profilePhoto) {
      //   await uploadProfilePhoto(profilePhoto);
      // }

      // if (profileVideo) {
      //   await uploadProfileVideo(profileVideo);
      // }

      setSuccessMessage('Profile updated successfully!');
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Failed to update profile.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-red-500 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-2">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <AddressInput onAddressSelected={handleAddressSelected} />
          </div>

          {/* Profile Photo */}
          {/* <div>
            <label htmlFor="profilePhoto" className="block text-gray-300 mb-2">
              Profile Photo
            </label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProfilePhoto)}
              className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
          </div> */}

          {/* Profile Video */}
          {/* <div>
            <label htmlFor="profileVideo" className="block text-gray-300 mb-2">
              Profile Video
            </label>
            <input
              id="profileVideo"
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, setProfileVideo)}
              className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
          </div> */}

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-black text-white rounded-lg hover:from-red-600 hover:to-gray-800"
            >
              Update
            </button>
          </div>

          {/* Feedback Messages */}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
