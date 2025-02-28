// components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  // Función para abrir/cerrar el menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Parte Izquierda: Enlaces básicos */}
          <div className="flex items-center font-semibold">
            <div className="hidden md:flex ml-4 space-x-6">
              <Link
                href="/"
                className="text-gray-800 dark:text-gray-200 hover:text-red-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-800 dark:text-gray-200 hover:text-red-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-gray-800 dark:text-gray-200 hover:text-red-600 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 dark:text-gray-200 hover:text-red-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Parte Derecha: Enlaces Login/Register y botón para menú móvil */}
          <div className="flex items-center font-semibold">
            <div className="hidden md:flex space-x-4">
              {/* <Link href="/login" className="text-gray-800 dark:text-gray-200 hover:text-red-600 transition-colors">
                Login
              </Link>
              <Link href="/register" className="text-gray-800 dark:text-gray-200 hover:text-red-600 transition-colors">
                Register
              </Link> */}
            </div>

            {/* Botón menú móvil (visible en pantallas pequeñas) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                aria-label="Open Menu"
              >
                {mobileMenuOpen ? (
                  // Ícono de cerrar (X)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Ícono hamburguesa
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil: se muestra solo en pantallas pequeñas */}
      {mobileMenuOpen && (
        <div className="md:hidden font-semibold bg-gray-200 bg-opacity-75 dark:bg-gray-700 dark:bg-opacity-75">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block text-gray-800 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-800 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="block text-gray-800 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block text-gray-800 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="block text-gray-800 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block text-gray-800 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
