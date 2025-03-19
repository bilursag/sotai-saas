/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderOpen,
  Settings,
  Users,
  Clock,
  Wand2,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getSharedWithMeDocuments } from "@/services/document-share-service";
import { getAllDocuments } from "@/services/document-service";

interface SidebarProps {
  defaultCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ defaultCollapsed = false, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
  const [sharedDocuments, setSharedDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (window.innerWidth >= 1024 && !mobile) {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const ownDocs = await getAllDocuments();
        const sortedDocs = [...ownDocs].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setRecentDocuments(sortedDocs.slice(0, 5));

        const sharedDocs = await getSharedWithMeDocuments();
        setSharedDocuments(sharedDocs.slice(0, 5));
      } catch (err) {
        console.error("Error al cargar documentos para la sidebar:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Mis Documentos",
      href: "/documents?view=list",
      icon: FileText,
    },
    {
      title: "Compartidos",
      href: "/documents/shared",
      icon: Users,
      badge:
        sharedDocuments.length > 0
          ? sharedDocuments.length.toString()
          : undefined,
    },
    {
      title: "Plantillas",
      href: "/templates",
      icon: FolderOpen,
    },
  ];

  const createNavItems = [
    {
      title: "Nuevo Documento",
      href: "/documents?view=new",
      icon: PlusCircle,
    },
    {
      title: "Desde Plantilla",
      href: "/templates",
      icon: FolderOpen,
    },
    {
      title: "Con IA",
      href: "/documents?view=new&ai=true",
      icon: Wand2,
    },
  ];

  const navigateTo = (href: string) => {
    router.push(href);
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  const handleExpandCollapse = () => {
    setCollapsed(!collapsed);
    if (isMobile && onToggle && collapsed) {
      onToggle();
    }
  };

  return (
    <div
      className={cn(
        "group flex flex-col h-screen border-r bg-white dark:bg-zinc-950 relative transition-all duration-300 shadow-sm",
        collapsed ? "w-[70px]" : "w-[280px]"
      )}
    >
      {/* Logo en la parte superior */}
      <div
        className={cn(
          "flex items-center px-4 h-16 md:h-20 border-b border-gray-200 dark:border-zinc-800",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              SD
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Sotai Docs
            </h2>
          </div>
        )}
        {collapsed && (
          <div className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            SD
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExpandCollapse}
          className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          <div>
            <div
              className={cn(
                "flex items-center justify-between mb-2",
                collapsed && "justify-center"
              )}
            >
              {!collapsed && (
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 uppercase tracking-wider">
                  Navegación
                </h4>
              )}
            </div>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Button
                  key={item.title}
                  variant={
                    pathname === item.href ||
                    pathname.startsWith(item.href.split("?")[0])
                      ? "secondary"
                      : "ghost"
                  }
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-0",
                    pathname === item.href ||
                      pathname.startsWith(item.href.split("?")[0])
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400"
                  )}
                  onClick={() => navigateTo(item.href)}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      collapsed ? "mr-0" : "mr-2",
                      pathname === item.href ||
                        pathname.startsWith(item.href.split("?")[0])
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                  />
                  {!collapsed && <span>{item.title}</span>}
                  {!collapsed && item.badge && (
                    <Badge className="ml-auto px-2 py-0.5 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                      {item.badge}
                    </Badge>
                  )}
                  {collapsed && item.badge && (
                    <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 min-w-[18px] h-[18px] flex items-center justify-center">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-zinc-800" />

          <div>
            <div
              className={cn(
                "flex items-center justify-between mb-2",
                collapsed && "justify-center"
              )}
            >
              {!collapsed && (
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 uppercase tracking-wider">
                  Crear
                </h4>
              )}
            </div>
            <div className="space-y-1">
              {createNavItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-0",
                    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400"
                  )}
                  onClick={() => navigateTo(item.href)}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 text-gray-500 dark:text-gray-400",
                      collapsed ? "mr-0" : "mr-2"
                    )}
                  />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              ))}
            </div>
          </div>

          {!collapsed && (
            <>
              <Separator className="bg-gray-200 dark:bg-zinc-800" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 uppercase tracking-wider">
                    Recientes
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    onClick={() => navigateTo("/documents?view=list")}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {isLoading ? (
                    Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-8 px-2 rounded-md animate-pulse bg-gray-100 dark:bg-zinc-800"
                        />
                      ))
                  ) : recentDocuments.length > 0 ? (
                    recentDocuments.map((doc) => (
                      <div key={doc.id} className="group relative">
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400"
                          onClick={() =>
                            navigateTo(`/documents?view=details&id=${doc.id}`)
                          }
                        >
                          <FileText className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-500" />
                          <span className="truncate">{doc.title}</span>
                        </Button>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                              >
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-48 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                            >
                              <DropdownMenuItem
                                className="text-gray-700 dark:text-gray-300 focus:text-blue-600 dark:focus:text-blue-400"
                                onClick={() =>
                                  navigateTo(
                                    `/documents?view=details&id=${doc.id}`
                                  )
                                }
                              >
                                Ver documento
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-gray-700 dark:text-gray-300 focus:text-blue-600 dark:focus:text-blue-400"
                                onClick={() =>
                                  navigateTo(
                                    `/documents?view=edit&id=${doc.id}`
                                  )
                                }
                              >
                                Editar documento
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1.5">
                      No hay documentos recientes
                    </p>
                  )}
                </div>
              </div>

              {sharedDocuments.length > 0 && (
                <>
                  <Separator className="bg-gray-200 dark:bg-zinc-800" />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 uppercase tracking-wider">
                        Compartidos Conmigo
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        onClick={() => navigateTo("/documents/shared")}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {isLoading
                        ? Array(2)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="h-8 px-2 rounded-md animate-pulse bg-gray-100 dark:bg-zinc-800"
                              />
                            ))
                        : sharedDocuments.map((doc) => (
                            <div key={doc.id} className="group relative">
                              <Button
                                variant="ghost"
                                className="w-full justify-start font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400"
                                onClick={() =>
                                  navigateTo(
                                    `/documents?view=details&id=${doc.id}`
                                  )
                                }
                              >
                                <FileText className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-500" />
                                <span className="truncate flex-1">
                                  {doc.title}
                                </span>
                              </Button>
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                    >
                                      <MoreHorizontal size={16} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-48 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                                  >
                                    <DropdownMenuItem
                                      className="text-gray-700 dark:text-gray-300 focus:text-blue-600 dark:focus:text-blue-400"
                                      onClick={() =>
                                        navigateTo(
                                          `/documents?view=details&id=${doc.id}`
                                        )
                                      }
                                    >
                                      Ver documento
                                    </DropdownMenuItem>
                                    {doc.permission === "edit" && (
                                      <DropdownMenuItem
                                        className="text-gray-700 dark:text-gray-300 focus:text-blue-600 dark:focus:text-blue-400"
                                        onClick={() =>
                                          navigateTo(
                                            `/documents?view=edit&id=${doc.id}`
                                          )
                                        }
                                      >
                                        Editar documento
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      <div className="mt-auto p-3 border-t border-gray-200 dark:border-zinc-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400",
            collapsed && "justify-center px-0"
          )}
          onClick={() => navigateTo("/settings")}
        >
          <Settings
            className={cn(
              "h-5 w-5 text-gray-500 dark:text-gray-400",
              collapsed ? "mr-0" : "mr-2"
            )}
          />
          {!collapsed && <span>Configuración</span>}
        </Button>
      </div>
    </div>
  );
}
