import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
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

    const documents = await prisma.document.findMany({
      where: { userId: user.id },
      include: {
        tags: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    return NextResponse.json(
      { error: "Error al obtener documentos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const { title, description, content, type, status, aiGenerated, tags } =
      await request.json();

    const tagObjects = [];
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
        tagObjects.push({ id: tag.id });
      }
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        content,
        type,
        status: status || "borrador",
        aiGenerated: aiGenerated || false,
        userId: user.id,
        tags: {
          connect: tagObjects,
        },
        versions: {
          create: {
            versionNumber: 1,
            content,
            description: "Versión inicial",
            aiGenerated: aiGenerated || false,
          },
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Error al crear documento:", error);
    return NextResponse.json(
      { error: "Error al crear documento" },
      { status: 500 }
    );
  }
}
