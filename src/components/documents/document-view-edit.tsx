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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FileText,
  Save,
  Edit,
  Eye,
  Clock,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  ArrowLeft,
  History,
  MessageSquare,
  Wand2,
  Download,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  getDocument,
  updateDocument,
  deleteDocument,
} from "@/services/document-service";
import {
  getDocumentVersions,
  createDocumentVersion,
} from "@/services/document-version-service";
import { DocumentVersionViewer } from "../../components/version/document-version-viewer";
import jsPDF from "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const documentTypes = [
  { value: "inmobiliario", label: "Inmobiliario" },
  { value: "corporativo", label: "Corporativo" },
  { value: "familiar", label: "Familiar" },
  { value: "comercial", label: "Comercial" },
  { value: "laboral", label: "Laboral" },
  { value: "litigios", label: "Litigios" },
];

const formSchema = z.object({
  title: z.string().min(5, {
    message: "El título debe tener al menos 5 caracteres",
  }),
  description: z.string().optional(),
  type: z.string({
    required_error: "Por favor selecciona un tipo de documento",
  }),
  content: z.string().min(20, {
    message: "El contenido debe tener al menos 20 caracteres",
  }),
  status: z.enum(["borrador", "en_revision", "completado"], {
    required_error: "Por favor selecciona un estado",
  }),
});

interface DocumentViewEditProps {
  id: string;
  readOnly?: boolean;
}

