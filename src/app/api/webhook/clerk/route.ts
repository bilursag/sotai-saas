import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type UserCreatedEvent = {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: {
      id: string;
      email_address: string;
    }[];
    primary_email_address_id: string;
  };
  type: string;
};

export async function POST(request: Request) {
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: encabezados requeridos", { status: 400 });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Error: CLERK_WEBHOOK_SECRET no está configurado", {
      status: 500,
    });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const webhook = new Webhook(webhookSecret);

  try {
    webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (error) {
    console.error("Error al verificar webhook:", error);
    return new Response("Error: firma del webhook inválida", { status: 400 });
  }

  const { type, data } = payload as UserCreatedEvent;

  if (type === "user.created") {
    const emailObject = data.email_addresses.find(
      (email) => email.id === data.primary_email_address_id
    );

    if (emailObject) {
      await prisma.user.create({
        data: {
          clerkId: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: emailObject.email_address,
        },
      });
    }
  } else if (type === "user.updated") {
    const emailObject = data.email_addresses.find(
      (email) => email.id === data.primary_email_address_id
    );

    if (emailObject) {
      await prisma.user.update({
        where: { clerkId: data.id },
        data: {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: emailObject.email_address,
        },
      });
    }
  } else if (type === "user.deleted") {
    await prisma.user.delete({
      where: { clerkId: data.id },
    });
  }

  return NextResponse.json({ success: true });
}
