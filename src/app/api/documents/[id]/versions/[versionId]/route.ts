import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id: params.id },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    if (document.userId !== user.id) {
      return NextResponse.json(
        { error: "No autorizado para acceder a este documento" },
        { status: 403 }
      );
    }

    const version = await prisma.documentVersion.findUnique({
      where: {
        id: params.versionId,
        documentId: params.id,
      },
    });

    if (!version) {
      return NextResponse.json(
        { error: "Versión no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(version);
  } catch (error) {
    console.error("Error al obtener versión específica:", error);
    return NextResponse.json(
      { error: "Error al obtener versión" },
      { status: 500 }
    );
  }
}
