import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { content, analysisType = "summary" } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Se requiere contenido para analizar" },
        { status: 400 }
      );
    }

    let analysisPrompt = "";

    switch (analysisType) {
      case "summary":
        analysisPrompt = "Proporciona un resumen conciso del documento legal.";
        break;
      case "key_points":
        analysisPrompt =
          "Extrae y lista los puntos clave y cláusulas importantes del documento.";
        break;
      case "legal_risks":
        analysisPrompt =
          "Identifica posibles riesgos legales, ambigüedades o lagunas en el documento.";
        break;
      case "suggestions":
        analysisPrompt =
          "Sugiere mejoras para fortalecer el documento legalmente.";
        break;
      default:
        analysisPrompt =
          "Analiza este documento legal y proporciona información útil sobre su contenido.";
    }

    const systemPrompt = `Eres un asistente legal experto especializado en analizar documentos legales en español de Chile.
      Tu tarea es revisar cuidadosamente el documento proporcionado y ofrecer un análisis profesional según lo solicitado.
      Mantén un tono objetivo y profesional, y asegúrate de que tu análisis sea claro y preciso.`;

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `${analysisPrompt}\n\nDocumento a analizar:\n\n${content}`,
        },
      ],
      temperature: 0.3,
    });

    // Procesar correctamente la respuesta
    let analysis = "";

    // Iteramos a través de cada bloque de contenido
    for (const block of message.content) {
      // Si es un bloque de texto, lo agregamos a la respuesta
      if (block.type === "text") {
        analysis += block.text;
      }
    }

    return NextResponse.json({
      analysis,
      analysisType,
    });
  } catch (error) {
    console.error("Error al analizar documento con Claude:", error);
    return NextResponse.json(
      { error: "Error al analizar el documento" },
      { status: 500 }
    );
  }
}
