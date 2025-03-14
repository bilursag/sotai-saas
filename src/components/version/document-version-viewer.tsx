/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Eye,
  History,
  FileText,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

import { DocumentVersionHistory } from "./document-version-history";

interface DocumentVersionViewerProps {
  documentId: string;
  currentContent: string;
  onBack: () => void;
}

export function DocumentVersionViewer({
  documentId,
  currentContent,
  onBack,
}: DocumentVersionViewerProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "history">("history");
  const [selectedVersionContent, setSelectedVersionContent] = useState<
    string | null
  >(null);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleVersionChange = async (versionId: string, content: string) => {
    setSelectedVersionContent(content);
    setActiveTab("preview");
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <History className="size-6" />
          Historial de versiones
        </h2>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="size-4 mr-2" />
          Volver al documento
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="size-4" />
            <span>Historial</span>
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="flex items-center gap-2"
            disabled={!selectedVersionContent}
          >
            <Eye className="size-4" />
            <span>Vista previa de versión</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-4">
          <DocumentVersionHistory
            documentId={documentId}
            onVersionChange={handleVersionChange}
            currentContent={currentContent}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                Vista previa de versión
              </CardTitle>
              <CardDescription>
                Visualización de la versión seleccionada
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="size-8 animate-spin text-primary" />
                </div>
              ) : selectedVersionContent ? (
                <div className="bg-muted/30 rounded-lg p-6 whitespace-pre-wrap font-serif max-h-[60vh] overflow-y-auto">
                  {selectedVersionContent}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Selecciona una versión para visualizarla
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end border-t pt-4">
              <Button variant="outline" onClick={() => setActiveTab("history")}>
                <History className="size-4 mr-2" />
                Volver al historial
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
