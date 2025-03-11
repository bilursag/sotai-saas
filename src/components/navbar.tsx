"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const navigation = [
  { name: "Inicio", href: "#" },
  { name: "Plantillas", href: "#" },
  { name: "Contacto", href: "#" },
  { name: "Documentación", href: "#" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <h2 className="text-2xl font-semibold">Sotai Docs</h2>

        {/* Navegación para escritorio - AHORA CENTRADA */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <nav className="flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Botones de autenticación y tema */}
        <div className="flex items-center gap-4">
          {/* Botón de menú móvil */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="block md:hidden p-2 focus:outline-none"
            aria-label="Abrir menú"
          >
            <Menu className="size-6" />
          </button>

          {/* Componentes de Clerk para escritorio */}
          <div className="hidden md:block">
            <SignedOut>
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    Iniciar sesión
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-medium bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    Registrarse
                  </button>
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

          {/* Selector de tema siempre visible */}
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
              className="fixed inset-y-0 right-0 z-20 w-full max-w-sm bg-white dark:bg-zinc-950 h-screen"
            >
              <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl font-semibold">Sotai</h2>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-black dark:text-white"
                  aria-label="Cerrar menú"
                >
                  <X className="size-6" />
                </button>
              </div>

              <div className="mt-6 flow-root px-6">
                <div className="-my-6 divide-y divide-gray-500/10">
                  {/* Enlaces de navegación móvil */}
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-900"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>

                  {/* Componentes de Clerk para móvil */}
                  <div className="py-6">
                    <SignedOut>
                      <div className="flex flex-col gap-3">
                        <SignInButton mode="modal">
                          <button className="w-full rounded-lg bg-gray-100 dark:bg-zinc-800 px-3 py-2.5 text-base/7 text-black dark:text-white">
                            Iniciar sesión
                          </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <button className="w-full rounded-lg bg-black dark:bg-white px-3 py-2.5 text-base/7 text-white dark:text-black">
                            Registrarse
                          </button>
                        </SignUpButton>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
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
    </div>
  );
};

export default Navbar;
