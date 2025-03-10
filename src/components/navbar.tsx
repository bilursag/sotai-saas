"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "./theme-switcher";

const navigation = [
  { name: 'Inicio', href: '#' },
  { name: 'Plantillas', href: '#' },
  { name: 'Contacto', href: '#' },
  { name: 'Iniciar sesión', href: '#' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-1 items-center justify-between p-4 gap-4">
        <h2 className="text-2xl font-semibold">Sotai</h2>
        <div className="hidden md:items-center md:flex gap-4 ml-auto">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 text-black dark:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 md:ml-auto">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="block md:hidden p-2 focus:outline-none"
          >
            <Menu aria-hidden="true" className="size-6" />
          </button>
          <ThemeSwitcher />
        </div>
      </div>

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
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-1 z-20 w-full max-w-sm bg-white dark:bg-zinc-950 h-screen"
            >
              <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl font-semibold">Sotai</h2>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-black dark:text-white"
                >
                  <span className="sr-only">Cerrar menú</span>
                  <X aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root px-6">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-900"
                      >
                        {item.name}
                      </a>
                    ))}
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
