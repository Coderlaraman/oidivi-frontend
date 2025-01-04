'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    if (!error) router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
          className="w-full p-3 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-red-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
};

export default LoginForm;
