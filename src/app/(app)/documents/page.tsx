// src/app/documents/page.tsx
"use client";

import {
  DocumentsList,
  DocumentForm,
  DocumentDetails,
} from "@/components/documents";
import { useSearchParams } from "next/navigation";

export default function DocumentsPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "list";
  const id = searchParams.get("id");
  const templateId = searchParams.get("templateId");

  // Determinar qué componente mostrar basado en el parámetro 'view'
  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-6">
      {view === "list" && (
        <>
          <h1 className="text-3xl font-bold mb-6">Mis Documentos</h1>
          <DocumentsList
            onViewDetails={(docId) => {}}
            onEditDocument={(docId) => {}}
          />
        </>
      )}

      {view === "new" && (
        <>
          <h1 className="text-3xl font-bold mb-6">Nuevo Documento</h1>
          <DocumentForm
            id={null}
            isEditing={false}
            templateId={templateId ? parseInt(templateId) : undefined}
          />
        </>
      )}

      {view === "edit" && id && (
        <>
          <h1 className="text-3xl font-bold mb-6">Editar Documento</h1>
          <DocumentForm id={id} isEditing={true} />
        </>
      )}

      {view === "details" && id && (
        <>
          <h1 className="text-3xl font-bold mb-6">Detalles del Documento</h1>
          <DocumentDetails id={id} onEdit={() => {}} />
        </>
      )}
    </div>
  );
}
