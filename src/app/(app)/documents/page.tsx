"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DocumentsList } from "@/components/documents/document-list";
import { DocumentForm } from "@/components/documents/document-form";
import { DocumentDetails } from "@/components/documents/document-details";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DocumentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "list";
  const id = searchParams.get("id");

  console.log("DocumentsPage - Parámetros:", { view, id });

  const handleCreateNew = () => {
    router.push("/documents?view=new");
  };

  const handleViewList = () => {
    router.push("/documents?view=list");
  };

  const handleViewDetails = (documentId: string) => {
    router.push(`/documents?view=details&id=${documentId}`);
  };

  const handleEditDocument = (documentId: string) => {
    router.push(`/documents?view=edit&id=${documentId}`);
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {view === "list" && "Mis Documentos"}
          {view === "new" &&
            (searchParams.get("templateId")
              ? "Nuevo documento desde plantilla"
              : "Nuevo documento")}
          {view === "edit" && "Editar documento"}
          {view === "details" && "Detalles del documento"}
        </h1>
        {view === "list" && (
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="size-4" />
            <span>Nuevo documento</span>
          </Button>
        )}
        {(view === "details" || view === "new" || view === "edit") && (
          <Button variant="outline" onClick={handleViewList}>
            Volver a la lista
          </Button>
        )}
      </div>

      {view === "list" && (
        <DocumentsList
          onViewDetails={handleViewDetails}
          onEditDocument={handleEditDocument}
        />
      )}

      {(view === "new" || view === "edit") && (
        <DocumentForm id={id} isEditing={view === "edit"} />
      )}

      {view === "details" && id && (
        <DocumentDetails id={id} onEdit={() => handleEditDocument(id)} />
      )}
    </div>
  );
}
