interface DocumentData {
  title: string;
  content: string;
}

export const getAllDocuments = async () => {
  const response = await fetch("/api/documents");
  if (!response.ok) throw new Error("Error al obtener documentos");
  return response.json();
};

export const getDocument = async (id: string) => {
  const response = await fetch(`/api/documents/${id}`);
  if (!response.ok) throw new Error("Error al obtener documento");
  return response.json();
};

export const createDocument = async (documentData: DocumentData) => {
  const response = await fetch("/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData),
  });
  if (!response.ok) throw new Error("Error al crear documento");
  return response.json();
};

export const updateDocument = async (
  id: string,
  documentData: DocumentData
) => {
  const response = await fetch(`/api/documents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData),
  });
  if (!response.ok) throw new Error("Error al actualizar documento");
  return response.json();
};

export const deleteDocument = async (id: string) => {
  const response = await fetch(`/api/documents/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar documento");
  return response.json();
};
