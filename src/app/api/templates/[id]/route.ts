import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const id = context.params.id;

    if (!id) {
      return NextResponse.json(
        { error: "ID de plantilla no proporcionado" },
        { status: 400 }
      );
    }

    const template = await prisma.template.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });

    if (!template) {
      return NextResponse.json(
        { error: "Plantilla no encontrada" },
        { status: 404 }
      );
    }

    await prisma.template.update({
      where: { id },
      data: {
        usageCount: { increment: 1 },
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error("Error al obtener plantilla:", error);
    return NextResponse.json(
      { error: "Error al obtener plantilla" },
      { status: 500 }
    );
  }
}
