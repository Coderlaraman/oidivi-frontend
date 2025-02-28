'use client';

import DynamicBackground from '@/components/home/DynamicBackground';
import Image from 'next/image';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo dinámico */}
      <DynamicBackground />

      {/* Contenedor principal dividido en dos columnas */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
        {/* Columna izquierda: formulario de registro centrado */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <RegisterForm />
        </div>

        {/* Columna derecha: contenido futuro centrado */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="text-center text-gray-700 dark:text-gray-300 space-y-4">
            <div className="flex flex-col items-center space-y-4 text-gray-700 dark:text-gray-300">
              <Image
                src="/images/teamwork2.jpg"
                alt="Professional Collaboration"
                width={500}
                height={250}
                className="rounded-lg shadow-lg shadow-gray-500 dark:shadow-gray-700"
              />
              <p className="text-lg italic font-semibold">
                "Boost your productivity with the right professionals."
              </p>
            </div>

            <div className="text-center text-gray-700 dark:text-gray-300 space-y-4 mb-4">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
                Why Choose OiDiVi Helper?
              </h2>
              <ul className="text-sm space-y-2">
                <li>✔️ Secure transactions & identity verification</li>
                <li>✔️ Verified professionals & client ratings</li>
                <li>✔️ 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
