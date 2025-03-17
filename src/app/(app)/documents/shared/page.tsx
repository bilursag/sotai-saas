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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  ArrowDownUp,
  Clock,
  Eye,
  Edit,
  UserCircle,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Wand2,
} from "lucide-react";

import { getSharedWithMeDocuments } from "@/services/document-share-service";

interface SharedDocument {
  id: string;
  title: string;
  description?: string;
  type: string;
  status: string;
  content: string;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
  tags: { id: string; name: string }[];
  permission: "view" | "edit";
  sharedBy: {
    id: string;
    name?: string;
    email: string;
  };
  shareId: string;
}

export default function SharedDocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<SharedDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<SharedDocument[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "view" | "edit">(
    "all"
  );

  useEffect(() => {
    const loadSharedDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getSharedWithMeDocuments();
        setDocuments(data);
        setFilteredDocuments(data);
      } catch (err: any) {
        console.error("Error al cargar documentos compartidos:", err);
        setError(err.message || "Error al cargar documentos compartidos");
      } finally {
        setIsLoading(false);
      }
    };

    loadSharedDocuments();
  }, []);

  useEffect(() => {
    let filtered = [...documents];

    if (activeFilter !== "all") {
      filtered = filtered.filter((doc) => doc.permission === activeFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.description?.toLowerCase().includes(query) ||
          doc.type.toLowerCase().includes(query) ||
          doc.sharedBy.name?.toLowerCase().includes(query) ||
          doc.sharedBy.email.toLowerCase().includes(query) ||
          doc.tags.some((tag) => tag.name.toLowerCase().includes(query))
      );
    }

    setFilteredDocuments(filtered);
  }, [documents, searchQuery, activeFilter]);

  const handleViewDocument = (id: string) => {
    router.push(`/documents?view=details&id=${id}`);
  };

  const handleEditDocument = (id: string) => {
    router.push(`/documents?view=edit&id=${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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

  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="size-8" />
            Documentos compartidos conmigo
          </h1>
          <p className="text-muted-foreground mt-1">
            Documentos que otros usuarios han compartido contigo
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/documents?view=list")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          <span>Mis documentos</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-muted/40 p-4 rounded-lg">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentos compartidos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Tabs
            value={activeFilter}
            onValueChange={(v: any) => setActiveFilter(v)}
          >
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="edit" className="flex items-center gap-1">
                <Edit className="size-3" />
                <span>Edición</span>
              </TabsTrigger>
              <TabsTrigger value="view" className="flex items-center gap-1">
                <Eye className="size-3" />
                <span>Lectura</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ArrowDownUp className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Más reciente</DropdownMenuItem>
              <DropdownMenuItem>Más antiguo</DropdownMenuItem>
              <DropdownMenuItem>Por título (A-Z)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <Loader2 className="size-12 mx-auto text-primary animate-spin mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Cargando documentos compartidos
          </h3>
          <p className="text-muted-foreground">
            Estamos obteniendo los documentos compartidos contigo, espera un
            momento...
          </p>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 rounded-lg p-8 text-center">
          <AlertTriangle className="size-12 mx-auto text-destructive mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Error al cargar documentos compartidos
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </Button>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <Users className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            No hay documentos compartidos
          </h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "No se encontraron documentos que coincidan con tu búsqueda"
              : "Nadie ha compartido documentos contigo aún"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <UserCircle className="size-3" />
                      <span>
                        Compartido por:{" "}
                        {doc.sharedBy.name || doc.sharedBy.email}
                      </span>
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
                    <Clock className="size-4" />
                    <span>Actualizado: {formatDate(doc.updatedAt)}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-muted/40">
                      {doc.type}
                    </Badge>

                    <Badge
                      variant="outline"
                      className={
                        doc.permission === "edit"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
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

                    {doc.aiGenerated && (
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      >
                        <Wand2 className="size-3 mr-1" />
                        <span>IA</span>
                      </Badge>
                    )}
                  </div>

                  {doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                      {doc.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{doc.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewDocument(doc.id)}
                >
                  <Eye className="size-4 mr-2" />
                  Ver
                </Button>

                {doc.permission === "edit" && (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditDocument(doc.id)}
                  >
                    <Edit className="size-4 mr-2" />
                    Editar
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
