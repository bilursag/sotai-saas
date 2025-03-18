import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const whereCondition: { category?: string } = {};
    if (category) {
      whereCondition.category = category;
    }

    const templates = await prisma.template.findMany({
      where: whereCondition,
      include: {
        tags: true,
      },
      orderBy: { usageCount: "desc" },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error al obtener plantillas:", error);
    return NextResponse.json(
      { error: "Error al obtener plantillas" },
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

    const { title, description, content, category, tags } =
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

    const template = await prisma.template.create({
      data: {
        title,
        description,
        content,
        category,
        userId: user.id,
        tags: {
          connect: tagObjects,
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error("Error al crear plantilla:", error);
    return NextResponse.json(
      { error: "Error al crear plantilla" },
      { status: 500 }
    );
  }
}
