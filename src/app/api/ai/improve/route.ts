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

    const { content, instructions } = await request.json();

    if (!content || !instructions) {
      return NextResponse.json(
        { error: "Se requiere contenido e instrucciones" },
        { status: 400 }
      );
    }

    const systemPrompt = `Eres un asistente legal experto que ayuda a mejorar documentos legales en español de Chile. 
      Tu tarea es revisar el contenido proporcionado y mejorarlo según las instrucciones específicas del usuario.
      Mantén el formato profesional y asegúrate de que el documento resultante sea claro, preciso y legalmente sólido.`;

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Necesito que mejores el siguiente documento legal según estas instrucciones: "${instructions}"\n\nDocumento original:\n\n${content}`,
        },
      ],
      temperature: 0.5,
    });

    let improvedContent = "";
    
    for (const block of message.content) {
      if (block.type === "text") {
        improvedContent += block.text;
      }
    }

    return NextResponse.json({ content: improvedContent });
  } catch (error) {
    console.error("Error al mejorar contenido con Claude:", error);
    return NextResponse.json(
      { error: "Error al mejorar el documento" },
      { status: 500 }
    );
  }
}
