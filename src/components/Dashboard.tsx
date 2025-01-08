'use client';

import { useState } from 'react';
import { updateProfile } from '../utils/api';
import useDashboard from '../hooks/useDashboard';
import AddressInput from './AddressInput';

const Dashboard: React.FC = () => {
  const { user, loading, error } = useDashboard();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
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

    // Crear un objeto con solo los campos modificados
    const dataToSend = Object.fromEntries(
      Object.entries(formData).filter(
        ([, value]) => value !== '' && value !== null
      )
    );

    try {
      await updateProfile(dataToSend); // Usamos el método general de actualización
      setSuccessMessage('Profile updated successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Failed to update profile.'
      );
      console.error(err);
    }
  };

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

  return (
    <div className="h-screen p-6 w-11/12 mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-500 rounded-lg shadow-lg">
      {/* Main Content */}
      <main className="space-y-8">
        {/* Profile Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-600">User Profile</h2>
            <button
              onClick={() => {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
              }}
              aria-label="Logout"
              className="py-2 px-4 bg-gradient-to-r from-red-500 to-black text-white font-bold rounded hover:from-red-600 hover:to-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Profile Details</h3>
              <p>
                <strong>Name:</strong> {user?.name || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || 'N/A'}
              </p>
              <p>
                <strong>Address:</strong> {user?.address || 'N/A'}
              </p>
              <p>
                <strong>ZIP Code:</strong> {user?.zip_code || 'N/A'}
              </p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Roles</h3>
              <ul className="list-disc pl-5">
                {user?.roles?.map((role, index) => (
                  <li key={index}>{role}</li>
                )) || <p>No roles assigned</p>}
              </ul>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <AddressInput onAddressSelected={handleAddressSelected} />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-black text-white font-bold rounded hover:from-red-600 hover:to-gray-800 transition-colors"
            >
              Update Profile
            </button>
            {successMessage && (
              <p className="text-green-500 text-center mt-3">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center mt-3">{errorMessage}</p>
            )}
          </form>
        </section>

        {/* Activities Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Your Activities</h2>
          <ul className="space-y-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <li>Active requests: 0</li>
            <li>Offered services: 0</li>
          </ul>
        </section>

        {/* Quick Links Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Quick Actions</h2>
          <div className="flex space-x-4">
            <button className="py-2 px-4 bg-gradient-to-r from-red-500 to-black text-white font-bold rounded hover:from-red-600 hover:to-gray-800 transition-colors">
              Publish Service
            </button>
            <button className="py-2 px-4 bg-gradient-to-r from-red-500 to-black text-white font-bold rounded hover:from-red-600 hover:to-gray-800 transition-colors">
              Find Helpers
            </button>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-gradient-to-r from-black to-red-500 text-white text-center py-4">
          <p className="text-sm">© 2025 OiDiVi Helper. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
