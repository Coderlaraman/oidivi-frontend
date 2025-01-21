'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
  faPlusCircle,
  faClipboardList,
  faComments,
  faWallet,
  faStar,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

interface SidebarDesktopProps {
  onEditProfile: () => void;
}

const sidebarOptions = [
  { label: 'Dashboard', icon: faHome, route: '/dashboard' },
  { label: 'Search Services', icon: faSearch, route: '/services' },
  { label: 'Post a Job', icon: faPlusCircle, route: '/post-job' },
  { label: 'My Jobs', icon: faClipboardList, route: '/my-jobs' },
  { label: 'Messages', icon: faComments, route: '/messages' },
  { label: 'Transactions', icon: faWallet, route: '/transactions' },
  { label: 'Reviews', icon: faStar, route: '/reviews' },
  { label: 'Settings', icon: faCog, route: '/settings' },
];

const SidebarDesktop: React.FC<SidebarDesktopProps> = ({ onEditProfile }) => {
  const [activeOption, setActiveOption] = useState('/dashboard');

  const handleOptionClick = (route: string) => {
    setActiveOption(route);
    if (route === '/edit-profile') {
      onEditProfile();
    }
    console.log(`Navigating to: ${route}`);
  };

  return (
    <aside className="hidden md:block w-64 bg-gray-100 dark:bg-gray-800 p-6 border-r border-gray-300 dark:border-gray-700">
      <nav className="space-y-4">
        {sidebarOptions.map((option) => (
          <button
            key={option.route}
            onClick={() => handleOptionClick(option.route)}
            className={`flex items-center py-2 px-4 rounded-lg ${
              activeOption === option.route
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <FontAwesomeIcon icon={option.icon} className="mr-3" />
            {option.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarDesktop;
