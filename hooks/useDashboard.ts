// 1. Primero, modifica el hook useDashboard.ts para incluir un mecanismo de actualización forzada

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { User } from "@/types";

// Crear un objeto para la gestión de eventos personalizados
const dashboardEvents = {
  // Este método emitirá un evento cuando se necesite refrescar el dashboard
  emitRefresh: () => {
    // Usar un evento personalizado que puede ser escuchado por cualquier componente
    window.dispatchEvent(new CustomEvent("dashboard-update-required"));
  },
};

const useDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Añadir un estado para forzar actualizaciones
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const router = useRouter();

  // Función para obtener los datos del usuario
  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/v1/client/me");
      const userData = (response.data as { data: User }).data;
      setUser(userData);
      return userData;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const error = err as { response?: { status: number } };
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          router.push("/login");
        } else {
          setError("Error fetching user data.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Efecto para verificar la autenticación y cargar los datos del usuario
  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }
      await fetchUser();
    };

    checkAuthAndFetchUser();
  }, [router, fetchUser, refreshTrigger]); // Añadir refreshTrigger como dependencia

  // Agregar un efecto para escuchar eventos de actualización
  useEffect(() => {
    const handleDashboardUpdate = () => {
      // Incrementar refreshTrigger para forzar una actualización
      setRefreshTrigger((prev) => prev + 1);
    };

    // Escuchar el evento personalizado
    window.addEventListener("dashboard-update-required", handleDashboardUpdate);

    return () => {
      window.removeEventListener(
        "dashboard-update-required",
        handleDashboardUpdate
      );
    };
  }, []);

  const refreshDashboard = useCallback(async () => {
    try {
      const userData = await fetchUser();
      return userData;
    } catch (error) {
      console.error("Error refreshing dashboard:", error);
      throw error;
    }
  }, [fetchUser]);

  // Método para forzar una actualización desde cualquier componente
  const forceRefresh = useCallback(() => {
    dashboardEvents.emitRefresh();
  }, []);

  return { user, loading, error, refreshDashboard, setUser, forceRefresh };
};

export { dashboardEvents };
export default useDashboard;
