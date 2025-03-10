"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddressInput from "@/components/shared/AddressInput";
import Image from "next/image";
import Link from "next/link";
import useRegister from "@/hooks/useRegister";
import Swal from "sweetalert2";
import { AddressLocation } from "@/types";
import { useLanguage } from "@/components/language-provider";

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const { register, loading, successMessage, error } = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    address: "",
    zip_code: "",
    latitude: 0,
    longitude: 0,
    accepted_terms: false,
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormError(null); // Limpiar error al cambiar cualquier campo
  };

  const handleAddressSelected = (location: AddressLocation) => {
    setFormData((prev) => ({
      ...prev,
      ...location, // No se necesita especificar cada campo, porque location ya los tiene
    }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación del nombre
    if (!formData.name || formData.name.trim().length < 2) {
      setFormError("Please provide a valid name (at least 2 characters).");
      return;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError("Please provide a valid email address.");
      return;
    }

    if (!formData.phone || !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      setFormError("Please provide a valid phone number.");
      return;
    }

    // Validación de la contraseña
    if (!formData.password || formData.password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    // Validación de la confirmación de la contraseña
    if (formData.password !== formData.password_confirmation) {
      setFormError("Passwords do not match.");
      return;
    }

    if (!formData.zip_code) {
      setFormError("Please select a valid address with a ZIP code.");
      return;
    }

    if (!formData.accepted_terms) {
      setFormError("You must accept the terms and conditions to register.");
      return;
    }

    setFormError(null);
    await register(formData);
  };

  useEffect(() => {
    if (successMessage) {
      // Limpiar los campos del formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        address: "",
        zip_code: "",
        latitude: 0,
        longitude: 0,
        accepted_terms: false,
      });

      Swal.fire({
        title: "Registration Successful!",
        text: "A verification email has been sent to your email address. Please check your inbox and verify your account.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        // Redirigir a la página de verificación en lugar del dashboard
        router.push("/verify-email");
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
    <div className="w-full min-w-[500px] bg-[#ffffff]/40 dark:bg-[#000000]/40 shadow-lg shadow-gray-500 dark:shadow-gray-700 rounded-xl p-4 md:p-6 backdrop-blur-md transition-all duration-300 mx-auto">
      {/* Logo Responsivo */}
      <div className="flex justify-center mb-4">
        <Link href="/">
          <div className="relative">
            <Image
              src="/images/logo-light.png"
              alt="Logo Light"
              width={200}
              height={120}
              className="mx-auto max-w-[150px] md:max-w-[200px] h-auto cursor-pointer block dark:hidden"
              priority
            />
            <Image
              src="/images/logo-dark.png"
              alt="Logo Dark"
              width={200}
              height={120}
              className="mx-auto max-w-[150px] md:max-w-[200px] h-auto cursor-pointer hidden dark:block"
              priority
            />
          </div>
        </Link>
      </div>

      {error && (
        <p className="text-center text-red-500 mb-4">{JSON.stringify(error)}</p>
      )}
      {formError && (
        <p className="text-center text-red-500 mb-4">{formError}</p>
      )}

      <form noValidate onSubmit={handleSubmit} className="space-y-3">
        {/* Primera fila: Nombre y Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5"
            >
              {t("register.fullName")}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border px-3 py-2 transition-all border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5"
            >
              {t("register.email")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-md border px-3 py-2 transition-all border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
              required
            />
          </div>
        </div>

        {/* Segunda fila: Contraseña y Confirmación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("register.password")}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-md border px-3 py-2 transition-all border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("register.confirmPassword")}
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className="w-full rounded-md border px-3 py-2 transition-all border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
              required
            />
          </div>
        </div>

        {/* Tercera fila: Teléfono y Dirección */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("register.phone") || "Phone"}
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full rounded-md border px-3 py-2 transition-all border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("register.address") || "Address"}
            </label>
            <AddressInput
              onAddressSelected={handleAddressSelected}
              inputClassName="w-full rounded-md border px-3 py-2 transition-all border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
            />
          </div>
        </div>

        {/* Checkbox de Términos */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            name="accepted_terms"
            id="accepted_terms"
            checked={formData.accepted_terms}
            onChange={handleInputChange}
            className="h-4 w-4 text-red-600 border-gray-300 dark:border-gray-700 rounded focus:ring-1 focus:ring-red-600 focus:outline-none"
            required
          />
          <label
            htmlFor="accepted_terms"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            {t("register.acceptTerms") || "I accept the terms and conditions"}
          </label>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-bold text-sm text-white transition-all bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Registering..." : t("register.createAccount")}
        </button>

        <p className="mt-3 text-center text-sm">
          {t("register.haveAccount")}{" "}
          <Link href="/login" className="text-blue-500">
            {t("register.signIn")}
          </Link>
        </p>
      </form>
    </div>
  );
}
