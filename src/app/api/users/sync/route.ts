import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    const emailAddress = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (!emailAddress) {
      return NextResponse.json(
        { error: "Correo electrónico no encontrado" },
        { status: 400 }
      );
    }
    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        name: `${user.firstName} ${user.lastName}`,
        email: emailAddress,
      },
      create: {
        clerkId: userId,
        name: `${user.firstName} ${user.lastName}`,
        email: emailAddress,
      },
    });

    return NextResponse.json({ success: true, user: dbUser });
  } catch (error) {
    console.error("Error al sincronizar usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
