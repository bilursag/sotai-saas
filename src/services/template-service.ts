interface TemplateData {
  title: string;
  content: string;
}

export const getAllTemplates = async (category?: string) => {
  const url = category
    ? `/api/templates?category=${encodeURIComponent(category)}`
    : "/api/templates";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener plantillas");
  return response.json();
};

export const getTemplate = async (id: string) => {
  const response = await fetch(`/api/templates/${id}`);
  if (!response.ok) throw new Error("Error al obtener plantilla");
  return response.json();
};

export const createTemplate = async (templateData: TemplateData) => {
  const response = await fetch("/api/templates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(templateData),
  });
  if (!response.ok) throw new Error("Error al crear plantilla");
  return response.json();
};
