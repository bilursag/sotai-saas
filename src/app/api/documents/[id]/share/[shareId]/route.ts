/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, context: any) {
  try {
    const { userId } = await auth();
    const id = context.params.id;
    const shareId = context.params.shareId;

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
        {
          error:
            "No tienes permiso para modificar los accesos de este documento",
        },
        { status: 403 }
      );
    }

    const sharedDocument = await prisma.sharedDocument.findUnique({
      where: { id: shareId },
    });

    if (!sharedDocument) {
      return NextResponse.json(
        { error: "Registro de compartir no encontrado" },
        { status: 404 }
      );
    }

    if (sharedDocument.documentId !== id) {
      return NextResponse.json(
        { error: "El ID de compartir no pertenece a este documento" },
        { status: 400 }
      );
    }

    await prisma.sharedDocument.delete({
      where: { id: shareId },
    });

    return NextResponse.json({
      message: "Acceso compartido revocado correctamente",
    });
  } catch (error) {
    console.error("Error al revocar acceso compartido:", error);
    return NextResponse.json(
      { error: "Error al revocar acceso compartido" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: any) {
  try {
    const { userId } = await auth();
    const id = context.params.id;
    const shareId = context.params.shareId;

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
        {
          error:
            "No tienes permiso para modificar los accesos de este documento",
        },
        { status: 403 }
      );
    }

    const sharedDocument = await prisma.sharedDocument.findUnique({
      where: { id: shareId },
    });

    if (!sharedDocument) {
      return NextResponse.json(
        { error: "Registro de compartir no encontrado" },
        { status: 404 }
      );
    }

    if (sharedDocument.documentId !== id) {
      return NextResponse.json(
        { error: "El ID de compartir no pertenece a este documento" },
        { status: 400 }
      );
    }

    const { permission } = await request.json();

    if (!permission || (permission !== "view" && permission !== "edit")) {
      return NextResponse.json(
        { error: "Permiso inválido. Debe ser 'view' o 'edit'" },
        { status: 400 }
      );
    }

    const updatedShare = await prisma.sharedDocument.update({
      where: { id: shareId },
      data: { permission },
      include: {
        sharedWith: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Permiso actualizado correctamente",
      share: updatedShare,
    });
  } catch (error) {
    console.error("Error al actualizar permiso:", error);
    return NextResponse.json(
      { error: "Error al actualizar permiso" },
      { status: 500 }
    );
  }
}
