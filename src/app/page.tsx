'use client';

// import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [location, setLocation] = useState('');
  // const [helpersCount, setHelpersCount] = useState<number | null>(null);

  // const handleSearch = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://oidivi-api.test/api/v1/client/helpers?category=${searchTerm}&location=${location}`
  //     );
  //     const data = await response.json();
  //     setHelpersCount(data.count); // Supongamos que el backend devuelve un `count`
  //   } catch (error) {
  //     console.error('Error fetching helpers:', error);
  //   }
  // };

  return (
    <div className="bg-black text-white">
      {/* Welcome Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-7xl font-bold text-red-500 mb-4">
          Welcome to OiDiVi Helper
        </h2>
        <p className="text-xl">
          Connecting users with skilled helpers around the world.
        </p>
        <div className="mt-6 space-x-4 pt-12">
          <Link
            href="/find-services"
            className="bg-gray-800 text-lg font-semibold px-6 py-3 rounded text-white hover:bg-gray-700"
          >
            Find Services
          </Link>
          <Link
            href="/find-services"
            className="bg-red-500 text-lg font-semibold px-6 py-3 rounded text-white hover:bg-red-600"
          >
            Offer Your Services
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800 text-center px-4 md:px-8">
        {/* Search Section */}
        {/* <section className="flex flex-col items-center pb-10 text-white">
          <h3 className="text-2xl font-semibold mb-6">Find a Helper</h3>
          <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center gap-4 px-4">
            <input
              type="text"
              placeholder="Enter category (e.g., painter, plumber)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder="Enter location (ZIP code)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-2/5 p-3 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Search
            </button>
          </div>
          {helpersCount !== null && (
            <p className="mt-6 text-lg">
              {helpersCount} helpers found in this category and location.
            </p>
          )}
        </section> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Trusted Helpers', description: 'Verified and rated.' },
            { title: 'Easy to Use', description: 'Search and connect easily.' },
            { title: 'Secure Payments', description: 'Safe transactions.' },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-700 rounded shadow-lg flex flex-col items-center"
            >
              <h4 className="text-xl font-semibold text-red-400 mb-4">
                {feature.title}
              </h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
