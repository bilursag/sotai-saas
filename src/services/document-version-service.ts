/* eslint-disable @typescript-eslint/no-explicit-any */
interface DocumentVersion {
  id: string;
  documentId: string;
  versionNumber: number;
  content: string;
  description: string;
  createdAt: string;
  createdBy?: string;
  aiGenerated: boolean;
}

export const getDocumentVersions = async (
  documentId: string
): Promise<DocumentVersion[]> => {
  try {
    const response = await fetch(`/api/documents/${documentId}/versions`);

    if (!response.ok) {
      throw new Error(`Error al obtener versiones: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error al obtener versiones del documento:", error);
    throw error;
  }
};

export const getDocumentVersion = async (
  documentId: string,
  versionId: string
): Promise<DocumentVersion> => {
  try {
    const response = await fetch(
      `/api/documents/${documentId}/versions/${versionId}`
    );

    if (!response.ok) {
      throw new Error(`Error al obtener versión: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error al obtener versión específica:", error);
    throw error;
  }
};

export const createDocumentVersion = async (
  documentId: string,
  versionData: {
    content: string;
    description: string;
    aiGenerated?: boolean;
  }
): Promise<DocumentVersion> => {
  try {
    const response = await fetch(`/api/documents/${documentId}/versions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(versionData),
    });

    if (!response.ok) {
      throw new Error(`Error al crear versión: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error al crear nueva versión:", error);
    throw error;
  }
};

export const restoreDocumentVersion = async (
  documentId: string,
  versionId: string
): Promise<any> => {
  try {
    const response = await fetch(
      `/api/documents/${documentId}/versions/${versionId}/restore`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`Error al restaurar versión: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error al restaurar versión:", error);
    throw error;
  }
};

export const compareDocumentVersions = async (
  documentId: string,
  versionIdA: string,
  versionIdB: string
): Promise<any> => {
  try {
    const response = await fetch(
      `/api/documents/${documentId}/versions/compare?versionA=${versionIdA}&versionB=${versionIdB}`
    );

    if (!response.ok) {
      throw new Error(`Error al comparar versiones: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error al comparar versiones:", error);
    throw error;
  }
};
