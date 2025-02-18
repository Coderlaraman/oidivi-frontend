'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaEdit, FaSave } from 'react-icons/fa';
import UserProfileDetails from '@/components/shared/UserProfileDetails';
import EditProfile from '@/components/shared/EditProfile';
import { useTheme } from '@/hooks/useTheme';
import { useUser } from '@/hooks/useUser';

const ProfilePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser } = useUser();

  const backgroundImage = theme === 'dark'
    ? '/profile-background-dark.jpg'
    : '/profile-background-light.jpg';

  const menuItems = [
    { label: 'Profile', icon: '👤' },
    { label: 'Settings', icon: '⚙️' },
    { label: 'Security', icon: '🔒' },
    { label: 'Logout', icon: '🚪' }
  ];

  const handleProfileUpdate = async (updatedData: any) => {
    try {
      await updateUser(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed', error);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Profile Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="opacity-50"
        />
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-white/30 dark:bg-black/30 p-2 rounded-full"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 z-40 shadow-lg p-6"
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <span className="mr-4">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {isEditing ? (
            <EditProfile
              user={user}
              onClose={() => setIsEditing(false)}
              onSubmit={handleProfileUpdate}
            />
          ) : (
            <UserProfileDetails
              user={user}
              onEditProfile={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
