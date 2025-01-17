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
      <h2 className="text-2xl font-bold text-red-600">Your Activities</h2>
      <ul className="space-y-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <li>Active requests: {activities.activeRequests}</li>
        <li>Offered services: {activities.offeredServices}</li>
      </ul>
    </section>
  );
};

export default UserActivities;
