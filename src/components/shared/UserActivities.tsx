'use client';

import React from 'react';

interface UserActivitiesProps {
  activities: {
    activeRequests: number;
    offeredServices: number;
  };
}

const UserActivities: React.FC<UserActivitiesProps> = ({ activities }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-700">
        Your Activities
      </h2>
      <ul className="space-y-2 p-4 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-md">
        <li className="text-gray-900 dark:text-gray-200">
          Active requests:{' '}
          <span className="font-semibold">{activities.activeRequests}</span>
        </li>
        <li className="text-gray-900 dark:text-gray-200">
          Offered services:{' '}
          <span className="font-semibold">{activities.offeredServices}</span>
        </li>
      </ul>
    </section>
  );
};

export default UserActivities;
