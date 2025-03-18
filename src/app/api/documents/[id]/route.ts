/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: any
) {
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
      include: {
        tags: true,
        versions: {
          orderBy: { versionNumber: "desc" },
        },
        comments: {
          orderBy: { createdAt: "desc" },
        },
      },
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
          { error: "No autorizado para ver este documento" },
          { status: 403 }
        );
      }

      return NextResponse.json({
        ...document,
        isShared: true,
        permission: sharedAccess.permission,
      });
    }

    return NextResponse.json({
      ...document,
      isOwner: true,
    });
  } catch (error) {
    console.error("Error al obtener documento:", error);
    return NextResponse.json(
      { error: "Error al obtener documento" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: any) {
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

    const existingDocument = await prisma.document.findUnique({
      where: { id },
      include: {
        versions: {
          orderBy: { versionNumber: "desc" },
          take: 1,
        },
      },
    });

    if (!existingDocument) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    if (existingDocument.userId !== user.id) {
      const sharedAccess = await prisma.sharedDocument.findFirst({
        where: {
          documentId: id,
          sharedWithId: user.id,
        },
      });

      if (!sharedAccess || sharedAccess.permission !== "edit") {
        return NextResponse.json(
          { error: "No tienes permiso para editar este documento" },
          { status: 403 }
        );
      }
    }

    const { title, description, content, type, status, aiGenerated, tags } =
      await request.json();

    let tagObjects = [];
    if (tags && tags.length > 0) {
      tagObjects = await Promise.all(
        tags.map(async (tagName: string) => {
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
          return { id: tag.id };
        })
      );
    }

    let nextVersionNumber = 1;
    let createNewVersion = false;

    if (existingDocument.versions.length > 0) {
      nextVersionNumber = existingDocument.versions[0].versionNumber + 1;
      createNewVersion = existingDocument.versions[0].content !== content;
    }

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        title,
        description,
        content,
        type,
        status,
        aiGenerated,
        tags: {
          set: [],
          connect: tagObjects,
        },
        ...(createNewVersion && {
          versions: {
            create: {
              versionNumber: nextVersionNumber,
              content,
              description: `Versión ${nextVersionNumber}`,
              aiGenerated,
            },
          },
        }),
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error("Error al actualizar documento:", error);
    return NextResponse.json(
      { error: "Error al actualizar documento" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: any) {
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
      return NextResponse.json(
        { error: "No tienes permiso para eliminar este documento" },
        { status: 403 }
      );
    }

    await prisma.document.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Documento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar documento:", error);
    return NextResponse.json(
      { error: "Error al eliminar documento" },
      { status: 500 }
    );
  }
}
