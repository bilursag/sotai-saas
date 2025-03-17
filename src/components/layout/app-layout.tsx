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

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else if (isDesktop) {
      setSidebarOpen(true);
    }
  }, [isMobile, isDesktop]);

  return (
    <div className="flex h-screen overflow-hidden">
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`${
          isMobile
            ? sidebarOpen
              ? "fixed inset-y-0 left-0 z-50"
              : "hidden"
            : "relative"
        }`}
      >
        <Sidebar
          defaultCollapsed={!isDesktop && !sidebarOpen}
          onToggle={() => {
            if (isMobile) {
              setSidebarOpen(!sidebarOpen);
            }
          }}
        />
      </div>

      <div className="flex flex-col flex-1 h-screen overflow-auto">
        <DashboardNavbar
          showMenuButton={isMobile}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          menuOpen={sidebarOpen}
        />
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-20">{children}</main>
      </div>
    </div>
  );
}
