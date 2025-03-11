"use client";

import { useState } from "react";
import {
  PlusCircle,
  FileText,
  History,
  FolderOpen,
  Filter,
  ArrowDownUp,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

// Datos de ejemplo para los documentos recientes
const recentDocuments = [
  {
    id: 1,
    title: "Contrato de arrendamiento",
    type: "Inmobiliario",
    date: "10 Mar 2025",
    status: "Completado",
  },
  {
    id: 2,
    title: "Acuerdo de confidencialidad",
    type: "Corporativo",
    date: "8 Mar 2025",
    status: "En revisión",
  },
  {
    id: 3,
    title: "Testamento",
    type: "Familiar",
    date: "5 Mar 2025",
    status: "Borrador",
  },
  {
    id: 4,
    title: "Contrato de servicios",
    type: "Comercial",
    date: "3 Mar 2025",
    status: "Completado",
  },
];

const popularTemplates = [
  {
    id: 1,
    title: "Contrato de trabajo",
    category: "Laboral",
    usageCount: 1245,
  },
  { id: 2, title: "NDA estándar", category: "Corporativo", usageCount: 987 },
  {
    id: 3,
    title: "Contrato de compraventa",
    category: "Inmobiliario",
    usageCount: 856,
  },
  {
    id: 4,
    title: "Reclamación administrativa",
    category: "Administrativo",
    usageCount: 742,
  },
];

const stats = [
  { title: "Documentos generados", value: 42, change: "+12% este mes" },
  { title: "Plantillas utilizadas", value: 15, change: "+5% este mes" },
  { title: "Tiempo ahorrado", value: "34h", change: "~5.6h por documento" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("documentos");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "En revisión":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Borrador":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Gestiona y crea documentos legales con IA
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="size-4" />
          <span>Nuevo documento</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Tabs
        defaultValue="documentos"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <FileText className="size-4" />
              <span>Mis documentos</span>
            </TabsTrigger>
            <TabsTrigger value="plantillas" className="flex items-center gap-2">
              <FolderOpen className="size-4" />
              <span>Plantillas</span>
            </TabsTrigger>
            <TabsTrigger value="historial" className="flex items-center gap-2">
              <History className="size-4" />
              <span>Historial</span>
            </TabsTrigger>
          </TabsList>
          <div className="hidden sm:flex items-center gap-2">
            <Input
              placeholder="Buscar..."
              className="max-w-xs"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Fecha</DropdownMenuItem>
                <DropdownMenuItem>Tipo de documento</DropdownMenuItem>
                <DropdownMenuItem>Estado</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ArrowDownUp className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Más reciente</DropdownMenuItem>
                <DropdownMenuItem>Más antiguo</DropdownMenuItem>
                <DropdownMenuItem>Nombre (A-Z)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent value="documentos" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Documentos recientes</h2>
            <Button variant="ghost" className="text-sm">
              Ver todos
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recentDocuments.map((doc) => (
              <Card key={doc.id} className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>
                        {doc.type} • {doc.date}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="size-4" />
                    <span>3 páginas • Última edición: hace 2 días</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    Previsualizar
                  </Button>
                  <Button size="sm" className="flex-1">
                    Editar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Documentos recomendados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Actualización de términos
                  </CardTitle>
                  <CardDescription>
                    Basado en cambios legislativos recientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Info className="size-4" />
                    <span>Nueva legislación aplicable desde marzo 2025</span>
                  </div>
                  <Progress value={33} className="h-2 mb-1" />
                  <p className="text-xs text-muted-foreground">
                    La IA ha detectado que 2 de tus documentos deberían
                    actualizarse
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver recomendaciones
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="plantillas" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Plantillas populares</h2>
            <Button variant="ghost" className="text-sm">
              Ver todas
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTemplates.map((template) => (
              <Card key={template.id} className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline">{template.category}</Badge>
                    <div className="text-xs text-muted-foreground">
                      {template.usageCount.toLocaleString()} usos
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">
                    {template.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Plantilla profesional actualizada con las últimas normativas
                  </p>
                </CardContent>
                <CardFooter className="pt-2 border-t">
                  <Button size="sm" className="w-full">
                    Usar plantilla
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Categorías de plantillas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Laboral",
                "Inmobiliario",
                "Corporativo",
                "Familiar",
                "Administrativo",
                "Comercial",
              ].map((category) => (
                <Card
                  key={category}
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Accede a plantillas específicas para{" "}
                      {category.toLowerCase()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="historial">
          <Card>
            <CardHeader>
              <CardTitle>Historial de actividad</CardTitle>
              <CardDescription>
                Registro de tus acciones recientes en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Avatar className="mt-1">
                      <AvatarImage
                        src={i % 2 === 0 ? "/placeholder.svg" : undefined}
                      />
                      <AvatarFallback>
                        {i % 2 === 0 ? "TU" : <FileText className="size-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {i % 2 === 0 ? "Has editado" : "La IA ha generado"}
                        {recentDocuments[i % 4].title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i === 0
                          ? "Hace 2 horas"
                          : i === 1
                          ? "Ayer, 15:30"
                          : `${i + 2} días atrás`}
                      </p>
                      {i === 0 && (
                        <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                          <p>
                            Cambios principales: Actualización de cláusulas
                            según nuevas normativas
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Cargar más actividad
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
