"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  FileText,
  Trash2,
  Edit,
  Eye,
  ListFilter,
} from "lucide-react";
import { DocumentCard } from "./document-card";

const documents = [
  {
    id: "doc-1",
    title: "Contrato de arrendamiento",
    type: "Inmobiliario",
    status: "Completado",
    createdAt: "2025-03-10T14:30:00",
    updatedAt: "2025-03-11T09:15:00",
    pages: 4,
    tags: ["Alquiler", "Residencial"],
    aiGenerated: true,
  },
  {
    id: "doc-2",
    title: "Acuerdo de confidencialidad",
    type: "Corporativo",
    status: "En revisión",
    createdAt: "2025-03-08T11:20:00",
    updatedAt: "2025-03-09T16:45:00",
    pages: 2,
    tags: ["NDA", "Empresa"],
    aiGenerated: true,
  },
  {
    id: "doc-3",
    title: "Testamento",
    type: "Familiar",
    status: "Borrador",
    createdAt: "2025-03-05T09:10:00",
    updatedAt: "2025-03-05T09:10:00",
    pages: 7,
    tags: ["Personal", "Herencia"],
    aiGenerated: false,
  },
  {
    id: "doc-4",
    title: "Contrato de servicios",
    type: "Comercial",
    status: "Completado",
    createdAt: "2025-03-03T15:40:00",
    updatedAt: "2025-03-04T10:30:00",
    pages: 5,
    tags: ["Servicios", "Consultoría"],
    aiGenerated: true,
  },
  {
    id: "doc-5",
    title: "Demanda civil",
    type: "Litigios",
    status: "En revisión",
    createdAt: "2025-03-01T13:15:00",
    updatedAt: "2025-03-02T14:20:00",
    pages: 12,
    tags: ["Judicial", "Demanda"],
    aiGenerated: false,
  },
  {
    id: "doc-6",
    title: "Reglamento interno",
    type: "Laboral",
    status: "Completado",
    createdAt: "2025-02-28T10:05:00",
    updatedAt: "2025-03-01T11:30:00",
    pages: 8,
    tags: ["Empresa", "Normativa"],
    aiGenerated: true,
  },
];

interface DocumentsListProps {
  onViewDetails: (id: string) => void;
  onEditDocument: (id: string) => void;
}

export function DocumentsList({
  onViewDetails,
  onEditDocument,
}: DocumentsListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesType = selectedType ? doc.type === selectedType : true;
    const matchesStatus = selectedStatus ? doc.status === selectedStatus : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = (docId: string) => {
    setDocumentToDelete(docId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    console.log("Eliminar documento:", documentToDelete);
    setShowDeleteDialog(false);
    setDocumentToDelete(null);
  };

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
                  {status}
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
      {filteredDocuments.length === 0 ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <FileText className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            No se encontraron documentos
          </h3>
          <p className="text-muted-foreground">
            Intenta con otros términos de búsqueda o elimina los filtros
            aplicados.
          </p>
        </div>
      ) : (
        <>
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onView={() => onViewDetails(doc.id)}
                  onEdit={() => onEditDocument(doc.id)}
                  onDelete={() => handleDelete(doc.id)}
                />
              ))}
            </div>
          )}
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
                          <Badge
                            className={
                              doc.status === "Completado"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : doc.status === "En revisión"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }
                          >
                            {doc.status}
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
                              onClick={() => handleDelete(doc.id)}
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
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
