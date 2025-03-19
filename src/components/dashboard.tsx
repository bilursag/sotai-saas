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
  Users,
  TrendingUp,
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
import { getSharedWithMeDocuments } from "@/services/document-share-service";

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
  const [sharedDocuments, setSharedDocuments] = useState<any[]>([]);

  const [stats, setStats] = useState({
    totalDocuments: 0,
    templatesUsed: 0,
    timeSaved: 0,
    aiGeneratedPercent: 0,
    sharedWithMe: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const docsData = await getAllDocuments();
        setDocuments(docsData);

        // Cargar documentos compartidos
        const sharedData = await getSharedWithMeDocuments();
        setSharedDocuments(sharedData);

        const templatesData = await getAllTemplates();
        setTemplates(templatesData);
        calculateStats(docsData, templatesData, sharedData);
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err);
        setError("No se pudieron cargar los datos del dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const calculateStats = (docs: any[], temps: any[], shared: any[]) => {
    const totalDocs = docs.length;
    const aiGenerated = docs.filter((doc) => doc.aiGenerated).length;
    const aiPercent =
      totalDocs > 0 ? Math.round((aiGenerated / totalDocs) * 100) : 0;
    const timePerDoc = 30; // minutos
    const timeSaved = totalDocs * timePerDoc;

    const totalShared = shared.length;

    setStats({
      totalDocuments: totalDocs,
      templatesUsed: temps.length,
      timeSaved: timeSaved,
      aiGeneratedPercent: aiPercent,
      sharedWithMe: totalShared,
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
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800";
      case "en_revision":
      case "en revisión":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "borrador":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300 border-gray-200 dark:border-gray-700";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300 border-gray-200 dark:border-gray-700";
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
      <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center h-96 mt-8">
            <div className="relative">
              <Loader2 className="size-16 text-blue-600 dark:text-blue-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600"></div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6">
              Cargando datos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Por favor espera mientras cargamos tu información...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
              onClick={handleCreateDocument}
            >
              <PlusCircle className="size-4" />
              <span>Nuevo documento</span>
            </Button>
          </div>
          <Alert
            variant="destructive"
            className="mt-8 border border-red-200 dark:border-red-800/60 bg-red-50 dark:bg-red-900/20"
          >
            <AlertTriangle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex items-center mt-2">
              {error}
              <Button
                variant="outline"
                className="ml-2 border-red-200 dark:border-red-800/60 hover:bg-red-100 dark:hover:bg-red-900/40"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white bg-clip-text">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona y crea documentos legales con IA
            </p>
          </div>
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
            onClick={handleCreateDocument}
          >
            <PlusCircle className="size-4" />
            <span>Nuevo documento</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-2">
          <Card className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <FileText className="size-4" />
                    Documentos totales
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stats.totalDocuments}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {documents.length > 0
                      ? `Último creado ${formatDate(documents[0].createdAt)}`
                      : "Sin documentos aún"}
                  </p>
                </div>
                {documents.length > 0 && (
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <TrendingUp className="size-3 mr-1" />
                    <span>+{Math.min(documents.length, 3)} nuevos</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <FolderOpen className="size-4" />
                    Plantillas disponibles
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stats.templatesUsed}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Para diferentes tipos de documentos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Clock className="size-4" />
                    Tiempo estimado ahorrado
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stats.timeSaved < 60
                      ? `${stats.timeSaved} min`
                      : `${Math.floor(stats.timeSaved / 60)}h ${
                          stats.timeSaved % 60
                        }m`}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Basado en 30 minutos por documento
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Users className="size-4" />
                    Documentos compartidos contigo
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stats.sharedWithMe || 0}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stats.sharedWithMe > 0
                      ? `Último actualizado ${formatDate(
                          sharedDocuments[0]?.updatedAt
                        )}`
                      : "No hay documentos compartidos"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-zinc-950 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-1 md:p-6">
          <Tabs
            defaultValue="documentos"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <TabsList className="bg-gray-100 dark:bg-zinc-900 p-1 h-auto">
                <TabsTrigger
                  value="documentos"
                  className="flex items-center gap-2 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                >
                  <FileText className="size-4" />
                  <span>Mis documentos</span>
                </TabsTrigger>
                <TabsTrigger
                  value="plantillas"
                  className="flex items-center gap-2 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                >
                  <FolderOpen className="size-4" />
                  <span>Plantillas</span>
                </TabsTrigger>
                <TabsTrigger
                  value="actividad"
                  className="flex items-center gap-2 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                >
                  <History className="size-4" />
                  <span>Actividad</span>
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative max-w-xs flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-10 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400"
                    >
                      <Filter className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800"
                  >
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                    <DropdownMenuItem>Fecha</DropdownMenuItem>
                    <DropdownMenuItem>Tipo de documento</DropdownMenuItem>
                    <DropdownMenuItem>Estado</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400"
                    >
                      <ArrowDownUp className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800"
                  >
                    <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                    <DropdownMenuItem>Más reciente</DropdownMenuItem>
                    <DropdownMenuItem>Más antiguo</DropdownMenuItem>
                    <DropdownMenuItem>Nombre (A-Z)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="documentos" className="space-y-6 mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Documentos recientes
                </h2>
                <Button
                  variant="ghost"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                  onClick={handleViewAllDocuments}
                >
                  Ver todos
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {recentDocuments.length === 0 ? (
                  <div className="col-span-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-8 text-center">
                    <FileText className="size-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No se encontraron documentos
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Intenta con otros términos de búsqueda o crea un nuevo
                      documento.
                    </p>
                    <Button
                      onClick={handleCreateDocument}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                    >
                      Crear nuevo documento
                    </Button>
                  </div>
                ) : (
                  recentDocuments.map((doc) => (
                    <Card
                      key={doc.id}
                      className="flex flex-col h-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-all"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                              {doc.title}
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                              {doc.type} • {formatDate(doc.updatedAt)}
                            </CardDescription>
                          </div>
                          <Badge
                            className={`border ${getStatusColor(doc.status)}`}
                          >
                            {doc.status.charAt(0).toUpperCase() +
                              doc.status.slice(1).replace("_", " ")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="size-4" />
                            <span>
                              Última edición: {formatDate(doc.updatedAt)}
                            </span>
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
                      <CardFooter className="flex gap-2 pt-3 border-t border-gray-200 dark:border-zinc-800">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300"
                            >
                              Opciones
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800"
                          >
                            <DropdownMenuItem
                              onClick={() => handleViewDocument(doc.id)}
                              className="text-gray-700 dark:text-gray-300 focus:text-blue-600 dark:focus:text-blue-400"
                            >
                              <Eye className="size-4 mr-2" />
                              Ver documento
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditDocument(doc.id)}
                              className="text-gray-700 dark:text-gray-300 focus:text-blue-600 dark:focus:text-blue-400"
                            >
                              <Edit className="size-4 mr-2" />
                              Editar documento
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                            <DropdownMenuItem
                              onClick={() => handleDeleteConfirmation(doc.id)}
                              className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300 focus:bg-red-50 dark:focus:bg-red-900/20"
                            >
                              <Trash2 className="size-4 mr-2" />
                              Eliminar documento
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                          onClick={() => handleViewDocument(doc.id)}
                        >
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                          onClick={() => handleEditDocument(doc.id)}
                        >
                          Editar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>

              {sharedDocuments.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Documentos compartidos contigo
                    </h2>
                    <Button
                      variant="ghost"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                      onClick={() => router.push("/documents/shared")}
                    >
                      Ver todos
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
                    {sharedDocuments.slice(0, 2).map((doc) => (
                      <Card
                        key={doc.id}
                        className="flex flex-col h-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-all"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                {doc.title}
                              </CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                                {doc.type} • Compartido por:{" "}
                                {doc.sharedBy.name || doc.sharedBy.email}
                              </CardDescription>
                            </div>
                            <Badge
                              className={`border ${getStatusColor(doc.status)}`}
                            >
                              {doc.status.charAt(0).toUpperCase() +
                                doc.status.slice(1).replace("_", " ")}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="size-4" />
                              <span>
                                Actualizado: {formatDate(doc.updatedAt)}
                              </span>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                doc.permission === "edit"
                                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                                  : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                              }
                            >
                              {doc.permission === "edit" ? (
                                <div className="flex items-center gap-1">
                                  <Edit className="size-3" />
                                  <span>Edición</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <Eye className="size-3" />
                                  <span>Lectura</span>
                                </div>
                              )}
                            </Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2 pt-3 border-t border-gray-200 dark:border-zinc-800">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900"
                            onClick={() => handleViewDocument(doc.id)}
                          >
                            Ver
                          </Button>
                          {doc.permission === "edit" && (
                            <Button
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                              onClick={() => handleEditDocument(doc.id)}
                            >
                              Editar
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Documentos generados con IA
                </h2>
                <Card className="border-dashed border-2 border-blue-200 dark:border-blue-800/40 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                      <Wand2 className="size-5 text-blue-600 dark:text-blue-400" />
                      Uso de IA en documentos
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {documents.filter((d) => d.aiGenerated).length} de{" "}
                      {documents.length} documentos generados con IA
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <Progress
                        value={stats.aiGeneratedPercent}
                        className="h-2 bg-gray-200 dark:bg-zinc-800"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stats.aiGeneratedPercent}% de tus documentos han sido
                      creados con asistencia de IA
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleCreateDocument}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      <Wand2 className="size-4 mr-2" />
                      Crear documento con IA
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="plantillas" className="space-y-6 mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Plantillas populares
                </h2>
                <Button
                  variant="ghost"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                  onClick={handleViewAllTemplates}
                >
                  Ver todas
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {templates.length === 0 ? (
                  <div className="col-span-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-8 text-center">
                    <FolderOpen className="size-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No hay plantillas disponibles
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Las plantillas te permiten crear documentos rápidamente.
                    </p>
                    <Button
                      onClick={handleViewAllTemplates}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                    >
                      Explorar plantillas
                    </Button>
                  </div>
                ) : (
                  templates.slice(0, 4).map((template) => (
                    <Card
                      key={template.id}
                      className="flex flex-col h-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-all"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-zinc-900 dark:text-gray-300 dark:border-zinc-700"
                          >
                            {template.category}
                          </Badge>
                          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {template.usageCount || 0} usos
                          </div>
                        </div>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                          {template.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow pb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                          {template.description ||
                            "Plantilla profesional para documentos legales"}
                        </p>
                        {template.tags && template.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {template.tags.slice(0, 3).map((tag: any) => (
                              <Badge
                                key={tag.id}
                                variant="secondary"
                                className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-100 dark:border-blue-800/40"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                            {template.tags.length > 3 && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300"
                              >
                                +{template.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-3 border-t border-gray-200 dark:border-zinc-800">
                        <Button
                          size="sm"
                          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
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

            <TabsContent value="actividad" className="space-y-6 mt-4">
              <Card className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <BarChart3 className="size-5 text-blue-600 dark:text-blue-400" />
                    Resumen de actividad
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Actividad reciente en la plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {documents.length > 0 ? (
                      documents.slice(0, 5).map((doc) => (
                        <div key={doc.id} className="flex items-start gap-4">
                          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 flex-shrink-0">
                            <CalendarDays className="size-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {doc.aiGenerated ? (
                                <>
                                  <Badge
                                    variant="outline"
                                    className="mr-2 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800"
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
                                className="text-blue-600 dark:text-blue-400 underline cursor-pointer ml-1 hover:text-blue-700 dark:hover:text-blue-300"
                                onClick={() => handleViewDocument(doc.id)}
                              >
                                {doc.title}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(doc.createdAt)}
                            </p>
                            {doc.description && (
                              <div className="mt-2 p-3 bg-gray-50 dark:bg-zinc-900 rounded-md text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-800">
                                <p className="line-clamp-2">
                                  {doc.description}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <History className="size-12 text-gray-400 dark:text-gray-600 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          No hay actividad reciente para mostrar
                        </p>
                        <Button
                          onClick={handleCreateDocument}
                          className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                        >
                          Crear documento
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                {documents.length > 5 && (
                  <CardFooter className="border-t border-gray-200 dark:border-zinc-800 pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Ver más actividad
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Confirmar eliminación
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
                ¿Estás seguro de que deseas eliminar este documento? Esta acción
                no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex space-x-2 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteDocument}
                className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
              >
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}


