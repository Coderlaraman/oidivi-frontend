import { useState } from "react";
import api from "../lib/api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  address: string;
  phone: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  accepted_terms: boolean;
  profile_photo?: File | null; // Agregado opcional para archivo
  profile_video?: File | null; // Agregado opcional para archivo
}

interface ApiErrorResponse {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
      message?: string;
    };
  };
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
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" };

      const response = await api.post<{
        message: string;
        data?: { token: string; user: any };
      }>("/v1/client/register", data, {
        headers,
      });

      // Guarda el token de autenticación en el almacenamiento local si está disponible
      if (response.data?.data?.token) {
        localStorage.setItem("authToken", response.data.data.token);
      }

      setSuccessMessage(response.data?.message || "Registration successful!");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as ApiErrorResponse;
        setError(axiosError.response?.data?.errors || null);
      } else {
        setError({ general: ["An unexpected error occurred."] });
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, successMessage };
};

export default useRegister;
