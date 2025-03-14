import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { diffLines, Change } from "diff"

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(request.url);

    const versionA = searchParams.get("versionA");
    const versionB = searchParams.get("versionB");

    if (!versionA || !versionB) {
      return NextResponse.json(
        { error: "Se requieren dos IDs de versión para comparar" },
        { status: 400 }
      );
    }

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

    const [versionAData, versionBData] = await Promise.all([
      prisma.documentVersion.findUnique({
        where: { id: versionA },
      }),
      prisma.documentVersion.findUnique({
        where: { id: versionB },
      }),
    ]);

    if (!versionAData || !versionBData) {
      return NextResponse.json(
        { error: "Una o ambas versiones no encontradas" },
        { status: 404 }
      );
    }

    if (
      versionAData.documentId !== params.id ||
      versionBData.documentId !== params.id
    ) {
      return NextResponse.json(
        { error: "Las versiones no pertenecen al documento especificado" },
        { status: 400 }
      );
    }

    const differences = diffLines(versionAData.content, versionBData.content);

    const diffResult = differences.map((part: Change) => ({
      value: part.value,
      added: part.added || false,
      removed: part.removed || false,
    }));

    const stats = {
      additions: differences.filter((part) => part.added).length,
      deletions: differences.filter((part) => part.removed).length,
      changes: differences.length - 1, // Restamos 1 para no contar partes sin cambios
      versionA: {
        number: versionAData.versionNumber,
        date: versionAData.createdAt,
      },
      versionB: {
        number: versionBData.versionNumber,
        date: versionBData.createdAt,
      },
    };

    return NextResponse.json({
      differences: diffResult,
      stats,
      versionA: versionAData,
      versionB: versionBData,
    });
  } catch (error) {
    console.error("Error al comparar versiones:", error);
    return NextResponse.json(
      { error: "Error al comparar versiones" },
      { status: 500 }
    );
  }
}
