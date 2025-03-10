"use client";

import React from "react";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";

export default function LoginRightContent() {
  const { t } = useLanguage();

  return (
    <div className="text-center text-gray-700 dark:text-gray-300">
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        {t("common.welcome")}
      </h2>
      <p className="text-base md:text-lg mb-4">{t("common.welcomeBack")}</p>
      <div className="relative w-full aspect-video max-h-[50vh] rounded-lg shadow-md overflow-hidden">
        <Image
          src="/images/login-bg.jpg"
          alt="Login Background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
