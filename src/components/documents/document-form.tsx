/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
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
import { X, Wand2, Loader2, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const documentTypes = [
  { value: "inmobiliario", label: "Inmobiliario" },
  { value: "corporativo", label: "Corporativo" },
  { value: "familiar", label: "Familiar" },
  { value: "comercial", label: "Comercial" },
  { value: "laboral", label: "Laboral" },
  { value: "litigios", label: "Litigios" },
];

const getDocumentById = (id: string) => {
  return {
    id: "doc-1",
    title: "Contrato de arrendamiento",
    description:
      "Contrato de arrendamiento para propiedad residencial ubicada en Madrid",
    type: "inmobiliario",
    content:
      "Este contrato de arrendamiento se celebra el día [FECHA] entre [ARRENDADOR] y [ARRENDATARIO]...",
    status: "borrador",
    tags: ["Alquiler", "Residencial"],
  };
};

const getTemplateById = (id: number) => {
  const templates = {
    1: {
      id: 1,
      title: "Contrato de trabajo",
      category: "Laboral",
      content:
        "CONTRATO DE TRABAJO\n\nEn [CIUDAD], a [FECHA], entre [EMPRESA], representada por don/doña [NOMBRE], y don/doña [TRABAJADOR], se ha convenido el siguiente contrato de trabajo...",
      tags: ["Laboral", "Contrato"],
    },
    2: {
      id: 2,
      title: "NDA estándar",
      category: "Corporativo",
      content:
        'ACUERDO DE CONFIDENCIALIDAD\n\nEntre [PARTE 1] y [PARTE 2], en adelante denominadas "las partes"...',
      tags: ["Confidencialidad", "NDA"],
    },
    3: {
      id: 3,
      title: "Contrato de compraventa",
      category: "Inmobiliario",
      content:
        "CONTRATO DE COMPRAVENTA\n\nEn [CIUDAD], a [FECHA], de una parte [VENDEDOR], y de otra parte [COMPRADOR], convienen en celebrar el presente contrato de compraventa...",
      tags: ["Inmobiliario", "Compraventa"],
    },
    4: {
      id: 4,
      title: "Reclamación administrativa",
      category: "Administrativo",
      content:
        "RECLAMACIÓN ADMINISTRATIVA\n\nA LA ADMINISTRACIÓN [NOMBRE DE LA ADMINISTRACIÓN]\n\nD./Dña. [NOMBRE], mayor de edad, con DNI nº [NÚMERO], y domicilio en [DIRECCIÓN], por medio del presente escrito formula RECLAMACIÓN ADMINISTRATIVA...",
      tags: ["Administrativo", "Reclamación"],
    },
  };

  return templates[id as keyof typeof templates];
};

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
  templateId?: number;
}

