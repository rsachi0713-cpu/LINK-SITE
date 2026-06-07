import { NextResponse } from "next/server";
import { withPrisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      const text = await req.text();
      body = JSON.parse(text);
    } catch (e: any) {
      return NextResponse.json(
        { error: "Failed to parse request JSON", details: e.message },
        { status: 400 }
      );
    }

    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if email already in use
    const existingUser = await withPrisma((db) =>
      db.user.findUnique({ where: { email } })
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await withPrisma((db) =>
      db.user.create({
        data: { email, password: hashedPassword, name },
      })
    );

    return NextResponse.json(
      { message: "User registered successfully", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
