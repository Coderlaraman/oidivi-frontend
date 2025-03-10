"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import LoginRightContent from "@/components/auth/LoginRightContent";
import { useLanguage } from "@/components/language-provider";

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col lg:flex-row lg:max-h-screen overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black lg:overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <LoginForm />
        </div>
      </div>

      {/* Right Section - Additional Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black lg:overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <LoginRightContent />
        </div>
      </div>
    </div>
  );
}
