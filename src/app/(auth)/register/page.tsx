'use client';

import DynamicBackground from '@/components/home/DynamicBackground';
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
          <div className="text-center text-gray-700 dark:text-gray-300">
            <p className="text-lg font-semibold">[Contenido futuro]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
