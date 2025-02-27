// src/components/auth/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddressInput from '@/components/shared/AddressInput';
import useRegister from '@/hooks/useRegister';

export default function RegisterForm() {
  const router = useRouter();
  const { register, loading, error, successMessage } = useRegister();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    if (successMessage) {
      router.push('/login');
    }
  };

  return (
    <div
      className="
        w-full max-w-md
        bg-gray-100/80 dark:bg-gray-800/80
        backdrop-blur-md
        text-gray-900 dark:text-gray-100
        rounded-xl shadow-2xl
        p-6 md:p-8
      "
    >
      <h1 className="text-3xl font-bold mb-4 text-center text-red-600 dark:text-red-500">
        Register in {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>

      {successMessage && (
        <p className="text-center text-green-500 mb-4">{successMessage}</p>
      )}
      {formError && (
        <p className="text-center text-red-500 mb-4">{formError}</p>
      )}

      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'name', type: 'text', label: 'Name' },
          { name: 'email', type: 'email', label: 'Email' },
          { name: 'password', type: 'password', label: 'Password' },
          {
            name: 'password_confirmation',
            type: 'password',
            label: 'Confirm Password',
          },
        ].map(({ name, type, label }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              className="
                w-full
                rounded-md
                border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800
                px-3 py-2
                placeholder-gray-400
                text-gray-800 dark:text-gray-100
                focus:outline-none
                focus:ring-2 focus:ring-red-600
                focus:border-transparent
                transition-colors
              "
              onChange={handleInputChange}
            />
            {error?.[name] && (
              <p className="text-red-500 text-sm mt-1">{error[name][0]}</p>
            )}
          </div>
        ))}

        {/* AddressInput */}
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
              w-full
              rounded-md
              border border-gray-300 dark:border-gray-700
              bg-gray-50 dark:bg-gray-800
              px-3 py-2
              placeholder-gray-400
              text-gray-800 dark:text-gray-100
              focus:outline-none
              focus:ring-2 focus:ring-red-600
              focus:border-transparent
              transition-colors
            "
          />
          {error?.address && (
            <p className="text-red-500 text-sm mt-1">{error.address[0]}</p>
          )}
        </div>

        {/* Checkbox Términos */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="accepted_terms"
            id="accepted_terms"
            className="
              h-4 w-4
              text-red-600
              border-gray-300 dark:border-gray-700
              rounded
              focus:ring-2 focus:ring-red-600
              focus:outline-none
            "
            onChange={handleInputChange}
          />
          <label
            htmlFor="accepted_terms"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to the terms and conditions
          </label>
        </div>
        {error?.accepted_terms && (
          <p className="text-red-500 text-sm">{error.accepted_terms[0]}</p>
        )}

        {/* Botón de Envío */}
        <button
          type="submit"
          className="
            w-full py-3
            bg-gradient-to-r from-red-600 to-black
            hover:from-red-700 hover:to-gray-800
            text-white font-bold
            rounded-md
            focus:outline-none
            focus:ring-2 focus:ring-red-600
            transition-colors
          "
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
