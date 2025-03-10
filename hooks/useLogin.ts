import { useState } from "react";
import api from "../lib/api";

interface LoginData {
  email: string;
  password: string;
  remember_me?: boolean;
}

interface ApiErrorResponse {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
      message?: string;
    };
  };
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string[]> | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await api.post("/v1/client/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, message } = (
        response.data as { data: { token: string; message: string } }
      ).data;

      // Imprimir el token para verificar que se recibe correctamente
      console.log("Token recibido:", token);

      if (token) {
        localStorage.setItem("authToken", token);
        setSuccessMessage(message || "Login successful!");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as ApiErrorResponse;
        setError(
          axiosError.response?.data?.errors || {
            general: ["Invalid credentials"],
          }
        );
      } else {
        setError({ general: ["An unexpected error occurred."] });
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, successMessage };
};

export default useLogin;