export function DocumentForm({ id, isEditing, templateId }: DocumentFormProps) {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const [isAiAssisted, setIsAiAssisted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);

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
    if (isEditing && id) {
      const document = getDocumentById(id);
      form.reset({
        title: document.title,
        description: document.description,
        type: document.type,
        content: document.content,
        status: document.status as "borrador" | "en_revision" | "completado",
      });
      setTags(document.tags);
    } else if (templateId && !isTemplateLoaded) {
      const template = getTemplateById(templateId);
      if (template) {
        form.reset({
          title: `Nuevo documento basado en ${template.title}`,
          description: "",
          type: template.category.toLowerCase(),
          content: template.content || "",
          status: "borrador",
        });
        if (template.tags && template.tags.length > 0) {
          setTags(template.tags);
        }
        setIsTemplateLoaded(true);
        setIsAiAssisted(true);
      }
    }
  }, [isEditing, id, templateId, form, isTemplateLoaded]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);

    const formData = {
      ...values,
      tags,
      isAiAssisted,
    };

    console.log("Formulario enviado:", formData);
    setTimeout(() => {
      setIsSaving(false);
      router.push("/documents?view=list");
    }, 1500);
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

  const handleAiPromptSubmit = () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);

    console.log("Generando con IA utilizando prompt:", aiPrompt);

    setTimeout(() => {
      const documentType = form.getValues("type");
      let generatedContent = "";

      if (documentType === "inmobiliario") {
        generatedContent = `Este contrato de arrendamiento se celebra el día [FECHA] entre [ARRENDADOR] y [ARRENDATARIO]...

CLÁUSULA PRIMERA: OBJETO DEL CONTRATO
El ARRENDADOR da en arrendamiento al ARRENDATARIO, quien a su vez lo recibe en tal calidad, el inmueble ubicado en [DIRECCIÓN COMPLETA], con una superficie de [SUPERFICIE] metros cuadrados.

CLÁUSULA SEGUNDA: DURACIÓN DEL CONTRATO
El plazo de duración del presente contrato es de [DURACIÓN] años, contados a partir de la fecha de firma del mismo.

CLÁUSULA TERCERA: RENTA
El ARRENDATARIO se obliga a pagar al ARRENDADOR, en concepto de renta mensual, la cantidad de [IMPORTE] euros, que deberá ser abonada dentro de los primeros cinco días de cada mes.

CLÁUSULA CUARTA: FIANZA
A la firma del presente contrato, el ARRENDATARIO entrega al ARRENDADOR la cantidad de [IMPORTE] euros, equivalente a [NÚMERO] mensualidades de renta, en concepto de fianza.`;
      } else if (documentType === "laboral") {
        generatedContent = `CONTRATO DE TRABAJO

En [CIUDAD], a [FECHA], entre [NOMBRE EMPRESA], RUT [RUT EMPRESA], representada por don/doña [NOMBRE REPRESENTANTE], en adelante "el empleador", y don/doña [NOMBRE TRABAJADOR], RUT [RUT TRABAJADOR], en adelante "el trabajador", se ha convenido el siguiente contrato de trabajo:

PRIMERO: El trabajador se compromete y obliga a prestar servicios como [CARGO] en las dependencias de [UBICACIÓN], pudiendo ser trasladado a otros lugares de trabajo, según las necesidades de la empresa.

SEGUNDO: La jornada de trabajo será de [N° HORAS] horas semanales distribuidas de [DÍA] a [DÍA], de [HORA INICIO] a [HORA TÉRMINO] horas, con un descanso de [TIEMPO] para colación.

TERCERO: El empleador pagará al trabajador una remuneración mensual de [MONTO] por mes calendario.`;
      } else {
        generatedContent = `DOCUMENTO LEGAL

Este documento se crea el día [FECHA] entre las partes [PARTE 1] y [PARTE 2].

PRIMERA SECCIÓN: DEFINICIONES
A efectos de este documento, los siguientes términos tendrán los significados que a continuación se indican:
- Término 1: [Definición]
- Término 2: [Definición]

SEGUNDA SECCIÓN: OBJETO
El presente documento tiene por objeto [DESCRIBIR OBJETO DEL DOCUMENTO]

TERCERA SECCIÓN: CONDICIONES
Las partes acuerdan las siguientes condiciones:
1. [Condición 1]
2. [Condición 2]
3. [Condición 3]`;
      }

      // Actualizar el formulario con el contenido generado
      form.setValue("content", generatedContent);
      setIsAiAssisted(true);
      setIsGenerating(false);
      setShowAiPrompt(false);
      setAiPrompt("");
    }, 2000);
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

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {isEditing
            ? "Editar documento"
            : templateId
            ? "Nuevo documento desde plantilla"
            : "Crear nuevo documento"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Modifica los detalles del documento existente"
            : templateId
            ? "Personaliza este documento basado en la plantilla seleccionada"
            : "Completa el formulario para crear un nuevo documento legal"}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  <Alert
                    className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900"
                  >
                    <AlertCircle className="size-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="text-blue-800 dark:text-blue-300">
                      Describe lo que necesitas para que la IA genere el
                      documento adecuado.
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ej: Contrato de arrendamiento para un apartamento en Madrid, duración de 2 años, con fianza de 2 meses..."
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
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
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
