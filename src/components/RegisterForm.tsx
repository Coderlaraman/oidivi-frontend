'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddressInput from './AddressInput';
import useRegister from '../hooks/useRegister';

const RegisterForm = () => {
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
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddressSelected = (location: any) => {
    setFormData({
      ...formData,
      address: location.address,
      zip_code: location.zip_code,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    setFormError(null); // Limpiar el error si el código postal se selecciona correctamente
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.zip_code) {
      setFormError('Please select a valid address with a ZIP code.');
      return;
    }

    // Validar campos obligatorios
    if (!formData.accepted_terms) {
      setFormError('You must accept the terms and conditions to register.');
      return;
    }

    setFormError(null); // Limpiar el error antes de enviar el formulario
    await register(formData);

    if (successMessage) {
      router.push('/login');
    }
  };

  return (
    <div className="p-6 w-1/3 mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-500 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-3 text-center text-red-600">
        OiDiVi Helper
      </h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-3">
        {[
          { name: 'name', type: 'text', label: 'Name' },
          { name: 'email', type: 'email', label: 'Email' },
          { name: 'password', type: 'password', label: 'Password' },
          {
            name: 'password_confirmation',
            type: 'password',
            label: 'Confirm password',
          },
        ].map(({ name, type, label }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              className="block w-full p-3 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={handleInputChange}
            />
            {error?.[name] && (
              <p className="text-red-500 text-sm mt-1">{error[name][0]}</p>
            )}
          </div>
        ))}

        <AddressInput
          onAddressSelected={handleAddressSelected}
          inputClassName="w-full p-3 border rounded focus:ring-2 text-gray-900 focus:ring-red-500 focus:outline-none"
        />

        {formError && <p className="text-red-500 text-sm mt-1">{formError}</p>}

        <label className="block text-sm">
          <input
            type="checkbox"
            name="accepted_terms"
            className="mr-2"
            onChange={handleInputChange}
          />
          I agree to the terms and conditions
        </label>
        {error?.accepted_terms && (
          <p className="text-red-500 text-sm mt-1">{error.accepted_terms[0]}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-red-500 to-black text-white font-bold rounded hover:from-red-600 hover:to-gray-800 transition-colors"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
