'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-red-500 to-black">
        <h1 className="text-2xl font-bold">OiDiVi Helper</h1>
        <nav className="space-x-4">
          <a href="/login" className="hover:underline">
            Log in
          </a>
          <a href="/register" className="hover:underline">
            Register
          </a>
        </nav>
      </header>
      {/* Main Section */}
      <main className="flex flex-col items-center text-center px-6 py-12">
        <h2 className="text-4xl font-bold text-red-500 mb-6">
          Welcome to OiDiVi Helper
        </h2>
        <p className="text-lg mb-12">
          Connecting users and service providers with trust and professionalism.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-red-500 mb-4">
              Find Services
            </h3>
            <p className="text-sm mb-4">
              Explore services in your area with advanced filters to find
              exactly what you need.
            </p>
            <Link
              href="/find-services"
              className="text-red-500 hover:underline"
            >
              Learn More
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-red-500 mb-4">
              Offer Your Skills
            </h3>
            <p className="text-sm mb-4">
              Create your profile and start receiving requests from users who
              need your services.
            </p>
            <Link
              href="/create-profile"
              className="text-red-500 hover:underline"
            >
              Create Profile
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-red-500 mb-4">
              Secure Platform
            </h3>
            <p className="text-sm mb-4">
              We ensure a safe experience with reviews, ratings, and protected
              payments.
            </p>
            <Link
              href="/secure-platform"
              className="text-red-500 hover:underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="text-center py-6 bg-gradient-to-r from-red-500 to-black">
        <p className="text-sm">© 2025 OiDiVi Helper. All rights reserved.</p>
      </footer>
    </div>
  );
}
