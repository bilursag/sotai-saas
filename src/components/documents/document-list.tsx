/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  MoreVertical,
  FileText,
  Trash2,
  Edit,
  Eye,
  Download,
  Copy,
  ListFilter,
  Loader2,
  Users,
} from "lucide-react";

import { getAllDocuments, deleteDocument } from "@/services/document-service";
import { getSharedWithMeDocuments } from "@/services/document-share-service";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";


interface DocumentsListProps {
  onViewDetails: (id: string) => void;
  onEditDocument: (id: string) => void;
}

interface Document {
  id: string;
  title: string;
  type: string;
  status: string;
  updatedAt: string;
  tags: { id: string; name: string }[];
  aiGenerated?: boolean;
}

export function DocumentsList({
  onViewDetails,
  onEditDocument,
}: DocumentsListProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sharedDocuments, setSharedDocuments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"mine" | "shared">("mine");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const ownData = await getAllDocuments();
        setDocuments(ownData);
        const sharedData = await getSharedWithMeDocuments();
        setSharedDocuments(sharedData);
        setError(null);
      } catch (err) {
        console.error("Error al cargar documentos:", err);
        setError("No se pudieron cargar los documentos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
      case "Completado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "en_revision":
      case "En revisión":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "borrador":
      case "Borrador":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteConfirmation = (docId: string) => {
    setDocumentToDelete(docId);
    setShowDeleteDialog(true);
  };

  const handleDeleteDocument = async () => {
    if (!documentToDelete) return;
    try {
      setIsDeleting(true);
      await deleteDocument(documentToDelete);
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete));
      setShowDeleteDialog(false);
      setDocumentToDelete(null);
    } catch (err) {
      console.error("Error al eliminar documento:", err);
      setError("No se pudo eliminar el documento");
    } finally {
      setIsDeleting(false);
    }
  };

  const docsToFilter = activeTab === "mine" ? documents : sharedDocuments;

  const filteredDocuments = docsToFilter.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag: { id: string; name: string }) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesType = selectedType
      ? doc.type.toLowerCase() === selectedType.toLowerCase()
      : true;
    const matchesStatus = selectedStatus
      ? doc.status.toLowerCase() === selectedStatus.toLowerCase()
      : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  const uniqueTypes = Array.from(new Set(documents.map((doc) => doc.type)));
  const uniqueStatuses = Array.from(
    new Set(documents.map((doc) => doc.status))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-muted/40 p-4 rounded-lg">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v: any) => setActiveTab(v)}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="mine" className="flex items-center gap-1">
              <FileText className="size-3" />
              <span>Mis documentos</span>
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex items-center gap-1">
              <Users className="size-3" />
              <span>Compartidos conmigo</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="size-4" />
                <span>Tipo</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedType("")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {uniqueTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ListFilter className="size-4" />
                <span>Estado</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedStatus("")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {uniqueStatuses.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status.charAt(0).toUpperCase() +
                    status.slice(1).replace("_", " ")}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("table")}
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Estado de carga */}
      {isLoading ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <Loader2 className="size-12 mx-auto text-primary animate-spin mb-4" />
          <h3 className="text-lg font-medium mb-2">Cargando documentos</h3>
          <p className="text-muted-foreground">
            Estamos obteniendo tus documentos, espera un momento...
          </p>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 rounded-lg p-8 text-center">
          <Trash2 className="size-12 mx-auto text-destructive mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Error al cargar documentos
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </Button>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <FileText className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            No se encontraron documentos
          </h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedType || selectedStatus
              ? "Intenta con otros términos de búsqueda o elimina los filtros aplicados."
              : "Aún no tienes documentos. Crea uno nuevo para comenzar."}
          </p>
          {!searchQuery && !selectedType && !selectedStatus && (
            <Button
              onClick={() => router.push("/documents?view=new")}
              className="mt-4"
            >
              Crear nuevo documento
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Vista de cuadrícula */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription>
                          {doc.type} •{" "}
                          {new Date(doc.updatedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status.charAt(0).toUpperCase() +
                          doc.status.slice(1).replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="size-4" />
                        <span>
                          Última edición:{" "}
                          {new Date(doc.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.tags.map((tag: { id: string; name: string }) => (
                            <Badge
                              key={tag.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {doc.aiGenerated && (
                        <Badge
                          variant="outline"
                          className="w-fit mt-1 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                        >
                          IA
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onViewDetails(doc.id)}
                    >
                      Ver
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => onEditDocument(doc.id)}
                    >
                      Editar
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onViewDetails(doc.id)}>
                          <Eye className="size-4 mr-2" />
                          Ver documento
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEditDocument(doc.id)}
                        >
                          <Edit className="size-4 mr-2" />
                          Editar documento
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="size-4 mr-2" />
                          Descargar PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="size-4 mr-2" />
                          Duplicar
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
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Vista de tabla */}
          {viewMode === "table" && (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Última actualización</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="size-4 text-muted-foreground" />
                            {doc.title}
                            {doc.aiGenerated && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                IA
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status.charAt(0).toUpperCase() +
                              doc.status.slice(1).replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(doc.updatedAt).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onViewDetails(doc.id)}
                              title="Ver documento"
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEditDocument(doc.id)}
                              title="Editar documento"
                            >
                              <Edit className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteConfirmation(doc.id)}
                              title="Eliminar documento"
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Diálogo de confirmación para eliminar */}
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
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteDocument}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  <span>Eliminando...</span>
                </>
              ) : (
                "Eliminar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
