/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  FileText,
  History,
  FolderOpen,
  Filter,
  ArrowDownUp,
  Loader2,
  Clock,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  CalendarDays,
  Wand2,
  AlertTriangle,
  Search,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAllDocuments } from "@/services/document-service";
import { getAllTemplates } from "@/services/template-service";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("documentos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState({
    totalDocuments: 0,
    templatesUsed: 0,
    timeSaved: 0,
    aiGeneratedPercent: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const docsData = await getAllDocuments();
        setDocuments(docsData);
        const templatesData = await getAllTemplates();
        setTemplates(templatesData);
        calculateStats(docsData, templatesData);
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err);
        setError("No se pudieron cargar los datos del dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const calculateStats = (docs: any[], temps: any[]) => {
    const totalDocs = docs.length;
    //const templatesUsed = docs.filter((doc) => doc.templateId).length;
    const aiGenerated = docs.filter((doc) => doc.aiGenerated).length;
    const aiPercent =
      totalDocs > 0 ? Math.round((aiGenerated / totalDocs) * 100) : 0;
    const timePerDoc = 30; // minutos
    const timeSaved = totalDocs * timePerDoc;

    setStats({
      totalDocuments: totalDocs,
      templatesUsed: temps.length,
      timeSaved: timeSaved,
      aiGeneratedPercent: aiPercent,
    });
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.type &&
        doc.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.tags &&
        doc.tags.some((tag: { name: string }) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const recentDocuments = [...filteredDocuments]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 4);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoy, ${date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return `Ayer, ${date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "en_revision":
      case "en revisión":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "borrador":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateDocument = () => {
    router.push("/documents?view=new");
  };

  const handleViewDocument = (id: string) => {
    router.push(`/documents?view=details&id=${id}`);
  };

  const handleEditDocument = (id: string) => {
    router.push(`/documents?view=edit&id=${id}`);
  };

  const handleDeleteConfirmation = (id: string) => {
    setDocumentToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteDocument = () => {
    console.log("Eliminando documento:", documentToDelete);
    setShowDeleteDialog(false);
    setDocumentToDelete(null);
  };

  const handleViewAllTemplates = () => {
    router.push("/templates");
  };

  const handleViewAllDocuments = () => {
    router.push("/documents?view=list");
  };

  const handleUseTemplate = (templateId: string) => {
    router.push(`/documents?view=new&templateId=${templateId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="size-16 text-primary animate-spin mb-4" />
          <h3 className="text-xl font-medium">Cargando datos</h3>
          <p className="text-muted-foreground">
            Por favor espera mientras cargamos tu información...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button
            className="flex items-center gap-2"
            onClick={handleCreateDocument}
          >
            <PlusCircle className="size-4" />
            <span>Nuevo documento</span>
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              className="ml-2"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Gestiona y crea documentos legales con IA
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={handleCreateDocument}
        >
          <PlusCircle className="size-4" />
          <span>Nuevo documento</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="size-4" />
              Documentos totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {documents.length > 0
                ? `Último creado ${formatDate(documents[0].createdAt)}`
                : "Sin documentos aún"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FolderOpen className="size-4" />
              Plantillas disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.templatesUsed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Para diferentes tipos de documentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="size-4" />
              Tiempo estimado ahorrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.timeSaved < 60
                ? `${stats.timeSaved} min`
                : `${Math.floor(stats.timeSaved / 60)}h ${
                    stats.timeSaved % 60
                  }m`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Basado en 30 minutos por documento
            </p>
          </CardContent>
        </Card>
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
            <TabsTrigger value="actividad" className="flex items-center gap-2">
              <History className="size-4" />
              <span>Actividad</span>
            </TabsTrigger>
          </TabsList>
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative max-w-xs">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
            <Button
              variant="ghost"
              className="text-sm"
              onClick={handleViewAllDocuments}
            >
              Ver todos
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recentDocuments.length === 0 ? (
              <div className="col-span-2 bg-muted/30 rounded-lg p-8 text-center">
                <FileText className="size-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No se encontraron documentos
                </h3>
                <p className="text-muted-foreground">
                  Intenta con otros términos de búsqueda o crea un nuevo
                  documento.
                </p>
                <Button onClick={handleCreateDocument} className="mt-4">
                  Crear nuevo documento
                </Button>
              </div>
            ) : (
              recentDocuments.map((doc) => (
                <Card key={doc.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription>
                          {doc.type} • {formatDate(doc.updatedAt)}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status.charAt(0).toUpperCase() +
                          doc.status.slice(1).replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        <span>Última edición: {formatDate(doc.updatedAt)}</span>
                      </div>
                      {doc.aiGenerated && (
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                        >
                          <Wand2 className="size-3 mr-1" />
                          <span>IA</span>
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-2 border-t">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          Opciones
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDocument(doc.id)}
                        >
                          <Eye className="size-4 mr-2" />
                          Ver documento
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditDocument(doc.id)}
                        >
                          <Edit className="size-4 mr-2" />
                          Editar documento
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteConfirmation(doc.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="size-4 mr-2" />
                          Eliminar documento
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDocument(doc.id)}
                    >
                      Ver
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditDocument(doc.id)}
                    >
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Documentos generados con IA
            </h2>
            <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="size-5 text-primary" />
                  Uso de IA en documentos
                </CardTitle>
                <CardDescription>
                  {documents.filter((d) => d.aiGenerated).length} de{" "}
                  {documents.length} documentos generados con IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <Progress value={stats.aiGeneratedPercent} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {stats.aiGeneratedPercent}% de tus documentos han sido creados
                  con asistencia de IA
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={handleCreateDocument}
                  className="w-full"
                >
                  <Wand2 className="size-4 mr-2" />
                  Crear documento con IA
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plantillas" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Plantillas populares</h2>
            <Button
              variant="ghost"
              className="text-sm"
              onClick={handleViewAllTemplates}
            >
              Ver todas
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.length === 0 ? (
              <div className="col-span-full bg-muted/30 rounded-lg p-8 text-center">
                <FolderOpen className="size-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No hay plantillas disponibles
                </h3>
                <p className="text-muted-foreground">
                  Las plantillas te permiten crear documentos rápidamente.
                </p>
                <Button onClick={handleViewAllTemplates} className="mt-4">
                  Explorar plantillas
                </Button>
              </div>
            ) : (
              templates.slice(0, 4).map((template) => (
                <Card key={template.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{template.category}</Badge>
                      <div className="text-xs text-muted-foreground">
                        {template.usageCount || 0} usos
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">
                      {template.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {template.description ||
                        "Plantilla profesional para documentos legales"}
                    </p>
                    {template.tags && template.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.tags.slice(0, 3).map((tag: any) => (
                          <Badge
                            key={tag.id}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.tags.length - 3}
                          </Badge>
                        )}
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
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="actividad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="size-5" />
                Resumen de actividad
              </CardTitle>
              <CardDescription>
                Actividad reciente en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {documents.length > 0 ? (
                  documents.slice(0, 5).map((doc) => (
                    <div key={doc.id} className="flex items-start gap-4">
                      <div className="bg-muted rounded-full p-2">
                        <CalendarDays className="size-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {doc.aiGenerated ? (
                            <>
                              <Badge
                                variant="outline"
                                className="mr-2 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                              >
                                <Wand2 className="size-3 mr-1" />
                                IA
                              </Badge>
                              Documento generado con IA:
                            </>
                          ) : (
                            "Documento creado:"
                          )}
                          <span
                            className="text-primary underline cursor-pointer ml-1"
                            onClick={() => handleViewDocument(doc.id)}
                          >
                            {doc.title}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(doc.createdAt)}
                        </p>
                        {doc.description && (
                          <div className="mt-2 p-3 bg-muted rounded-md text-xs">
                            <p className="line-clamp-2">{doc.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <History className="size-12 text-muted-foreground opacity-50 mb-4" />
                    <p className="text-muted-foreground">
                      No hay actividad reciente para mostrar
                    </p>
                    <Button onClick={handleCreateDocument} className="mt-4">
                      Crear documento
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            {documents.length > 5 && (
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver más actividad
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este documento? Esta acción
              no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteDocument}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
