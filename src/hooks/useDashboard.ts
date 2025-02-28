import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { User } from "@/types";

const useDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Función para obtener los datos del usuario
  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/me"); // Endpoint para obtener los datos del usuario
      setUser(response.data.data); // Guardar los datos del usuario en el estado
    } catch (err: unknown) {
      if (err instanceof Error) {
        const error = err as { response?: { status: number } };
        if (error.response?.status === 401) {
          // Si el usuario no está autenticado, redirigir al login
          localStorage.removeItem("authToken");
          router.push("/login");
        } else {
          setError("Error fetching user data.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Efecto para verificar la autenticación y cargar los datos del usuario
  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login"); // Redirigir al login si no hay token
        return;
      }
      await fetchUser(); // Cargar los datos del usuario
    };

    checkAuthAndFetchUser();
  }, [router, fetchUser]);

  return { user, loading, error };
};

export default useDashboard;
