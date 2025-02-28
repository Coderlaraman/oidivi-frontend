'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddressInput from '@/components/shared/AddressInput';
import Image from 'next/image';
import Link from 'next/link';
import useRegister from '@/hooks/useRegister';
import Swal from 'sweetalert2'; // Importar SweetAlert2

export default function RegisterForm() {
  const router = useRouter();
  const { register, loading, error, successMessage } = useRegister();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    address: '',
    zip_code: '',
    latitude: 0,
    longitude: 0,
    accepted_terms: false,
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddressSelected = (location: any) => {
    setFormData((prev) => ({
      ...prev,
      address: location.address,
      zip_code: location.zip_code,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación del nombre
    if (!formData.name || formData.name.trim().length < 2) {
      setFormError('Please provide a valid name (at least 2 characters).');
      return;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please provide a valid email address.');
      return;
    }

    if (!formData.phone) {
      setFormError('Please provide a valid phone number.');
      return;
    }

    // Validación de la contraseña
    if (!formData.password || formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    // Validación de la confirmación de la contraseña
    if (formData.password !== formData.password_confirmation) {
      setFormError('Passwords do not match.');
      return;
    }

    if (!formData.zip_code) {
      setFormError('Please select a valid address with a ZIP code.');
      return;
    }

    if (!formData.accepted_terms) {
      setFormError('You must accept the terms and conditions to register.');
      return;
    }

    setFormError(null);
    await register(formData);
  };

  useEffect(() => {
    if (successMessage) {
      // Limpiar los campos del formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        address: '',
        zip_code: '',
        latitude: 0,
        longitude: 0,
        accepted_terms: false,
      });

      Swal.fire({
        title: 'Registration Successful!',
        text: successMessage,
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        router.push('/dashboard'); // Redirigir al dashboard después de cerrar el alert
      });
    }
  }, [successMessage, router]);

  return (
    <div
      className="
        w-full max-w-[500px]
        bg-[#ffffff]/40 dark:bg-[#000000]/40
        shadow-lg shadow-gray-500 dark:shadow-gray-700
        rounded-xl
        p-6 md:p-8
        backdrop-blur-md
        transition-all duration-300
      "
    >
      {/* Logo Responsivo */}
      <div className="flex justify-center mb-4">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="OiDiVi Helper Logo"
            width={250}
            height={150}
            className="mx-auto max-w-[200px] md:max-w-[250px] h-auto cursor-pointer"
            priority
          />
        </Link>
      </div>

      {formError && (
        <p className="text-center text-red-500 mb-2">{formError}</p>
      )}

      <form noValidate onSubmit={handleSubmit} className="space-y-2">
        {/* Nombre y Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="
                w-full rounded-md border px-3 py-2 transition-all
                border-gray-300 dark:border-gray-700
                focus:ring-red-600 focus:border-red-600
                bg-gray-50 dark:bg-gray-800
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-1
              "
              onChange={handleInputChange}
            />
          </div>
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
              className="
                w-full rounded-md border px-3 py-2 transition-all
                border-gray-300 dark:border-gray-700
                focus:ring-red-600 focus:border-red-600
                bg-gray-50 dark:bg-gray-800
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-1
              "
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            pattern="^\+?[0-9]{10,15}$"
            title="Please enter a valid phone number (10-15 digits, optionally starting with '+')."
            className="
    w-full rounded-md border px-3 py-2 transition-all
    border-gray-300 dark:border-gray-700
    focus:ring-red-600 focus:border-red-600
    bg-gray-50 dark:bg-gray-800
    text-gray-800 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:ring-1
  "
            onChange={handleInputChange}
          />
        </div>

        {/* Contraseña y Confirmación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className="
                w-full rounded-md border px-3 py-2 transition-all
                border-gray-300 dark:border-gray-700
                focus:ring-red-600 focus:border-red-600
                bg-gray-50 dark:bg-gray-800
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-1
              "
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              className="
                w-full rounded-md border px-3 py-2 transition-all
                border-gray-300 dark:border-gray-700
                focus:ring-red-600 focus:border-red-600
                bg-gray-50 dark:bg-gray-800
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-1
              "
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Dirección */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Address
          </label>
          <AddressInput
            onAddressSelected={handleAddressSelected}
            inputClassName="
              w-full rounded-md border px-3 py-2 transition-all
              border-gray-300 dark:border-gray-700
              focus:ring-red-600 focus:border-red-600
              bg-gray-50 dark:bg-gray-800
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-1
            "
          />
        </div>

        {/* Checkbox Términos */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="accepted_terms"
            id="accepted_terms"
            className="h-4 w-4 text-red-600 border-gray-300 dark:border-gray-700 rounded focus:ring-1 focus:ring-red-600 focus:outline-none"
            onChange={handleInputChange}
          />
          <label
            htmlFor="accepted_terms"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to the terms and conditions
          </label>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-md font-bold text-white transition-all
            bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-800
            focus:outline-none focus:ring-2 focus:ring-red-600
          "
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
