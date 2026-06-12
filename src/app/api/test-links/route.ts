import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      include: { steps: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, links });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
