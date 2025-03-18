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
      where: { id: context.params.id },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    if (document.userId !== user.id) {
      const sharedAccess = await prisma.sharedDocument.findFirst({
        where: {
          documentId: context.params.id,
          sharedWithId: user.id,
        },
      });

      if (!sharedAccess) {
        return NextResponse.json(
          {
            error: "No tienes permiso para ver las versiones de este documento",
          },
          { status: 403 }
        );
      }
    }

    const versions = await prisma.documentVersion.findMany({
      where: {
        documentId: context.params.id,
      },
      orderBy: {
        versionNumber: "desc",
      },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error("Error al obtener versiones:", error);
    return NextResponse.json(
      { error: "Error al obtener versiones" },
      { status: 500 }
    );
  }
}
