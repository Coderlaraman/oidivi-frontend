'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <Link href="/" className="text-white text-xl font-bold">
                            Logo
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="flex space-x-8">
                            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
                                Home
                            </Link>
                            <Link href="/about" className="text-white hover:text-blue-400 transition-colors">
                                About
                            </Link>
                            <Link href="/services" className="text-white hover:text-blue-400 transition-colors">
                                Services
                            </Link>
                            <Link href="/contact" className="text-white hover:text-blue-400 transition-colors">
                                Contact
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-white text-black px-4 py-2 rounded hover:bg-blue-400 hover:text-white transition-all"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white p-2"
                        >
                            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                                <span className="block w-6 h-0.5 bg-white transition-all" />
                                <span className="block w-6 h-0.5 bg-white transition-all mt-1.5" />
                                <span className="block w-6 h-0.5 bg-white transition-all mt-1.5" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className="block text-white py-2 hover:text-blue-400 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="block text-white py-2 hover:text-blue-400 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/services"
                            className="block text-white py-2 hover:text-blue-400 transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            href="/contact"
                            className="block text-white py-2 hover:text-blue-400 transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/login"
                            className="block text-white py-2 hover:text-blue-400 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="block text-white py-2 hover:text-blue-400 transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;