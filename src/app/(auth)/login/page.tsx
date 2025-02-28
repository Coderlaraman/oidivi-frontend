"use client";

import DynamicBackground from "@/components/home/DynamicBackground";
import LoginForm from "@/components/auth/LoginForm";
import LoginSidebar from "@/components/auth/LoginSidebar";

export default function LoginPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo dinámico */}
      <DynamicBackground />

      {/* Contenedor principal dividido en dos columnas */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
        {/* Columna izquierda: formulario de login centrado */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <LoginForm />
        </div>

        {/* Columna derecha: contenido centrado */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <LoginSidebar />
        </div>
      </div>
    </div>
  );
}
