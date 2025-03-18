/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface DocumentInfo {
  title: string;
  type: string;
  description?: string;
  content: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: { id: string; name: string }[] | string[];
  author?: string;
}

export const exportToPdf = (document: DocumentInfo) => {
  const pdf = new jsPDF();
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const splitTextToSize = (text: string, maxWidth: number) => {
    return pdf.splitTextToSize(text, maxWidth);
  };

  const titleFont = "helvetica";
  const bodyFont = "helvetica";
  const textColor = "#000000";
  const titleSize = 16;
  const subtitleSize = 12;
  const bodySize = 10;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  pdf.setFont(titleFont, "bold");
  pdf.setTextColor(textColor);
  pdf.setFontSize(titleSize);
  pdf.text(document.title, margin, 20);

  pdf.setFont(bodyFont, "normal");
  pdf.setFontSize(bodySize);

  pdf.text(`Tipo: ${document.type}`, margin, 30);
  pdf.text(`Estado: ${document.status}`, margin, 35);

  pdf.text(`Creado: ${formatDate(document.createdAt)}`, margin, 40);
  pdf.text(
    `Última modificación: ${formatDate(document.updatedAt)}`,
    margin,
    45
  );

  if (document.author) {
    pdf.text(`Autor: ${document.author}`, margin, 50);
  }

  if (document.tags && document.tags.length > 0) {
    const tagsText =
      "Etiquetas: " +
      document.tags
        .map((tag) => (typeof tag === "string" ? tag : tag.name))
        .join(", ");

    const wrappedTags = splitTextToSize(tagsText, contentWidth);
    pdf.text(wrappedTags, margin, 55);
  }

  if (document.description) {
    const descriptionTitle = "Descripción:";
    pdf.setFont(bodyFont, "bold");
    pdf.text(descriptionTitle, margin, 65);

    pdf.setFont(bodyFont, "normal");
    const wrappedDescription = splitTextToSize(
      document.description,
      contentWidth
    );
    pdf.text(wrappedDescription, margin, 70);
  }

  pdf.setFont(bodyFont, "bold");
  pdf.setFontSize(subtitleSize);
  pdf.text("CONTENIDO DEL DOCUMENTO", margin, 85);

  pdf.setFont(bodyFont, "normal");
  pdf.setFontSize(bodySize);

  const contentY = 95;
  const wrappedContent = splitTextToSize(document.content, contentWidth);

  pdf.text(wrappedContent, margin, contentY);

  const exportDate = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setFont(bodyFont, "italic");
    pdf.text(
      `Documento exportado el ${exportDate} - Página ${i} de ${totalPages}`,
      margin,
      pdf.internal.pageSize.getHeight() - 10
    );
  }

  pdf.save(`${document.title.replace(/\s+/g, "_")}.pdf`);

  return true;
};
