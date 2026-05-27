import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, targetUrl, steps } = body;

    if (!title || !targetUrl || !steps || steps.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique slug
    const slug = Math.random().toString(36).substring(2, 8) + Date.now().toString(36).substring(4, 7);

    const link = await prisma.link.create({
      data: {
        title,
        description,
        targetUrl,
        slug,
        userId: (session.user as any).id,
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
