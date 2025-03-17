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

    const sharedDocuments = await prisma.sharedDocument.findMany({
      where: {
        sharedWithId: user.id,
      },
      include: {
        document: {
          include: {
            tags: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const formattedDocuments = sharedDocuments.map((share) => ({
      ...share.document,
      permission: share.permission,
      sharedBy: share.owner,
      shareId: share.id,
    }));

    return NextResponse.json(formattedDocuments);
  } catch (error) {
    console.error("Error al obtener documentos compartidos:", error);
    return NextResponse.json(
      { error: "Error al obtener documentos compartidos" },
      { status: 500 }
    );
  }
}
