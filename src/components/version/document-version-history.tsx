/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  History,
  RotateCcw,
  AlertTriangle,
  Loader2,
  Eye,
  Wand2,
  GitCompare,
  FileCheck,
} from "lucide-react";

import {
  getDocumentVersions,
  restoreDocumentVersion,
  compareDocumentVersions,
} from "@/services/document-version-service";

interface Version {
  id: string;
  documentId: string;
  versionNumber: number;
  description: string;
  createdAt: string;
  aiGenerated: boolean;
  content: string;
}

interface DocumentVersionHistoryProps {
  documentId: string;
  onVersionChange?: (versionId: string, content: string) => void;
  currentContent?: string;
}

export function DocumentVersionHistory({
  documentId,
  onVersionChange,
}: DocumentVersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVersion, setActiveVersion] = useState<Version | null>(null);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [versionToCompare, setVersionToCompare] = useState<string>("");
  const [compareResult, setCompareResult] = useState<any>(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    const loadVersions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const versionsData = await getDocumentVersions(documentId);
        setVersions(versionsData);

        if (versionsData.length > 0) {
          setActiveVersion(versionsData[0]);
        }
      } catch (err) {
        console.error("Error al cargar historial de versiones:", err);
        setError("No se pudo cargar el historial de versiones");
      } finally {
        setIsLoading(false);
      }
    };

    loadVersions();
  }, [documentId]);

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

  const handlePreviewVersion = (version: Version) => {
    setActiveVersion(version);
    if (onVersionChange) {
      onVersionChange(version.id, version.content);
    }
  };

  const handleRestoreVersion = async () => {
    if (!activeVersion) return;

    try {
      setIsRestoring(true);

      await restoreDocumentVersion(documentId, activeVersion.id);

      const updatedVersions = await getDocumentVersions(documentId);
      setVersions(updatedVersions);

      if (updatedVersions.length > 0) {
        setActiveVersion(updatedVersions[0]);
        if (onVersionChange) {
          onVersionChange(updatedVersions[0].id, updatedVersions[0].content);
        }
      }

      setShowRestoreDialog(false);
    } catch (err) {
      console.error("Error al restaurar versión:", err);
      setError("No se pudo restaurar la versión seleccionada");
    } finally {
      setIsRestoring(false);
    }
  };

  const handleCompareVersions = async () => {
    if (!activeVersion || !versionToCompare) return;

    try {
      setIsComparing(true);

      const result = await compareDocumentVersions(
        documentId,
        activeVersion.id,
        versionToCompare
      );

      setCompareResult(result);
      setCompareMode(true);
    } catch (err) {
      console.error("Error al comparar versiones:", err);
      setError("No se pudo comparar las versiones seleccionadas");
    } finally {
      setIsComparing(false);
      setShowCompareDialog(false);
    }
  };

  const handleExitCompareMode = () => {
    setCompareMode(false);
    setCompareResult(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="size-10 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">
            Cargando historial de versiones...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {compareMode ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="size-5" />
                <span>Comparación de versiones</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExitCompareMode}
              >
                Volver al historial
              </Button>
            </CardTitle>
            <CardDescription>
              {compareResult && (
                <>
                  Comparando versión {compareResult.versionA.versionNumber} con
                  versión {compareResult.versionB.versionNumber}
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {compareResult && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Card className="bg-muted/30">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Cambios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {compareResult.stats.changes}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Diferencias totales
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-900/20">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm text-green-700 dark:text-green-300">
                        Adiciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {compareResult.stats.additions}
                      </div>
                      <p className="text-xs text-green-600/60 dark:text-green-300/60">
                        Líneas añadidas
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 dark:bg-red-900/20">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm text-red-700 dark:text-red-300">
                        Eliminaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                        {compareResult.stats.deletions}
                      </div>
                      <p className="text-xs text-red-600/60 dark:text-red-300/60">
                        Líneas eliminadas
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-3 border-b">
                    <h3 className="font-medium">Diferencias del documento</h3>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {compareResult.differences.map(
                      (part: any, index: number) => (
                        <pre
                          key={index}
                          className={`p-1 ${
                            part.added
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                              : part.removed
                              ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                              : ""
                          }`}
                        >
                          {part.value}
                        </pre>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="size-5" />
                <span>Historial de versiones</span>
              </div>
              {versions.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCompareDialog(true)}
                >
                  <GitCompare className="size-4 mr-2" />
                  Comparar versiones
                </Button>
              )}
            </CardTitle>
            <CardDescription>
              {versions.length}{" "}
              {versions.length === 1 ? "versión" : "versiones"} disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {versions.length === 0 ? (
              <div className="text-center py-8">
                <History className="size-16 mx-auto text-muted-foreground mb-4 opacity-40" />
                <h3 className="text-lg font-medium mb-2">Sin historial</h3>
                <p className="text-muted-foreground">
                  Este documento no tiene versiones anteriores.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {versions.map((version, index) => (
                  <div key={version.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          activeVersion?.id === version.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {version.versionNumber}
                      </div>
                      {index < versions.length - 1 && (
                        <div className="w-0.5 grow bg-muted-foreground/20 my-1"></div>
                      )}
                    </div>
                    <div className="space-y-1 pb-4 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">
                            Versión {version.versionNumber}
                          </h4>
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
                        {activeVersion?.id === version.id && (
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary"
                          >
                            <FileCheck className="size-3 mr-1" />
                            Activa
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {version.description}
                      </p>
                      <div className="pt-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewVersion(version)}
                        >
                          <Eye className="size-4 mr-1" />
                          {activeVersion?.id === version.id
                            ? "Actual"
                            : "Ver versión"}
                        </Button>
                        {activeVersion?.id !== version.id && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setActiveVersion(version);
                              setShowRestoreDialog(true);
                            }}
                          >
                            <RotateCcw className="size-4 mr-1" />
                            Restaurar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Restaurar versión</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas restaurar el documento a la versión{" "}
              {activeVersion?.versionNumber}? Esta acción creará una nueva
              versión basada en la seleccionada.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowRestoreDialog(false)}
              disabled={isRestoring}
            >
              Cancelar
            </Button>
            <Button onClick={handleRestoreVersion} disabled={isRestoring}>
              {isRestoring ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  <span>Restaurando...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="size-4 mr-2" />
                  <span>Restaurar versión</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Comparar versiones</DialogTitle>
            <DialogDescription>
              Selecciona la versión con la que deseas comparar la versión{" "}
              {activeVersion?.versionNumber}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select
              value={versionToCompare}
              onValueChange={setVersionToCompare}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una versión" />
              </SelectTrigger>
              <SelectContent>
                {versions
                  .filter((v) => v.id !== activeVersion?.id)
                  .map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      Versión {version.versionNumber} (
                      {formatDate(version.createdAt)})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowCompareDialog(false)}
              disabled={isComparing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCompareVersions}
              disabled={isComparing || !versionToCompare}
            >
              {isComparing ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  <span>Comparando...</span>
                </>
              ) : (
                <>
                  <GitCompare className="size-4 mr-2" />
                  <span>Comparar</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