export function DocumentViewEdit({ id, readOnly = false }: DocumentViewEditProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("documento");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCreatingVersion, setIsCreatingVersion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [document, setDocument] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [versions, setVersions] = useState<any[]>([]);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versionDescription, setVersionDescription] = useState("");
  const [showCreateVersionDialog, setShowCreateVersionDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      content: "",
      status: "borrador",
    },
  });

  useEffect(() => {
    const loadDocument = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        console.log("Cargando documento con ID:", id);
        const documentData = await getDocument(id);

        setDocument(documentData);

        const documentTags =
          documentData.tags?.map((tag: any) => tag.name) || [];
        setTags(documentTags);

        form.reset({
          title: documentData.title || "",
          description: documentData.description || "",
          type: documentData.type?.toLowerCase() || "",
          content: documentData.content || "",
          status: documentData.status?.toLowerCase() || "borrador",
        });

        const versionsData = await getDocumentVersions(id);
        setVersions(versionsData);
      } catch (err) {
        console.error("Error al cargar el documento:", err);
        setError(
          "No se pudo cargar el documento. Por favor, inténtalo de nuevo."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadDocument();
  }, [id, form]);

  const handleSave = async (values: z.infer<typeof formSchema>) => {
    if (!id) return;

    try {
      setIsSaving(true);
      setError(null);

      const documentData = {
        ...values,
        tags,
        aiGenerated: document?.aiGenerated || false,
      };

      await updateDocument(id, documentData);

      setDocument({
        ...document,
        ...documentData,
      });

      const versionsData = await getDocumentVersions(id);
      setVersions(versionsData);

      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar el documento:", err);
      setError(
        "No se pudo actualizar el documento. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateVersion = async () => {
    if (!id || !document) return;

    try {
      setIsCreatingVersion(true);
      setError(null);

      const versionData = {
        content: document.content,
        description: versionDescription || `Nueva versión manual`,
        aiGenerated: false,
      };
      await createDocumentVersion(id, versionData);
      const versionsData = await getDocumentVersions(id);
      setVersions(versionsData);
      setShowCreateVersionDialog(false);
      setVersionDescription("");
    } catch (err) {
      console.error("Error al crear nueva versión:", err);
      setError(
        "No se pudo crear la nueva versión. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsCreatingVersion(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Fecha no disponible";

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

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      form.reset({
        title: document?.title || "",
        description: document?.description || "",
        type: document?.type?.toLowerCase() || "",
        content: document?.content || "",
        status: document?.status?.toLowerCase() || "borrador",
      });
    } else {
      router.push("/documents?view=list");
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      setError(null);

      await deleteDocument(id);
      setShowDeleteDialog(false);

      router.push("/documents?view=list");
    } catch (err) {
      console.error("Error al eliminar el documento:", err);
      setError(
        "No se pudo eliminar el documento. Por favor, inténtalo de nuevo."
      );
      setShowDeleteDialog(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (!readOnly) {
      setIsEditing(true);
    }
  };

  const handleExportToPDF = async () => {
    if (!document) return;

    try {
      setIsExporting(true);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      const titleFontSize = 16;
      const subtitleFontSize = 12;
      const bodyFontSize = 10;
      const lineHeightFactor = 1.5;
      let yPosition = margin;

      const addText = (text: string, fontSize: number, isBold = false) => {
        if (!text || text.trim() === "") return;
        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", isBold ? "bold" : "normal");
        const lines = pdf.splitTextToSize(text, contentWidth);
        const lineHeight = fontSize * 0.3528 * lineHeightFactor;
        const textHeight = lines.length * lineHeight;
        
        if (yPosition + textHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        for (let i = 0; i < lines.length; i++) {
          pdf.text(lines[i], margin, yPosition);
          yPosition += lineHeight;
        }

        yPosition += 2;
      };

      const formatDate = (dateString: string | number | Date) => {
        if (!dateString) return "No disponible";
        return new Date(dateString).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      };

      const addFooter = () => {
        const totalPages = pdf.getNumberOfPages();
        const now = new Date().toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setFont("helvetica", "italic");
          pdf.setTextColor(100, 100, 100);
          pdf.text(
            `Documento exportado el ${now} - Página ${i} de ${totalPages}`,
            margin,
            pageHeight - margin
          );
        }
      };

      pdf.setTextColor(0, 0, 0);
      addText(document.title, titleFontSize, true);
      addText(`Tipo: ${document.type}`, bodyFontSize);
      addText(`Estado: ${document.status}`, bodyFontSize);
      addText(`Creado: ${formatDate(document.createdAt)}`, bodyFontSize);
      addText(
        `Última modificación: ${formatDate(document.updatedAt)}`,
        bodyFontSize
      );
      if (tags && tags.length > 0) {
        addText(`Etiquetas: ${tags.join(", ")}`, bodyFontSize);
      }

      if (document.description) {
        yPosition += 3;
        addText("Descripción:", subtitleFontSize, true);
        addText(document.description, bodyFontSize);
      }

      yPosition += 5;
      addText("CONTENIDO DEL DOCUMENTO", subtitleFontSize, true);

      const paragraphSeparators = ["\n\n", "\r\n\r\n", "\n\r\n\r"];
      let contentParagraphs = [document.content];

      for (const separator of paragraphSeparators) {
        contentParagraphs = contentParagraphs.flatMap((p) =>
          p.split(separator)
        );
      }

      contentParagraphs = contentParagraphs.filter((p) => p.trim() !== "");

      for (const paragraph of contentParagraphs) {
        if (paragraph.length > 500) {
          const chunks = [];

          for (let i = 0; i < paragraph.length; i += 400) {
            chunks.push(paragraph.substring(i, i + 400));
          }

          for (const chunk of chunks) {
            addText(chunk, bodyFontSize);
          }
        } else {
          addText(paragraph, bodyFontSize);
        }

        yPosition += 1;
      }

      addFooter();
      pdf.save(`${document.title.replace(/\s+/g, "_")}.pdf`);
      
      setTimeout(() => {
        setIsExporting(false);
      }, 1000);
    } catch (error) {
      console.error("Error al exportar a PDF:", error);
      setIsExporting(false);
      setError("Error al exportar el documento a PDF");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 gap-4">
          <Loader2 className="size-12 text-primary animate-spin" />
          <p className="text-lg font-medium">Cargando documento...</p>
          <p className="text-sm text-muted-foreground">
            Estamos recuperando la información del documento.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/documents?view=list")}
          >
            Volver a la lista
          </Button>
        </div>
      </Alert>
    );
  }

  if (showVersionHistory) {
    return (
      <DocumentVersionViewer
        documentId={id}
        currentContent={document.content}
        onBack={() => setShowVersionHistory(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Editar documento</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Guardando...</span>
                        </>
                      ) : (
                        <>
                          <Save className="size-4" />
                          <span>Guardar cambios</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Modifica los detalles del documento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título del documento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: Contrato de arrendamiento"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de documento</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo de documento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {documentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe brevemente el propósito de este documento"
                          className="resize-none h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Etiquetas</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Añade etiquetas para facilitar la búsqueda"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTag}
                      variant="outline"
                    >
                      Añadir
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-muted-foreground hover:text-foreground transition-colors ml-1"
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contenido del documento</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-80 font-mono text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado del documento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="borrador">Borrador</SelectItem>
                          <SelectItem value="en_revision">
                            En revisión
                          </SelectItem>
                          <SelectItem value="completado">Completado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Define el estado actual de este documento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </form>
        </Form>
      ) : (
        <>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {document?.title}
                    {document?.aiGenerated && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 ml-2"
                      >
                        <Wand2 className="size-3" />
                        <span>IA</span>
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {document?.description || "Sin descripción"}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">{document?.type}</Badge>
                    <Badge className={getStatusColor(document?.status)}>
                      {document?.status?.charAt(0).toUpperCase() +
                        document?.status?.slice(1).replace("_", " ")}
                    </Badge>
                    {tags.map((tag, index) => (
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
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleCancel}
                  >
                    <ArrowLeft className="size-4" />
                    <span>Volver</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleEdit()}
                    disabled={readOnly}
                  >
                    <Edit className="size-4" />
                    <span>Editar</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleExportToPDF}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Exportando...</span>
                      </>
                    ) : (
                      <>
                        <Download className="size-4" />
                        <span>Descargar PDF</span>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={readOnly}
                  >
                    <Trash2 className="size-4" />
                    <span>Eliminar</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-col sm:flex-row text-sm gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>Creado: {formatDate(document?.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>Actualizado: {formatDate(document?.updatedAt)}</span>
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
              <TabsTrigger
                value="documento"
                className="flex items-center gap-2"
              >
                <FileText className="size-4" />
                <span>Documento</span>
              </TabsTrigger>
              <TabsTrigger
                value="historial"
                className="flex items-center gap-2"
              >
                <History className="size-4" />
                <span>Historial de versiones</span>
                {versions?.length > 0 && (
                  <Badge variant="outline" className="ml-1 px-2 py-0 h-5">
                    {versions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="comentarios"
                className="flex items-center gap-2"
              >
                <MessageSquare className="size-4" />
                <span>Comentarios</span>
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
                  <div className="bg-muted/30 rounded-lg p-6 whitespace-pre-wrap font-serif max-h-[60vh] overflow-y-auto">
                    {document?.content}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setActiveTab("documento")}
                  >
                    <Eye className="size-4" />
                    <span>Ver</span>
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={handleExportToPDF}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Exportando...</span>
                        </>
                      ) : (
                        <>
                          <Download className="size-4" />
                          <span>Exportar PDF</span>
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleEdit()}
                      disabled={readOnly}
                      size="sm"
                    >
                      <Edit className="size-4" />
                      <span>Editar</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="historial" className="m-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="size-5" />
                      Historial de versiones
                    </CardTitle>
                    <CardDescription>
                      Seguimiento de cambios y revisiones del documento
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowVersionHistory(true)}
                    >
                      Ver historial detallado
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowCreateVersionDialog(true)}
                      disabled={readOnly}
                    >
                      Nueva versión
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {versions?.length ? (
                    <div className="space-y-6">
                      {versions.slice(0, 3).map((version, index) => (
                        <div key={version.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                              {version.versionNumber}
                            </div>
                            {index < versions.slice(0, 3).length - 1 && (
                              <div className="w-0.5 grow bg-muted-foreground/20 my-1"></div>
                            )}
                          </div>
                          <div className="space-y-1 pb-4">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">Versión {version.versionNumber}</h4>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(version.createdAt)}
                              </span>
                              {version.aiGenerated && (
                                <Badge
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  <Wand2 className="size-3" />
                                  <span>IA</span>
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {version.description || "Actualización del documento"}
                            </p>
                          </div>
                        </div>
                      ))}
                      {versions.length > 3 && (
                        <div className="flex justify-center pt-2 border-t">
                          <Button 
                            variant="link" 
                            onClick={() => setShowVersionHistory(true)}
                          >
                            Ver todas las versiones ({versions.length})
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <History className="size-10 mx-auto mb-2 opacity-50" />
                      <p>
                        No hay historial de versiones disponible para este
                        documento
                      </p>
                    </div>
                  )}
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
                  {document?.comments?.length > 0 ? (
                    <div className="space-y-4">
                      {document.comments.map((comment: any) => (
                        <div
                          key={comment.id}
                          className="flex gap-4 border-b pb-4 last:border-0"
                        >
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <MessageSquare className="size-10 mx-auto mb-2 opacity-50" />
                      <p>No hay comentarios para este documento</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full">
                    <Textarea
                      className="w-full min-h-20 resize-none mb-2"
                      placeholder="Añade un nuevo comentario..."
                      disabled={readOnly}
                    />
                    <div className="flex justify-end">
                      <Button disabled={readOnly}>Enviar comentario</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
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
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
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

      <Dialog open={showCreateVersionDialog} onOpenChange={setShowCreateVersionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crear nueva versión</DialogTitle>
            <DialogDescription>
              Crea un punto de guardado en el historial de este documento para poder 
              volver a este estado en el futuro si es necesario.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <FormLabel>Descripción de la versión</FormLabel>
            <Textarea
              value={versionDescription}
              onChange={(e) => setVersionDescription(e.target.value)}
              placeholder="Ej: Revisión de cláusulas, Correcciones finales..."
              className="mt-2 resize-none"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Una buena descripción te ayudará a identificar rápidamente el propósito de esta versión en el futuro.
            </p>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateVersionDialog(false);
                setVersionDescription("");
              }}
              disabled={isCreatingVersion}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateVersion}
              disabled={isCreatingVersion}
            >
              {isCreatingVersion ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  <span>Creando versión...</span>
                </>
              ) : (
                <>
                  <History className="size-4 mr-2" />
                  <span>Crear versión</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}