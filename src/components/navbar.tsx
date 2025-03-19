"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Book,
  Coffee,
  Award,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Inicio", href: "/", icon: Coffee },
  { name: "Tutoriales", href: "/coming-soon", icon: Book },
  { name: "Mejores Prácticas", href: "/coming-soon", icon: Award },
  { name: "Guía del Usuario", href: "/user-guide", icon: Sparkles },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              SD
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Sotai Docs
            </h2>
          </Link>

          {/* Navegación para escritorio */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <item.icon className="size-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Botones de autenticación y tema */}
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

            {/* Botón de menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="block md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none"
              aria-label="Abrir menú"
            >
              <Menu className="size-6" />
            </button>

            {/* Componentes de Clerk para escritorio */}
            <div className="hidden md:block">
              <SignedOut>
                <div className="flex items-center gap-3">
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="font-medium">
                      Iniciar sesión
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="font-medium">
                      Registrarse
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-9 h-9",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-20 w-full max-w-sm bg-white dark:bg-zinc-900 h-screen"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                    SD
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Sotai Docs
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  aria-label="Cerrar menú"
                >
                  <X className="size-6" />
                </button>
              </div>

              <div className="mt-4 flow-root px-6">
                <div className="space-y-4 divide-y divide-gray-200 dark:divide-zinc-800">
                  {/* Enlaces de navegación móvil */}
                  <div className="space-y-1 py-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <item.icon className="size-5" />
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Configuración */}
                  <div className="py-4">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          {theme === "dark" ? (
                            <Sun className="size-5 text-gray-600 dark:text-gray-300" />
                          ) : (
                            <Moon className="size-5 text-gray-600 dark:text-gray-300" />
                          )}
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Modo oscuro
                          </span>
                        </div>
                        <button
                          onClick={toggleTheme}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-zinc-700"
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-blue-500 transition-transform ${
                              theme === "dark"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Componentes de Clerk para móvil */}
                  <div className="py-4">
                    <SignedOut>
                      <div className="flex flex-col gap-3">
                        <SignInButton mode="modal">
                          <Button
                            variant="outline"
                            className="w-full justify-center"
                          >
                            Iniciar sesión
                          </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button className="w-full justify-center">
                            Registrarse
                          </Button>
                        </SignUpButton>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mi cuenta
                          </p>
                        </div>
                        <UserButton
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              userButtonAvatarBox: "w-10 h-10",
                            },
                          }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
