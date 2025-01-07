import { useState } from 'react';
import api from '../utils/api'; // Instancia de Axios configurada para tu backend

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  accepted_terms: boolean;
  profile_photo?: File | null; // Agregado opcional para archivo
  profile_video?: File | null; // Agregado opcional para archivo
}

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string[]> | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const register = async (data: RegisterData | FormData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const headers =
        data instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' };

      const response = await api.post('/register', data, { headers });
      setSuccessMessage(response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.errors || null);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, successMessage };
};

export default useRegister;
