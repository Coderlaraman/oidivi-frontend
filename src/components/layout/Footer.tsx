import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo e información */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-red-500">OiDiVi Helper</h2>
            <p className="text-gray-400 mt-2">
              Connecting users with skilled professionals worldwide.
            </p>
          </div>

          {/* Enlaces de navegación */}
          <div className="flex space-x-6 text-gray-300">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>

          {/* Redes Sociales */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-8">
          © {new Date().getFullYear()} OiDiVi Helper. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
