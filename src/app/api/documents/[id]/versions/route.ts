import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      return NextResponse.json(
        { error: "No autorizado para acceder a este documento" },
        { status: 403 }
      );
    }

    const versions = await prisma.documentVersion.findMany({
      where: { documentId: params.id },
      orderBy: { versionNumber: "desc" },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error("Error al obtener versiones del documento:", error);
    return NextResponse.json(
      { error: "Error al obtener versiones" },
      { status: 500 }
    );
  }
}

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
        { error: "No autorizado para modificar este documento" },
        { status: 403 }
      );
    }

    const { content, description, aiGenerated = false } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Se requiere contenido para la versión" },
        { status: 400 }
      );
    }

    const latestVersion = await prisma.documentVersion.findFirst({
      where: { documentId: params.id },
      orderBy: { versionNumber: "desc" },
    });

    const versionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1;

    const newVersion = await prisma.documentVersion.create({
      data: {
        documentId: params.id,
        versionNumber,
        content,
        description: description || `Versión ${versionNumber}`,
        aiGenerated,
      },
    });

    await prisma.document.update({
      where: { id: params.id },
      data: {
        content,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newVersion, { status: 201 });
  } catch (error) {
    console.error("Error al crear nueva versión:", error);
    return NextResponse.json(
      { error: "Error al crear versión" },
      { status: 500 }
    );
  }
}
