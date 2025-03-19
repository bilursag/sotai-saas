"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar/sidebar";
import DashboardNavbar from "@/components/dashboard/navbar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Ajustar sidebar según el tamaño de pantalla
  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [isDesktop]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Función mejorada para manejar el toggle interno del sidebar
  const handleSidebarInternalToggle = () => {
    if (!isMobile) {
      setSidebarOpen(true);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-zinc-900">
      {/* Overlay para móvil cuando el sidebar está abierto */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar con animación */}
      <motion.div
        className={`${
          isMobile ? "fixed inset-y-0 left-0 z-50" : "relative z-10"
        }`}
        initial={{
          x: isMobile ? "-100%" : 0,
          width: "auto",
        }}
        animate={{
          x: isMobile && !sidebarOpen ? "-100%" : 0,
          width: "auto",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Sidebar
          defaultCollapsed={isMobile}
          onToggle={handleSidebarInternalToggle}
        />
      </motion.div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 h-screen overflow-auto">
        <DashboardNavbar
          showMenuButton={isMobile} // Corregido para que solo se muestre en móvil
          onMenuClick={handleToggleSidebar}
          menuOpen={sidebarOpen}
        />

        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-20 transition-all duration-300">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
