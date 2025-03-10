"use client";

import { useEffect } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import useDashboard, { dashboardEvents } from "@/hooks/useDashboard";

const DashboardPage = () => {
  const { refreshDashboard } = useDashboard();

  useEffect(() => {
    // Actualizar datos inmediatamente al montar el componente
    refreshDashboard();

    // Forzar una actualización después de la carga inicial
    const initialTimer = setTimeout(() => {
      dashboardEvents.emitRefresh();
    }, 500);

    // Configurar un intervalo para actualizar periódicamente
    const intervalId = setInterval(() => {
      refreshDashboard();
    }, 30000); // Aumentado a 30 segundos para reducir peticiones innecesarias

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [refreshDashboard]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
