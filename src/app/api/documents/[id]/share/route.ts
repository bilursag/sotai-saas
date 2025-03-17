import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
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
        { error: "No tienes permiso para compartir este documento" },
        { status: 403 }
      );
    }

    const { email, permission = "view" } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Se requiere email del usuario para compartir" },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Usuario destinatario no encontrado" },
        { status: 404 }
      );
    }

    if (targetUser.id === user.id) {
      return NextResponse.json(
        { error: "No puedes compartir un documento contigo mismo" },
        { status: 400 }
      );
    }

    const existingShare = await prisma.sharedDocument.findUnique({
      where: {
        documentId_sharedWithId: {
          documentId: params.id,
          sharedWithId: targetUser.id,
        },
      },
    });

    if (existingShare) {
      const updatedShare = await prisma.sharedDocument.update({
        where: { id: existingShare.id },
        data: { permission },
      });

      return NextResponse.json({
        message: "Permisos actualizados correctamente",
        share: updatedShare,
      });
    }

    const sharedDocument = await prisma.sharedDocument.create({
      data: {
        documentId: params.id,
        ownerId: user.id,
        sharedWithId: targetUser.id,
        permission,
      },
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

    return NextResponse.json(
      {
        message: "Documento compartido exitosamente",
        share: sharedDocument,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al compartir documento:", error);
    return NextResponse.json(
      { error: "Error al compartir documento" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
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
      const hasAccess = await prisma.sharedDocument.findFirst({
        where: {
          documentId: params.id,
          sharedWithId: user.id,
        },
      });

      if (!hasAccess) {
        return NextResponse.json(
          {
            error: "No tienes permiso para ver los detalles de este documento",
          },
          { status: 403 }
        );
      }
    }

    const sharedWith = await prisma.sharedDocument.findMany({
      where: {
        documentId: params.id,
      },
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

    return NextResponse.json(sharedWith);
  } catch (error) {
    console.error("Error al obtener usuarios compartidos:", error);
    return NextResponse.json(
      { error: "Error al obtener información de compartir" },
      { status: 500 }
    );
  }
}
