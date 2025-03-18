/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, context: any) {
  try {
    const { userId } = await auth();
    const id = context.params.id;
    const versionId = context.params.versionId;

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
      return NextResponse.json(
        { error: "No autorizado para modificar este documento" },
        { status: 403 }
      );
    }

    const versionToRestore = await prisma.documentVersion.findUnique({
      where: {
        id: versionId,
        documentId: id,
      },
    });

    if (!versionToRestore) {
      return NextResponse.json(
        { error: "Versión no encontrada" },
        { status: 404 }
      );
    }

    const latestVersion = await prisma.documentVersion.findFirst({
      where: { documentId: id },
      orderBy: { versionNumber: "desc" },
    });

    const newVersionNumber = latestVersion
      ? latestVersion.versionNumber + 1
      : 1;

    const newVersion = await prisma.documentVersion.create({
      data: {
        documentId: id,
        versionNumber: newVersionNumber,
        content: versionToRestore.content,
        description: `Restaurado a versión ${versionToRestore.versionNumber}`,
        aiGenerated: versionToRestore.aiGenerated,
      },
    });

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        content: versionToRestore.content,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Documento restaurado correctamente",
      document: updatedDocument,
      version: newVersion,
    });
  } catch (error) {
    console.error("Error al restaurar versión:", error);
    return NextResponse.json(
      { error: "Error al restaurar versión" },
      { status: 500 }
    );
  }
}
