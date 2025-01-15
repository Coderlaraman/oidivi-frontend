import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';
import { User } from '../types/index';

const useDashboard = () => {
  const [user, setUser] = useState<User | null>(null); // Define el tipo para el usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/me'); // Llama al endpoint para obtener los datos del usuario
      setUser(response.data.data); // Establece el usuario en el estado
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken');
        router.push('/login');
      } else {
        setError('Error fetching user data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    } else {
      fetchUser();
    }
  }, []);

  return { user, loading, error };
};

export default useDashboard;
