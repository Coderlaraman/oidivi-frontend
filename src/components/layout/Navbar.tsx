// Coloca la directiva "use client" al principio del archivo
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all ${scrolling ? "bg-black/90 shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/images/logo.jpeg"  // Ruta del logo dentro de la carpeta public
                        alt="OiDiVi Helper Logo"
                        className="h-10 hover:shadow hover:shadow-red-300"  // Ajusta el tamaño según sea necesario
                    />
                </Link>
                <div className="flex justify-center gap-4">
                    <Link href="#features" className="hover:text-red-600">
                        Features
                    </Link>
                    <Link href="#about" className="hover:text-red-600">
                        About Us
                    </Link>
                    <Link href="#contact" className="hover:text-red-600">
                        Contact
                    </Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <div className="mt-0 flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/login" className="bg-gray-900 px-6 py-3 rounded text-white hover:bg-gray-800">
                            Login
                        </Link>
                        <Link href="/register" className="bg-red-600 px-6 py-3 rounded text-white hover:bg-red-500">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
