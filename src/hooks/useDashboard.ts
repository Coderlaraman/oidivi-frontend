import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/navigation';

const useDashboard = () => {
  const [user, setUser] = useState(null); // Datos del usuario autenticado
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Error
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/me'); // Endpoint para obtener los datos del usuario autenticado
      setUser(response.data.data); // Guarda los datos del usuario en el estado
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 401) {
        // Si el token es inválido o expiró, redirige al login
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
      router.push('/login'); // Redirige si no hay token
    } else {
      fetchUser(); // Obtén los datos del usuario si hay token
    }
  }, []);

  return { user, loading, error };
};

export default useDashboard;
