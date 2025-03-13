"use client";

import { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToPdf } from "@/services/export-service";
import { toast } from "sonner"; // Asumiendo que usas sonner para notificaciones

interface PdfExportButtonProps {
  document: {
    title: string;
    type: string;
    description?: string;
    content: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: { id: string; name: string }[] | string[];
    author?: string;
  };
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
  iconOnly?: boolean;
}

export function PdfExportButton({
  document,
  variant = "outline",
  size = "default",
  className = "",
  label = "Descargar PDF",
  iconOnly = false,
}: PdfExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Exportamos el documento a PDF
      const success = exportToPdf(document);

      if (success) {
        setExported(true);
        toast.success("Documento exportado exitosamente");

        // Reseteamos el estado después de 2 segundos
        setTimeout(() => {
          setExported(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error al exportar documento:", error);
      toast.error("Ocurrió un error al exportar el documento");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? (
        <Loader2 className="size-4 animate-spin mr-2" />
      ) : exported ? (
        <Check className="size-4 mr-2" />
      ) : (
        <Download className="size-4 mr-2" />
      )}
      {!iconOnly &&
        (isExporting ? "Exportando..." : exported ? "Exportado" : label)}
    </Button>
  );
}
