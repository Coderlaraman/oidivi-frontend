"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [message, setMessage] = useState(
    t("verifyEmail.verifying") || "Verifying your email..."
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchParams) return;
    // Extraer parámetros usando searchParams
    const id = searchParams.get("id");
    const hash = searchParams.get("hash");
    const expires = searchParams.get("expires");
    const signature = searchParams.get("signature");

    // Verificar que todos los parámetros existan
    if (!id || !hash || !expires || !signature) {
      setError(
        t("verifyEmail.missingParams") || "Missing verification parameters."
      );
      return;
    }

    // Llamar a la API de Laravel para completar la verificación
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/client/email/verify/${id}/${hash}`,
        {
          params: { expires, signature },
          withCredentials: true,
        }
      )
      .then((response) => {
        setMessage(
          t("verifyEmail.success") ||
            "Your email has been verified successfully!"
        );
      })
      .catch((err) => {
        console.error("Verification error:", err.response || err);
        const errorMsg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          t("verifyEmail.error") ||
          "There was an error verifying your email.";
        setError(errorMsg);
      });
  }, [searchParams, t]);

  return (
    <div className="min-h-screen bg-gray-50/95 dark:bg-neutral-900/95 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white dark:bg-neutral-800/90 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-neutral-700"
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Icono dinámico */}
          <div className="relative">
            {error ? (
              <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
            ) : (
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
            )}
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
            {t("verifyEmail.title") || "Email Verification"}
          </h1>

          {error ? (
            <div className="w-full p-4 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-red-700 dark:text-red-300 text-center">
                {error}
              </p>
            </div>
          ) : (
            <div className="w-full p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-700 dark:text-green-300 text-center">
                {message}
              </p>
            </div>
          )}

          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {t("verifyEmail.goToLogin") || "Go to Login"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
