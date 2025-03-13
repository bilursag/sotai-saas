export const getAllTemplates = async (category?: string) => {
  const url = category
    ? `/api/templates?category=${encodeURIComponent(category)}`
    : "/api/templates";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al obtener plantillas: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error en getAllTemplates:", error);
    throw error;
  }
};

export const getTemplate = async (id: string) => {
  console.log(`getTemplate: Obteniendo plantilla con ID: ${id}`);

  try {
    const response = await fetch(`/api/templates/${id}`);

    if (!response.ok) {
      console.error(`Error al obtener plantilla. Status: ${response.status}`);
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    const data = await response.json();
    console.log("Datos de plantilla obtenidos:", data);
    return data;
  } catch (error) {
    console.error("Error en getTemplate:", error);
    throw error;
  }
};

export const createTemplate = async (templateData: unknown) => {
  try {
    const response = await fetch("/api/templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateData),
    });

    if (!response.ok) {
      throw new Error(`Error al crear plantilla: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error en createTemplate:", error);
    throw error;
  }
};
