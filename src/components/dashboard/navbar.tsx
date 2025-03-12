"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  FileText,
  LayoutDashboard,
  FolderOpen,
  Settings,
  ChevronDown,
  PlusCircle,
  LucideIcon,
  Wand2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "../theme-switcher";
import { UserButton } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
  submenu?: { name: string; href: string; icon: LucideIcon }[];
}

const navigation: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Documentos",
    href: "/documents?view=list",
    icon: FileText,
    submenu: [
      {
        name: "Todos los documentos",
        href: "/documents?view=list",
        icon: FileText,
      },
      {
        name: "Nuevo documento",
        href: "/documents?view=new",
        icon: PlusCircle,
      },
      {
        name: "Documentos recientes",
        href: "/documents?view=recent",
        icon: FileText,
      },
    ],
  },
  {
    name: "Plantillas",
    href: "/templates",
    icon: FolderOpen,
    badge: "Nuevo",
  },
  {
    name: "Asistente IA",
    href: "/assistant",
    icon: Wand2,
  },
  {
    name: "Configuración",
    href: "/settings",
    icon: Settings,
  },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navWithActive = navigation.map((item) => ({
    ...item,
    active:
      pathname === item.href || pathname.startsWith(item.href.split("?")[0]),
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  const handleSubmenuToggle = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(name);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-sm"
          : "bg-white dark:bg-zinc-950"
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-primary">
                <path
                  fill="currentColor"
                  d="M12 2L2 6V12C2 17.5 6.8 22.7 12 23C17.2 22.7 22 17.5 22 12V6L12 2ZM12 4L20 7.4V12C20 16.5 16.2 20.7 12 21C7.8 20.7 4 16.5 4 12V7.4L12 4ZM15.5 8L10.5 13L8.5 11L7 12.5L10.5 16L17 9.5L15.5 8Z"
                />
              </svg>
              <span className="text-xl font-semibold">Sotai</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            {navWithActive.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={item.active ? "default" : "ghost"}
                        className="flex items-center gap-1 h-9"
                      >
                        <item.icon className="h-4 w-4 mr-1" />
                        {item.name}
                        <ChevronDown className="h-4 w-4 ml-1" />
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className="ml-1 bg-primary/10 text-primary text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {item.submenu.map((subitem) => (
                        <DropdownMenuItem key={subitem.name} asChild>
                          <Link
                            href={subitem.href}
                            className="flex items-center gap-2 cursor-pointer w-full"
                          >
                            <subitem.icon className="h-4 w-4" />
                            <span>{subitem.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={item.href}>
                          <Button
                            variant={item.active ? "default" : "ghost"}
                            className="flex items-center gap-1 h-9"
                          >
                            <item.icon className="h-4 w-4 mr-1" />
                            {item.name}
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className="ml-1 bg-primary/10 text-primary text-xs"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                },
              }}
            />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="block md:hidden ml-1 p-2 text-black dark:text-white focus:outline-none"
              aria-label="Abrir menú"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
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
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-20 w-full max-w-sm bg-white dark:bg-zinc-950 h-screen overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary">
                    <path
                      fill="currentColor"
                      d="M12 2L2 6V12C2 17.5 6.8 22.7 12 23C17.2 22.7 22 17.5 22 12V6L12 2ZM12 4L20 7.4V12C20 16.5 16.2 20.7 12 21C7.8 20.7 4 16.5 4 12V7.4L12 4ZM15.5 8L10.5 13L8.5 11L7 12.5L10.5 16L17 9.5L15.5 8Z"
                    />
                  </svg>
                  <span className="text-xl font-semibold">Sotai</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-black dark:text-white p-2 focus:outline-none"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {navWithActive.map((item) => (
                  <div key={item.name} className="py-1">
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => handleSubmenuToggle(item.name)}
                          className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-left ${
                            item.active
                              ? "bg-primary text-primary-foreground font-medium"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-center">
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.name}</span>
                            {item.badge && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-primary/10 text-primary text-xs"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              activeSubmenu === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeSubmenu === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-12 pr-4 py-1 space-y-1 mt-1">
                                {item.submenu.map((subitem) => (
                                  <Link
                                    key={subitem.name}
                                    href={subitem.href}
                                    className="flex items-center py-2 px-3 rounded-md hover:bg-muted/50"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <subitem.icon className="h-4 w-4 mr-2" />
                                    <span>{subitem.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-2 rounded-md ${
                          item.active
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className="ml-2 bg-primary/10 text-primary text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 border-t p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mi cuenta</span>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                      },
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardNavbar;
