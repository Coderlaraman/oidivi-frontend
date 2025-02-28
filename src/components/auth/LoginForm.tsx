"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/useLogin";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? "" : "Invalid email format";
    }
    if (name === "password") {
      return value.length >= 6 ? "" : "Password must be at least 6 characters";
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Validar el campo en tiempo real
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones antes de enviar el formulario
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      await login(formData);
      if (!error) {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div
      className="
        w-full max-w-md
        bg-[#ffffff]/40 dark:bg-[#000000]/40
        shadow-lg shadow-gray-500 dark:shadow-gray-800
        rounded-xl
        p-6 md:p-8
        backdrop-blur-md
        transition-all duration-300
      "
    >
      {/* <h1 className="text-3xl font-bold mb-6 text-center text-red-600 dark:text-red-500">
        Login to {process.env.NEXT_PUBLIC_APP_NAME}
      </h1> */}

      {/* Logo Responsivo */}
      <div className="flex justify-center mb-4">
        <Link href="/">
          <div className="relative">
            {/* Logo para el modo claro */}
            <Image
              src="/images/logo-light.png"
              alt="Logo Light"
              width={250}
              height={150}
              className="mx-auto max-w-[200px] md:max-w-[250px] h-auto cursor-pointer block dark:hidden"
              priority
            />
            {/* Logo para el modo oscuro */}
            <Image
              src="/images/logo-dark.png"
              alt="Logo Dark"
              width={250}
              height={150}
              className="mx-auto max-w-[200px] md:max-w-[250px] h-auto cursor-pointer hidden dark:block"
              priority
            />
          </div>
        </Link>
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`
              w-full rounded-md border px-3 py-2 transition-all
              ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-red-600"
              }
              bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-1 focus:border-transparent
            `}
            onChange={handleInputChange}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`
              w-full rounded-md border px-3 py-2 transition-all
              ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-red-600"
              }
              bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-1 focus:border-transparent
            `}
            onChange={handleInputChange}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember_me"
              id="remember_me"
              className="h-4 w-4 text-red-600 border-gray-300 dark:border-gray-700 rounded focus:ring-1 focus:ring-red-600 focus:outline-none"
              onChange={handleInputChange}
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-md font-bold text-white transition-all
            bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-800
            focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer
          "
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                />
              </svg>
              Logging in...
            </div>
          ) : (
            "Log in"
          )}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-3">
            {error.email || error.password || "Login failed."}
          </p>
        )}
      </form>
    </div>
  );
}
