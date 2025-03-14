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

    const { prompt, documentType, isTemplate = false } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Se requiere un prompt para generar contenido" },
        { status: 400 }
      );
    }

    let systemPrompt =
      "Eres un asistente legal experto que ayuda a generar documentos legales precisos y profesionales en español. ";

    if (documentType) {
      systemPrompt += `Especialízate en crear documentos de tipo ${documentType}. `;
    }

    if (isTemplate) {
      systemPrompt +=
        "Genera una plantilla que se pueda reutilizar para diferentes situaciones. Utiliza [VARIABLES] para los campos que deben personalizarse.";
    } else {
      systemPrompt +=
        "Genera un documento completo y detallado según las especificaciones proporcionadas.";
    }

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let generatedContent = "";
    for (const block of message.content) {
      if (block.type === "text") {
        generatedContent += block.text;
      }
    }

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error("Error al generar contenido con Claude:", error);
    return NextResponse.json(
      { error: "Error al generar contenido con IA" },
      { status: 500 }
    );
  }
}
