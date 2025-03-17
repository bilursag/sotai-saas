import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function DocumentsSkeleton() {
  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-6">
      {/* Header con título y botón */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-muted/40 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Barra de búsqueda */}
        <div className="relative w-full md:w-auto max-w-md">
          <Skeleton className="h-10 w-full md:w-64 rounded-md" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Skeleton className="h-9 rounded-md w-24" />
          <Skeleton className="h-9 rounded-md w-24" />
        </div>

        {/* Filtros */}
        <div className="flex gap-2 w-full md:w-auto">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>

      {/* Grid de documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow pb-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3">
              <div className="flex gap-2 w-full">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-9" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
