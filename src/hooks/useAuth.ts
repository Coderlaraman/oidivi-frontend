import { useState, useEffect } from 'react';
import api from '../lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  profile_photo_url?: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      setUser(null);
    } catch {
      setError('Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/profile')
        .then((response) => setUser(response.data.user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  return { user, login, logout, loading, error };
};

export default useAuth;
