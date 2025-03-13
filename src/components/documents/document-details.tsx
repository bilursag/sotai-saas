/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Download,
  Clock,
  Edit,
  MoreVertical,
  Share2,
  Copy,
  Printer,
  ExternalLink,
  History,
  Trash2,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const getDocumentById = (id: string) => {
  return {
    id: "doc-1",
    title: "Contrato de arrendamiento",
    description:
      "Contrato de arrendamiento para propiedad residencial ubicada en Madrid",
    type: "Inmobiliario",
    content: 
      `Este contrato de arrendamiento se celebra el día [FECHA] entre [ARRENDADOR] y [ARRENDATARIO]...

        CLÁUSULA PRIMERA: OBJETO DEL CONTRATO
        El ARRENDADOR da en arrendamiento al ARRENDATARIO, quien a su vez lo recibe en tal calidad, el inmueble ubicado en [DIRECCIÓN COMPLETA], con una superficie de [SUPERFICIE] metros cuadrados.

        CLÁUSULA SEGUNDA: DURACIÓN DEL CONTRATO
        El plazo de duración del presente contrato es de [DURACIÓN] años, contados a partir de la fecha de firma del mismo.

        CLÁUSULA TERCERA: RENTA
        El ARRENDATARIO se obliga a pagar al ARRENDADOR, en concepto de renta mensual, la cantidad de [IMPORTE] pesos, que deberá ser abonada dentro de los primeros cinco días de cada mes.

        CLÁUSULA CUARTA: FIANZA
        A la firma del presente contrato, el ARRENDATARIO entrega al ARRENDADOR la cantidad de [IMPORTE] pesos, equivalente a [NÚMERO] mensualidades de renta, en concepto de fianza.`,
    status: "Completado",
    createdAt: "2025-03-10T14:30:00",
    updatedAt: "2025-03-11T09:15:00",
    createdBy: "Juan Pérez",
    pages: 4,
    tags: ["Alquiler", "Residencial"],
    aiGenerated: true,
    versions: [
      {
        id: "v3",
        date: "2025-03-11T09:15:00",
        user: "Juan Pérez",
        description: "Versión final con ajustes de cláusulas",
      },
      {
        id: "v2",
        date: "2025-03-10T16:45:00",
        user: "Asistente IA",
        description: "Actualización de condiciones de renta",
      },
      {
        id: "v1",
        date: "2025-03-10T14:30:00",
        user: "Juan Pérez",
        description: "Creación inicial del documento",
      },
    ],
    comments: [
      {
        id: "c1",
        user: "María López",
        text: "He revisado las cláusulas y todo parece correcto legalmente.",
        date: "2025-03-11T08:30:00",
        resolved: true,
      },
      {
        id: "c2",
        user: "Carlos Ruiz",
        text: "¿Podemos especificar mejor las condiciones de la fianza?",
        date: "2025-03-10T17:20:00",
        resolved: false,
      },
    ],
  };
};

interface DocumentDetailsProps {
  id: string;
  onEdit: () => void;
}

export function DocumentDetails({ id, onEdit }: DocumentDetailsProps) {
  const [activeTab, setActiveTab] = useState("documento");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const document = getDocumentById(id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  const handleDelete = () => {
    console.log("Eliminar documento:", id);
    setShowDeleteDialog(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("Nuevo comentario:", newComment);
      setNewComment("");
    }
  };

  const handleResolveComment = (commentId: string) => {
    console.log("Marcar comentario como resuelto:", commentId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                {document.title}
                {document.aiGenerated && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 ml-2"
                  >
                    <Sparkles className="size-3" />
                    <span>IA</span>
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="mt-1">
                {document.description}
              </CardDescription>

              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">{document.type}</Badge>
                <Badge className={getStatusColor(document.status)}>
                  {document.status}
                </Badge>
                {document.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-muted/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="size-4" />
                <span>Descargar</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={onEdit}
              >
                <Edit className="size-4" />
                <span>Editar</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Share2 className="size-4" />
                    <span>Compartir documento</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Copy className="size-4" />
                    <span>Duplicar documento</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Printer className="size-4" />
                    <span>Imprimir</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center gap-2 text-destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="size-4" />
                    <span>Eliminar documento</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex flex-col sm:flex-row text-sm gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>Creado: {formatDate(document.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>Actualizado: {formatDate(document.updatedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="size-4" />
              <span>{document.pages} páginas</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="documento" className="flex items-center gap-2">
            <FileText className="size-4" />
            <span>Documento</span>
          </TabsTrigger>
          <TabsTrigger value="historial" className="flex items-center gap-2">
            <History className="size-4" />
            <span>Historial de versiones</span>
          </TabsTrigger>
          <TabsTrigger value="comentarios" className="flex items-center gap-2">
            <MessageSquare className="size-4" />
            <span>Comentarios</span>
            {document.comments.filter((c) => !c.resolved).length > 0 && (
              <Badge
                variant="outline"
                className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              >
                {document.comments.filter((c) => !c.resolved).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="documento" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Contenido del documento</CardTitle>
              <CardDescription>
                Vista completa del documento legal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6 whitespace-pre-wrap font-serif">
                {document.content}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="size-4" />
                <span>Abrir en editor completo</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Printer className="size-4" />
                <span>Imprimir</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="historial" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Historial de versiones</CardTitle>
              <CardDescription>
                Seguimiento de cambios y revisiones del documento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {document.versions.map((version, index) => (
                  <div key={version.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {index === 0 ? "A" : index + 1}
                      </div>
                      {index < document.versions.length - 1 && (
                        <div className="w-0.5 grow bg-muted-foreground/20 my-1"></div>
                      )}
                    </div>
                    <div className="space-y-1 pb-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{version.user}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(version.date)}
                        </span>
                        {version.user.includes("IA") && (
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Sparkles className="size-3" />
                            <span>IA</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {version.description}
                      </p>
                      <div className="pt-2 flex gap-2">
                        <Button variant="outline" size="sm">
                          Ver esta versión
                        </Button>
                        {index > 0 && (
                          <Button variant="outline" size="sm">
                            Comparar con anterior
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comentarios" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Comentarios</CardTitle>
              <CardDescription>
                Discusiones y feedback sobre el documento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {document.comments.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <MessageSquare className="size-10 mx-auto mb-2 opacity-50" />
                    <p>No hay comentarios para este documento</p>
                  </div>
                ) : (
                  document.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-4 border-b pb-4 last:border-0"
                    >
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        {comment.user.charAt(0).toUpperCase()}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{comment.user}</h4>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.date)}
                            </span>
                          </div>
                          {comment.resolved ? (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                            >
                              <CheckCircle2 className="size-3" />
                              <span>Resuelto</span>
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            >
                              <AlertCircle className="size-3" />
                              <span>Pendiente</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{comment.text}</p>
                        <div className="pt-2 flex gap-2">
                          {!comment.resolved && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResolveComment(comment.id)}
                            >
                              Marcar como resuelto
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            Responder
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full space-y-2">
                <Textarea
                  className="w-full min-h-20 resize-none"
                  placeholder="Añade un nuevo comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment}>Enviar comentario</Button>
                </div>
              </div>
            </CardFooter>
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
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
