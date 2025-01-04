'use client';

import useAuth from '@/hooks/useAuth';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      {user.profile_photo_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.profile_photo_url}
          alt="Profile"
          className="mt-4 w-32 h-32 rounded-full"
        />
      )}
      <button
        onClick={logout}
        className="mt-6 py-2 px-4 bg-red-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Log out'}
      </button>
    </div>
  );
};

export default Dashboard;
