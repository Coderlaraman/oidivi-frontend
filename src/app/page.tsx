'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import DynamicBackground from '../components/home/DynamicBackground';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Navbar />
      <DynamicBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Image
              src="/images/logo.png"
              alt="OiDiVi Helper Logo"
              width={450}
              height={300}
              className="mx-auto mb-6 max-w-full h-auto"
              priority
            />

            <h1 className="text-3xl md:text-5xl font-bold text-red-600 dark:text-red-500 mb-8">
              Your Partner in Task Completion and Service Hiring
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Discover skilled professionals to complete tasks, hire services,
              and optimize your time with full security.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login">
                <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg">
                  Get Started Now
                </button>
              </Link>

              <Link href="/register">
                <button className="px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold rounded-lg transition-colors duration-300 shadow-lg">
                  Get an Account
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">
            Why Choose OiDiVi Helper?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Security Guaranteed',
                description:
                  'Identity verification, secure payments, and data protection for a safe experience.',
                icon: '🔒',
              },
              {
                title: 'Tailored Services',
                description:
                  'Easily find and hire helpers based on location, expertise, and budget.',
                icon: '⚙️',
              },
              {
                title: '24/7 Support',
                description:
                  'Real-time support and instant messaging for seamless communication.',
                icon: '🛡️',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg shadow-gray-500 dark:hover:shadow-red-700 hover:shadow-red-500 transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-500 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
