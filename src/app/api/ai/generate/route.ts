import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
      "Eres un asistente legal experto que ayuda a generar documentos legales precisos y profesionales. ";

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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const generatedContent = completion.choices[0].message.content;

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error("Error al generar contenido con IA:", error);
    return NextResponse.json(
      { error: "Error al generar contenido con IA" },
      { status: 500 }
    );
  }
}
