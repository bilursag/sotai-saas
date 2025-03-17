import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { DocumentsSkeleton } from "./documents-skeleton";

export function AppSkeleton() {
  const pathname = usePathname();
  
  const NavbarSkeleton = () => (
    <div className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-md mx-1" />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </div>
    </div>
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
      <main className="pt-16">
        <ContentSkeleton />
      </main>
    </div>
  );
}
