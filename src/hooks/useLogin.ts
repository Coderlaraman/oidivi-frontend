import { useState } from "react";
import api from "../lib/api";

interface LoginData {
  email: string;
  password: string;
  remember_me?: boolean;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string[]> | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data.data.token; // Accede correctamente al token
      if (token) {
        localStorage.setItem("authToken", token); // Guarda el token en localStorage
      }

      setSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.errors || null);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
