export const generateContentWithClaude = async (
  prompt: string,
  documentType?: string,
  isTemplate: boolean = false
) => {
  try {
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
      throw new Error(
        errorData.error || "Error al generar contenido con Claude"
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error en el servicio de Claude:", error);
    throw error;
  }
};

export const improveContentWithClaude = async (
  originalContent: string,
  instructions: string
) => {
  try {
    const response = await fetch("/api/ai/improve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: originalContent,
        instructions,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Error al mejorar contenido con Claude"
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error en el servicio de mejora con Claude:", error);
    throw error;
  }
};

export const analyzeDocumentWithClaude = async (
  documentContent: string,
  analysisType:
    | "summary"
    | "key_points"
    | "legal_risks"
    | "suggestions" = "summary"
) => {
  try {
    const response = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: documentContent,
        analysisType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Error al analizar documento con Claude"
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error en el análisis con Claude:", error);
    throw error;
  }
};
