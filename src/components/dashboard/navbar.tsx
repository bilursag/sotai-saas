"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface DashboardNavbarProps {
  showMenuButton?: boolean;
  onMenuClick?: () => void;
  menuOpen?: boolean;
}

export default function DashboardNavbar({
  showMenuButton = false,
  onMenuClick,
  menuOpen = false,
}: DashboardNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 backdrop-blur-lg border-b ${
        isScrolled
          ? "bg-white/90 dark:bg-zinc-900/90"
          : "bg-white dark:bg-zinc-950"
      } border-gray-200 dark:border-zinc-800 bg-opacity-80 dark:bg-opacity-80`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between p-4 h-16 md:h-20">
          {/* Logo y botón de menú */}
          <div className="flex items-center gap-2">
            {showMenuButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-800 mr-2"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}

            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                SD
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sotai Docs
              </h2>
            </Link>
          </div>

          {/* Espacio central */}
          <div className="hidden md:flex items-center justify-center flex-1">
            {/* Aquí podrías agregar elementos de navegación específicos del dashboard si lo deseas */}
          </div>

          {/* Botones de tema y usuario */}
          <div className="flex items-center gap-3">
            {/* Botón de tema */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                {theme === "dark" ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </Button>
            )}

            {/* Botón de usuario */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
