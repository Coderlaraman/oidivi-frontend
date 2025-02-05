'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLogin from '@/hooks/useLogin';

const LoginForm = () => {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);

    if (!error) {
      router.push('/dashboard'); // Redirige al dashboard tras el login exitoso
    }
  };

  return (
    <div className="p-6 w-1/3 mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-500 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-3 text-center text-red-600">
        Login to OiDiVi Helper
      </h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full p-3 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
            onChange={handleInputChange}
          />
          {error?.email && (
            <p className="text-red-500 text-sm mt-1">{error.email[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full p-3 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
            onChange={handleInputChange}
            aria-invalid={!!error?.email}
          />
          {error?.password && (
            <p className="text-red-500 text-sm mt-1">{error.password[0]}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-red-500 to-black text-white font-bold rounded hover:from-red-600 hover:to-gray-800 transition-colors"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        {error && (
          <p className="text-red-500 text-center mt-3">Login failed.</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
