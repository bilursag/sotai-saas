export const generateContent = async (
  prompt: string,
  documentType?: string,
  isTemplate: boolean = false
) => {
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
    throw new Error(errorData.error || "Error al generar contenido con IA");
  }

  return response.json();
};
