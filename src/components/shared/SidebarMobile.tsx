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

interface SidebarMobileProps {
  onEditProfile: () => void;
  onClose: () => void;
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

const SidebarMobile: React.FC<SidebarMobileProps> = ({
  onEditProfile,
  onClose,
}) => {
  const [activeOption, setActiveOption] = useState('/dashboard');

  const handleOptionClick = (route: string) => {
    setActiveOption(route);
    if (route === '/edit-profile') {
      onEditProfile();
    }
    onClose(); // Cierra el menú al seleccionar una opción
    console.log(`Navigating to: ${route}`);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose} // Cierra el menú al hacer clic fuera
    >
      <aside
        className="w-64 bg-gray-200 dark:bg-gray-900 p-6 h-full relative"
        onClick={(e) => e.stopPropagation()} // Evita el cierre al hacer clic dentro del menú
      >
        <nav className="mt-16 space-y-4">
          {sidebarOptions.map((option) => (
            <button
              key={option.route}
              onClick={() => handleOptionClick(option.route)}
              className={`flex items-center py-2 px-4 rounded-lg ${
                activeOption === option.route
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={option.icon} className="mr-3" />
              {option.label}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default SidebarMobile;
