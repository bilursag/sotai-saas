"use client";

import { useState } from "react";
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
import { Search, FolderOpen, ArrowLeft } from "lucide-react";

const allTemplates = [
  {
    id: 1,
    title: "Contrato de trabajo",
    category: "Laboral",
    usageCount: 1245,
    description:
      "Plantilla estándar para contratos laborales según la legislación vigente",
  },
  {
    id: 2,
    title: "NDA estándar",
    category: "Corporativo",
    usageCount: 987,
    description:
      "Acuerdo de confidencialidad para proteger información sensible",
  },
  {
    id: 3,
    title: "Contrato de compraventa",
    category: "Inmobiliario",
    usageCount: 856,
    description: "Contrato para la compraventa de bienes inmuebles",
  },
  {
    id: 4,
    title: "Reclamación administrativa",
    category: "Administrativo",
    usageCount: 742,
    description:
      "Documento para presentar reclamaciones ante la administración pública",
  },
  {
    id: 5,
    title: "Contrato de alquiler",
    category: "Inmobiliario",
    usageCount: 689,
    description: "Contrato de arrendamiento para viviendas residenciales",
  },
  {
    id: 6,
    title: "Testamento",
    category: "Familiar",
    usageCount: 578,
    description: "Modelo de testamento abierto según el código civil",
  },
  {
    id: 7,
    title: "Divorcio de mutuo acuerdo",
    category: "Familiar",
    usageCount: 523,
    description: "Convenio regulador para divorcios de mutuo acuerdo",
  },
  {
    id: 8,
    title: "Contrato de servicios",
    category: "Comercial",
    usageCount: 456,
    description: "Contrato para la prestación de servicios profesionales",
  },
  {
    id: 9,
    title: "Reclamación de deuda",
    category: "Comercial",
    usageCount: 412,
    description: "Documento para la reclamación formal de deudas pendientes",
  },
  {
    id: 10,
    title: "Contrato mercantil",
    category: "Corporativo",
    usageCount: 387,
    description: "Contrato para relaciones comerciales entre empresas",
  },
  {
    id: 11,
    title: "Política de privacidad",
    category: "Corporativo",
    usageCount: 354,
    description: "Documento de política de privacidad y protección de datos",
  },
  {
    id: 12,
    title: "Reglamento interno",
    category: "Laboral",
    usageCount: 321,
    description: "Reglamento interno de funcionamiento para empresas",
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = allTemplates.filter((template) => {
    const matchesCategory = categoryParam
      ? template.category.toLowerCase() === categoryParam.toLowerCase()
      : true;

    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (templateId: number) => {
    router.push(`/documents?view=new&templateId=${templateId}`);
  };

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

      {filteredTemplates.length === 0 ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <FolderOpen className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            No se encontraron plantillas
          </h3>
          <p className="text-muted-foreground">
            Intenta con otros términos de búsqueda o elimina los filtros
            aplicados.
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
