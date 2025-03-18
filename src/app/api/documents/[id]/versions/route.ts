/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, context: any) {
  try {
    const { userId } = await auth();
    const id = context.params.id;

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
      where: { id },
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
          documentId: id,
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
        documentId: id,
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
