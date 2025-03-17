import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { DocumentsSkeleton } from "./documents-skeleton";

export function AppSkeleton() {
  const pathname = usePathname();

  const SidebarSkeleton = () => (
    <div className="fixed top-0 left-0 h-screen w-[280px] border-r bg-background z-40 hidden md:block">
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      <div className="px-3 py-2 space-y-6">
        {/* Título de sección */}
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-24" />
        </div>
        {/* Elementos de navegación */}
        <div className="space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
        <Skeleton className="h-px w-full my-4" /> {/* Separador */}
        {/* Título de sección */}
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-16" />
        </div>
        {/* Elementos de creación */}
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
        <Skeleton className="h-px w-full my-4" /> {/* Separador */}
        {/* Documentos recientes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-8 w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* Botón de configuración */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );

  const NavbarSkeleton = () => (
    <header className="fixed top-0 left-0 right-0 h-16 md:h-20 border-b bg-background z-30">
      <div className="container mx-auto max-w-full px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Botón del menú (móvil) */}
          <div className="md:hidden">
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-md" /> {/* Theme switcher */}
          <Skeleton className="h-9 w-9 rounded-full" /> {/* User button */}
        </div>
      </div>
    </header>
  );

  const ContentSkeleton = () => {
    if (pathname.includes("/documents")) {
      return <DocumentsSkeleton />;
    }
    return <DashboardSkeleton />;
  };

  return (
    <div className="min-h-screen">
      <NavbarSkeleton />
      <SidebarSkeleton />
      <div className="md:pl-[280px]">
        <main className="pt-16 md:pt-20">
          <ContentSkeleton />
        </main>
      </div>
    </div>
  );
}
