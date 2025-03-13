// src/app/templates/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FolderOpen, ArrowLeft, Loader2 } from "lucide-react";
import { getAllTemplates } from "@/services/template-service";

interface Template {
  id: string;
  title: string;
  description?: string;
  category: string;
  usageCount: number;
  tags?: { id: string; name: string }[];
}

export default function TemplatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");

  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar las plantillas desde el backend cuando el componente se monte
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const data = await getAllTemplates(categoryParam || undefined);
        setTemplates(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar plantillas:", err);
        setError("No se pudieron cargar las plantillas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [categoryParam]);

  // Filtrar plantillas basadas en búsqueda
  const filteredTemplates = templates.filter((template) => {
    return (
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags?.some((tag: { id: string; name: string }) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  // Función para usar una plantilla
  const handleUseTemplate = (templateId: string) => {
    router.push(`/documents?view=new&templateId=${templateId}`);
  };

  // Función para volver al dashboard
  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="size-4" />
              <span>Volver</span>
            </Button>
            <h1 className="text-3xl font-bold">Plantillas</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            {categoryParam
              ? `Plantillas de documentos para la categoría "${categoryParam}"`
              : "Encuentra la plantilla perfecta para tu documento legal"}
          </p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar plantillas..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {categoryParam && (
        <div className="flex items-center gap-2">
          <FolderOpen className="size-4 text-muted-foreground" />
          <span className="font-medium">Categoría:</span>
          <Badge variant="secondary" className="text-sm">
            {categoryParam}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/templates")}
          >
            Ver todas las categorías
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <Loader2 className="size-12 mx-auto text-primary animate-spin mb-4" />
          <h3 className="text-lg font-medium mb-2">Cargando plantillas</h3>
          <p className="text-muted-foreground">
            Estamos obteniendo las plantillas disponibles, espera un momento...
          </p>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 rounded-lg p-8 text-center">
          <div className="text-destructive mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">
            Error al cargar plantillas
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </Button>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <FolderOpen className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            No se encontraron plantillas
          </h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Intenta con otros términos de búsqueda"
              : categoryParam
              ? `No hay plantillas disponibles para la categoría "${categoryParam}"`
              : "No hay plantillas disponibles en este momento"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{template.category}</Badge>
                  <div className="text-xs text-muted-foreground">
                    {template.usageCount.toLocaleString()} usos
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {template.tags && template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag: { id: string; name: string }) => (
                      <Badge
                        key={tag.id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleUseTemplate(template.id)}
                >
                  Usar plantilla
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
