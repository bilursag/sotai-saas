"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Wand2, Loader2, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createDocument, updateDocument } from "@/services/document-service";

import { generateContent } from "@/services/ai-service";

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

interface DocumentFormProps {
  id: string | null;
  isEditing: boolean;
}

export function DocumentForm({ id, isEditing }: DocumentFormProps) {
  const searchParams = useSearchParams();
  const templateIdFromUrl = searchParams.get("templateId");
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const [isAiAssisted, setIsAiAssisted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAiPrompt, setShowAiPrompt] = useState(false);

  console.log("DocumentForm iniciado", { id, isEditing, templateIdFromUrl });

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
    async function loadTemplateData() {
      const templateIdParam = searchParams.get("templateId");

      if (!templateIdParam) return;

      try {
        setIsLoading(true);
        console.log("Intentando cargar plantilla con ID:", templateIdParam);
        const response = await fetch(`/api/templates/${templateIdParam}`);

        if (!response.ok) {
          console.error("Error en la respuesta:", response.status);
          const text = await response.text();
          console.error("Texto de error:", text);
          throw new Error(`Error ${response.status}: ${text}`);
        }

        const templateData = await response.json();
        console.log("Datos recibidos:", templateData);

        if (templateData && templateData.title) {
          form.reset({
            title: `Nuevo documento basado en ${templateData.title}`,
            description: templateData.description || "",
            type: templateData.category.toLowerCase(),
            content: templateData.content || "",
            status: "borrador",
          });

          if (templateData.tags && templateData.tags.length > 0) {
            setTags(templateData.tags.map((tag: { name: unknown; }) => tag.name));
          }

          setIsAiAssisted(true);
        }
      } catch (error) {
        console.error("Error cargando plantilla:", error);
        setError("No se pudo cargar la plantilla");
      } finally {
        setIsLoading(false);
      }
    }

    if (!isEditing) {
      loadTemplateData();
    } else if (isEditing && id) {
      // ...código existente para cargar documento...
    }
  }, [searchParams, isEditing, id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSaving(true);
      setError(null);

      const documentData = {
        ...values,
        tags,
        aiGenerated: isAiAssisted,
      };

      if (isEditing && id) {
        await updateDocument(id, documentData);
      } else {
        await createDocument(documentData);
      }

      router.push("/documents?view=list");
    } catch (err) {
      console.error("Error al guardar documento:", err);
      setError("Ocurrió un error al guardar el documento");
    } finally {
      setIsSaving(false);
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

  const handleAiPromptSubmit = async () => {
    if (!aiPrompt.trim()) return;

    try {
      setIsGenerating(true);
      setError(null);
      const documentType = form.getValues("type");
      const result = await generateContent(aiPrompt, documentType);

      if (result && result.content) {
        form.setValue("content", result.content);
        setIsAiAssisted(true);
      } else {
        throw new Error("No se recibió contenido generado");
      }

      setShowAiPrompt(false);
      setAiPrompt("");
    } catch (err) {
      console.error("Error al generar contenido con IA:", err);
      setError("No se pudo generar el contenido con IA");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAiAssist = () => {
    setShowAiPrompt(true);
  };

  const handleCancel = () => {
    router.push("/documents?view=list");
  };

  const suggestTags = () => {
    const content = form.getValues("content").toLowerCase();
    const suggestions = [];

    if (content.includes("arrend")) suggestions.push("Arrendamiento");
    if (content.includes("inmueble") || content.includes("propiedad"))
      suggestions.push("Inmueble");
    if (content.includes("fianza")) suggestions.push("Fianza");
    if (content.includes("renta")) suggestions.push("Renta");
    if (content.includes("trabajo") || content.includes("laboral"))
      suggestions.push("Contrato laboral");
    if (content.includes("empleador") || content.includes("trabajador"))
      suggestions.push("Empleo");
    if (content.includes("compraventa")) suggestions.push("Compraventa");
    if (content.includes("confidencial")) suggestions.push("Confidencialidad");

    suggestions.forEach((tag) => {
      if (!tags.includes(tag)) {
        setTags((prev) => [...prev, tag]);
      }
    });
  };

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="size-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">
            Cargando datos del documento...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {isEditing
            ? "Editar documento"
            : templateIdFromUrl
            ? "Nuevo documento desde plantilla"
            : "Crear nuevo documento"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Modifica los detalles del documento existente"
            : templateIdFromUrl
            ? "Personaliza este documento basado en la plantilla seleccionada"
            : "Completa el formulario para crear un nuevo documento legal"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="size-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Añadir
                </Button>
                <Button
                  type="button"
                  onClick={suggestTags}
                  variant="outline"
                  title="Sugerir etiquetas basadas en el contenido"
                >
                  Sugerir
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
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <FormLabel>Contenido del documento</FormLabel>
                <Button
                  type="button"
                  onClick={handleAiAssist}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Generando...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="size-4" />
                      <span>Generar con IA</span>
                    </>
                  )}
                </Button>
              </div>
              {showAiPrompt && (
                <div className="mb-4 space-y-3">
                  <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
                    <AlertCircle className="size-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="text-blue-800 dark:text-blue-300">
                      Describe lo que necesitas para que la IA genere el
                      documento adecuado.
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ej: Contrato de arrendamiento para un apartamento en Valdivia, duración de 2 años, con fianza de 2 meses..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="flex-grow resize-none h-20"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAiPrompt(false)}
                      size="sm"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAiPromptSubmit}
                      size="sm"
                      disabled={!aiPrompt.trim() || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          <span>Generando...</span>
                        </>
                      ) : (
                        "Generar documento"
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="mb-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Vista previa</TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="mt-0">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
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
                </TabsContent>
                <TabsContent value="preview" className="mt-0">
                  <div className="min-h-80 border rounded-md p-4 whitespace-pre-wrap">
                    {form.getValues("content") ? (
                      form.getValues("content")
                    ) : (
                      <span className="text-muted-foreground italic">
                        Sin contenido para previsualizar
                      </span>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {isAiAssisted && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  >
                    <Wand2 className="size-3" />
                    <span>Generado con IA</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Este contenido fue creado utilizando inteligencia artificial
                  </span>
                </div>
              )}
            </div>
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
                      <SelectItem value="en_revision">En revisión</SelectItem>
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
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving || isLoading}>
                {isSaving ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <span>
                    {isEditing ? "Actualizar documento" : "Crear documento"}
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
