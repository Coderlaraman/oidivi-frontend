"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

export default function LoginForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const { login, loading, error, successMessage } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError(t("errors.invalidEmail"));
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setFormError(t("errors.passwordLength"));
      return;
    }

    setFormError(null);
    await login(formData);
  };

  useEffect(() => {
    if (successMessage) {
      setFormData({
        email: "",
        password: "",
        remember_me: false,
      });

      Swal.fire({
        title: "Login Successful!",
        text: successMessage,
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        router.push("/dashboard");
      });
    }
  }, [successMessage, router]);

  useEffect(() => {
    if (error) {
      const errorMessage = Object.values(error).flat().join(" ");
      setFormError(errorMessage);
    }
  }, [error]);

  return (
    <div className="w-full bg-[#ffffff]/40 dark:bg-[#000000]/40 shadow-lg shadow-gray-500 dark:shadow-gray-700 rounded-xl p-4 md:p-6 backdrop-blur-md transition-all duration-300">
      <div className="flex justify-center mb-4">
        <Link href="/">
          <div className="relative">
            <Image
              src="/images/logo-light.png"
              alt="Logo Light"
              width={180}
              height={100}
              className="mx-auto w-[150px] sm:w-[180px] h-auto cursor-pointer block dark:hidden"
              priority
            />
            <Image
              src="/images/logo-dark.png"
              alt="Logo Dark"
              width={180}
              height={100}
              className="mx-auto w-[150px] sm:w-[180px] h-auto cursor-pointer hidden dark:block"
              priority
            />
          </div>
        </Link>
      </div>

      {formError && (
        <p className="text-center text-red-500 mb-4">{formError}</p>
      )}

      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t("login.email")}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 transition-all border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t("login.password")}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 transition-all border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember_me"
            id="remember_me"
            checked={formData.remember_me}
            onChange={handleChange}
            className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label
            htmlFor="remember_me"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            {t("login.rememberMe")}
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-bold text-sm text-white transition-all bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-800"
          disabled={loading}
        >
          {loading ? t("common.loading") : t("login.signIn")}
        </button>

        <p className="mt-3 text-center text-sm">
          {t("login.noAccount")}{" "}
          <Link href="/register" className="text-blue-500">
            {t("login.createAccount")}
          </Link>
        </p>
      </form>
    </div>
  );
}
