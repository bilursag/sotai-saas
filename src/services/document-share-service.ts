/* eslint-disable @typescript-eslint/no-explicit-any */
interface ShareData {
  email: string;
  permission: "view" | "edit";
}

interface SharedUser {
  id: string;
  email: string;
  name?: string;
  permission: string;
  shareId: string;
}

export const shareDocumentWithUser = async (
  documentId: string,
  shareData: ShareData
): Promise<any> => {
  try {
    const response = await fetch(`/api/documents/${documentId}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shareData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al compartir documento");
    }

    return response.json();
  } catch (error) {
    console.error("Error en el servicio de compartir documento:", error);
    throw error;
  }
};

export const getDocumentSharedUsers = async (
  documentId: string
): Promise<SharedUser[]> => {
  try {
    const response = await fetch(`/api/documents/${documentId}/share`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Error al obtener usuarios compartidos"
      );
    }

    const sharedData = await response.json();

    return sharedData.map((item: any) => ({
      id: item.sharedWith.id,
      email: item.sharedWith.email,
      name: item.sharedWith.name,
      permission: item.permission,
      shareId: item.id,
    }));
  } catch (error) {
    console.error("Error al obtener usuarios compartidos:", error);
    throw error;
  }
};

export const updateDocumentSharePermission = async (
  documentId: string,
  shareId: string,
  permission: "view" | "edit"
): Promise<any> => {
  try {
    const response = await fetch(
      `/api/documents/${documentId}/share/${shareId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permission }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al actualizar permisos");
    }

    return response.json();
  } catch (error) {
    console.error("Error al actualizar permisos:", error);
    throw error;
  }
};

export const revokeDocumentShare = async (
  documentId: string,
  shareId: string
): Promise<any> => {
  try {
    const response = await fetch(
      `/api/documents/${documentId}/share/${shareId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al revocar acceso compartido");
    }

    return response.json();
  } catch (error) {
    console.error("Error al revocar acceso compartido:", error);
    throw error;
  }
};

export const getSharedWithMeDocuments = async (): Promise<any[]> => {
  try {
    const response = await fetch("/api/documents/shared");

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Error al obtener documentos compartidos"
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error al obtener documentos compartidos:", error);
    throw error;
  }
};
