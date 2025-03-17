"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar/sidebar";
import DashboardNavbar from "@/components/dashboard/navbar";
import { useMediaQuery } from "@/hooks/use-media-query";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Efecto para manejar el estado inicial de la sidebar basado en el tamaño de la pantalla
  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [isDesktop]);

  // Manejador para alternar la sidebar
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Este manejador es específico para el botón de despliegue dentro de la sidebar
  const handleSidebarInternalToggle = () => {
    if (isMobile) {
      // En móvil, no cerramos la sidebar, solo cambiamos el estado de colapso
      // No hacemos nada porque esto lo manejará el componente Sidebar internamente
    } else {
      // En desktop, simplemente mantenemos la sidebar abierta
      setSidebarOpen(true);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay para dispositivos móviles cuando la sidebar está abierta */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar con diferentes estilos según el tamaño de pantalla */}
      <div
        className={`${
          isMobile
            ? sidebarOpen
              ? "fixed inset-y-0 left-0 z-50"
              : "hidden"
            : "relative"
        } transition-all duration-300`}
      >
        <Sidebar
          defaultCollapsed={isMobile}
          onToggle={handleSidebarInternalToggle}
        />
      </div>

      <div className="flex flex-col flex-1 h-screen overflow-auto">
        <DashboardNavbar
          showMenuButton={isMobile}
          onMenuClick={handleToggleSidebar}
          menuOpen={sidebarOpen}
        />
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-20">{children}</main>
      </div>
    </div>
  );
}
