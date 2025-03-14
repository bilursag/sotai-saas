"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, AlertCircle, Copy, Check } from "lucide-react";

interface ClaudeAiGeneratorProps {
  onContentGenerated: (content: string) => void;
  documentType?: string;
}

export function ClaudeAiGenerator({
  onContentGenerated,
  documentType: initialDocumentType,
}: ClaudeAiGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [documentType, setDocumentType] = useState(initialDocumentType || "");
  const [isTemplate, setIsTemplate] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const documentTypes = [
    { value: "inmobiliario", label: "Inmobiliario" },
    { value: "corporativo", label: "Corporativo" },
    { value: "familiar", label: "Familiar" },
    { value: "comercial", label: "Comercial" },
    { value: "laboral", label: "Laboral" },
    { value: "litigios", label: "Litigios" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError(
        "Por favor, introduce una descripción para generar el documento"
      );
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          documentType,
          isTemplate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al generar contenido");
      }

      const data = await response.json();
      setGeneratedContent(data.content);
      onContentGenerated(data.content);
    } catch (err) {
      console.error("Error al generar con Claude:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Ha ocurrido un error al generar el documento"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="size-5 text-primary" />
          <span>Generar documento con Claude</span>
        </CardTitle>
        <CardDescription>
          Describe lo que necesitas y Claude generará un documento legal
          profesional basado en tu solicitud.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="documentType">Tipo de documento</Label>
          <Select
            value={documentType}
            onValueChange={(value) => setDocumentType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Cualquier tipo</SelectItem>
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="template-mode"
            checked={isTemplate}
            onCheckedChange={setIsTemplate}
          />
          <Label htmlFor="template-mode">Generar como plantilla</Label>
          <Badge className="ml-2" variant="outline">
            Usa [VARIABLES]
          </Badge>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt">Describe el documento que necesitas</Label>
          <Textarea
            id="prompt"
            placeholder="Ej: Necesito un contrato de arrendamiento para un apartamento en Madrid, con duración de 2 años y una renta mensual de 900€..."
            className="min-h-32 resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {generatedContent && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <Label>Contenido generado</Label>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleCopyContent}
              >
                {copied ? (
                  <>
                    <Check className="size-4" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    <span>Copiar</span>
                  </>
                )}
              </Button>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 max-h-80 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {generatedContent}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              <span>Generando contenido con Claude...</span>
            </>
          ) : (
            <>
              <Wand2 className="size-4 mr-2" />
              <span>Generar con Claude</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
