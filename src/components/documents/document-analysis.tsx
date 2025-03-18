/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  FileSearch,
  FileCheck,
  AlertTriangle,
  BrainCircuit,
  Loader2,
  LightbulbIcon,
  HelpCircle,
  Download,
} from "lucide-react";

import { analyzeDocumentWithClaude } from "@/services/claude-ai-service";

interface DocumentAnalysisProps {
  documentContent: string;
  documentTitle: string;
}

export function DocumentAnalysis({
  documentContent,
  documentTitle,
}: DocumentAnalysisProps) {
  const [activeTab, setActiveTab] = useState<
    "summary" | "key_points" | "legal_risks" | "suggestions"
  >("summary");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    summary?: string;
    key_points?: string;
    legal_risks?: string;
    suggestions?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (
    type: "summary" | "key_points" | "legal_risks" | "suggestions"
  ) => {
    if (analysisResults[type]) {
      setActiveTab(type);
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeDocumentWithClaude(documentContent, type);
      setAnalysisResults((prev) => ({
        ...prev,
        [type]: result.analysis,
      }));
      setActiveTab(type);
    } catch (err) {
      console.error(`Error al analizar documento (${type}):`, err);
      setError(
        err instanceof Error
          ? err.message
          : "Ha ocurrido un error al analizar el documento"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportAnalysisAsPDF = () => {
    console.log("Exportar análisis como PDF - función a implementar");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="size-5 text-primary" />
            <span>Análisis con Claude</span>
          </div>
          <Badge variant="outline">AI Powered</Badge>
        </CardTitle>
        <CardDescription>
          Análisis inteligente del documento &quot;{documentTitle}&quot; realizado por
          Claude
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger
              value="summary"
              onClick={() => handleAnalyze("summary")}
            >
              <FileSearch className="size-4 mr-2" />
              <span className="hidden sm:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger
              value="key_points"
              onClick={() => handleAnalyze("key_points")}
            >
              <FileCheck className="size-4 mr-2" />
              <span className="hidden sm:inline">Puntos Clave</span>
            </TabsTrigger>
            <TabsTrigger
              value="legal_risks"
              onClick={() => handleAnalyze("legal_risks")}
            >
              <AlertTriangle className="size-4 mr-2" />
              <span className="hidden sm:inline">Riesgos</span>
            </TabsTrigger>
            <TabsTrigger
              value="suggestions"
              onClick={() => handleAnalyze("suggestions")}
            >
              <LightbulbIcon className="size-4 mr-2" />
              <span className="hidden sm:inline">Sugerencias</span>
            </TabsTrigger>
          </TabsList>

          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="size-12 text-primary animate-spin mb-4" />
              <p className="text-lg font-medium">Analizando documento...</p>
              <p className="text-sm text-muted-foreground">
                Claude está evaluando el contenido del documento
              </p>
            </div>
          ) : (
            <>
              <TabsContent value="summary" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileSearch className="size-5" />
                      Resumen del documento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysisResults.summary ? (
                      <div className="prose dark:prose-invert max-w-full">
                        <div className="whitespace-pre-wrap">
                          {analysisResults.summary}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <HelpCircle className="size-12 text-muted-foreground opacity-50 mb-4" />
                        <p>
                          Haz clic en &quot;Analizar&quot; para generar un resumen del
                          documento
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => handleAnalyze("summary")}
                        >
                          Analizar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="key_points" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileCheck className="size-5" />
                      Puntos clave del documento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysisResults.key_points ? (
                      <div className="prose dark:prose-invert max-w-full">
                        <div className="whitespace-pre-wrap">
                          {analysisResults.key_points}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <HelpCircle className="size-12 text-muted-foreground opacity-50 mb-4" />
                        <p>
                          Haz clic en &quot;Analizar&quot; para identificar los puntos
                          clave del documento
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => handleAnalyze("key_points")}
                        >
                          Analizar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="legal_risks" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="size-5" />
                      Riesgos legales potenciales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysisResults.legal_risks ? (
                      <div className="prose dark:prose-invert max-w-full">
                        <div className="whitespace-pre-wrap">
                          {analysisResults.legal_risks}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <HelpCircle className="size-12 text-muted-foreground opacity-50 mb-4" />
                        <p>
                          Haz clic en &quot;Analizar&quot; para identificar posibles
                          riesgos legales
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => handleAnalyze("legal_risks")}
                        >
                          Analizar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suggestions" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LightbulbIcon className="size-5" />
                      Sugerencias de mejora
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysisResults.suggestions ? (
                      <div className="prose dark:prose-invert max-w-full">
                        <div className="whitespace-pre-wrap">
                          {analysisResults.suggestions}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <HelpCircle className="size-12 text-muted-foreground opacity-50 mb-4" />
                        <p>
                          Haz clic en &quot;Analizar&ldquo; para recibir sugerencias de
                          mejora
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => handleAnalyze("suggestions")}
                        >
                          Analizar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={exportAnalysisAsPDF}
        >
          <Download className="size-4" />
          <span>Exportar análisis</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
