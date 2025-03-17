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
} from "lucide-react";

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
    {
      title: "Asistente IA",
      href: "/assistant",
      icon: Wand2,
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
        "group flex flex-col h-screen border-r bg-background relative transition-all duration-300 z-10",
        collapsed ? "w-[70px]" : "w-[280px]"
      )}
    >
      <div className="flex items-center justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExpandCollapse}
          className="h-8 w-8"
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 py-2">
          <div className="py-2">
            <div
              className={cn(
                "flex items-center justify-between mb-2 pt-4",
                collapsed && "justify-center"
              )}
            >
              <h4
                className={cn(
                  "font-semibold text-xs text-muted-foreground px-2",
                  collapsed && "hidden"
                )}
              >
                NAVEGACIÓN
              </h4>
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
                    collapsed && "justify-center px-0"
                  )}
                  onClick={() => navigateTo(item.href)}
                >
                  <item.icon
                    className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")}
                  />
                  {!collapsed && <span>{item.title}</span>}
                  {!collapsed && item.badge && (
                    <Badge className="ml-auto" variant="secondary">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="py-2">
            <div
              className={cn(
                "flex items-center justify-between mb-2",
                collapsed && "justify-center"
              )}
            >
              <h4
                className={cn(
                  "font-semibold text-xs text-muted-foreground px-2",
                  collapsed && "hidden"
                )}
              >
                CREAR
              </h4>
            </div>
            <div className="space-y-1">
              {createNavItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-0"
                  )}
                  onClick={() => navigateTo(item.href)}
                >
                  <item.icon
                    className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")}
                  />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              ))}
            </div>
          </div>

          {!collapsed && (
            <>
              <Separator />

              <div className="py-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-xs text-muted-foreground px-2">
                    DOCUMENTOS RECIENTES
                  </h4>
                  <Button
                    variant="ghost"
                    className="h-5 w-5 p-0 text-muted-foreground"
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
                          className="h-8 px-2 rounded-md animate-pulse bg-muted"
                        />
                      ))
                  ) : recentDocuments.length > 0 ? (
                    recentDocuments.map((doc) => (
                      <Button
                        key={doc.id}
                        variant="ghost"
                        className="w-full justify-start font-normal"
                        onClick={() =>
                          navigateTo(`/documents?view=details&id=${doc.id}`)
                        }
                      >
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="truncate">{doc.title}</span>
                      </Button>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground px-2">
                      No hay documentos recientes
                    </p>
                  )}
                </div>
              </div>

              {sharedDocuments.length > 0 && (
                <>
                  <Separator />

                  <div className="py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-xs text-muted-foreground px-2">
                        COMPARTIDOS CONMIGO
                      </h4>
                      <Button
                        variant="ghost"
                        className="h-5 w-5 p-0 text-muted-foreground"
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
                                className="h-8 px-2 rounded-md animate-pulse bg-muted"
                              />
                            ))
                        : sharedDocuments.map((doc) => (
                            <Button
                              key={doc.id}
                              variant="ghost"
                              className="w-full justify-start font-normal"
                              onClick={() =>
                                navigateTo(
                                  `/documents?view=details&id=${doc.id}`
                                )
                              }
                            >
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="truncate">{doc.title}</span>
                            </Button>
                          ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      <div className="p-3 mt-auto">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            collapsed && "justify-center px-0"
          )}
          onClick={() => navigateTo("/settings")}
        >
          <Settings className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>Configuración</span>}
        </Button>
      </div>
    </div>
  );
}
