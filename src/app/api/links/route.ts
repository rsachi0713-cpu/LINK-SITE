import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyUserId } from "@/lib/signUser";

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    const signature = req.headers.get("x-signature");
    if (!userId || !signature || !verifyUserId(userId, signature)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, targetUrl, steps } = body;

    if (!title || !targetUrl || !steps || steps.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = Math.random().toString(36).substring(2, 8) + Date.now().toString(36).substring(4, 7);

    const link = await prisma.link.create({
      data: {
        title,
        description,
        targetUrl,
        slug,
        userId: userId as string,
        steps: {
          create: steps.map((step: any, index: number) => ({
            order: index + 1,
            title: step.title,
            url: step.url,
            waitTime: parseInt(step.waitTime) || 10,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, link });
  } catch (error) {
    console.error("Link creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    const signature = req.headers.get("x-signature");

    if (!userId || !signature || !verifyUserId(userId, signature)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const links = await prisma.link.findMany({
      where: { userId },
      include: { steps: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ links });
  } catch (error: any) {
    console.error("[API LINKS] Link fetching error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
