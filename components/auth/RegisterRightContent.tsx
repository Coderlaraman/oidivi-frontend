"use client";

import React from "react";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";

export default function RegisterRightContent() {
  const { t } = useLanguage();

  return (
    <div className="text-center text-gray-700 dark:text-gray-300">
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        {t("common.welcome")}
      </h2>
      <p className="text-base md:text-lg mb-4">{t("common.welcomeMessage")}</p>
      <div className="relative w-full aspect-video max-h-[50vh] rounded-lg shadow-md overflow-hidden">
        <Image
          src="/images/register-bg.jpg"
          alt="Register Background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
