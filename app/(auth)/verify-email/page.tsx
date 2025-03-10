// pages/verify-email.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { ArrowLeft, MailCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";

export default function VerifyEmailPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50/95 dark:bg-neutral-900/95 backdrop-blur-xl">
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white dark:bg-neutral-800/90 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-neutral-700"
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Icono animado */}
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full animate-ping" />
              <MailCheck className="h-16 w-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
            </div>

            {/* Contenido textual */}
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {t("verifyEmail.title") || "Verify Your Email"}
              </h1>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t("verifyEmail.message") ||
                  "We've sent a verification link to your email address. Please check your inbox and follow the instructions to activate your account."}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Link href="/login" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t("verifyEmail.goToLogin") || "Return to Login"}
                </Link>
              </Button>

              <Button
                asChild
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <Link href="/resend-verification" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  {t("verifyEmail.resendEmail") || "Resend Email"}
                </Link>
              </Button>
            </div>

            {/* Nota adicional */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
              {t("verifyEmail.note") ||
                "Didn't receive the email? Check your spam folder or contact support."}
            </p>
          </div>
        </motion.div>

        <div className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
          <CountdownTimer initialMinutes={5} />
        </div>
      </div>
    </div>
  );
}
