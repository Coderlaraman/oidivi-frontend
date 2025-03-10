"use client";

import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import RegisterRightContent from "@/components/auth/RegisterRightContent";
import { useLanguage } from "@/components/language-provider";

export default function RegisterPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col lg:flex-row lg:max-h-screen overflow-hidden">
      {/* Sección Izquierda - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black lg:overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <RegisterForm />
        </div>
      </div>

      {/* Sección Derecha - Contenido adicional */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black lg:overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <RegisterRightContent />
        </div>
      </div>
    </div>
  );
}
