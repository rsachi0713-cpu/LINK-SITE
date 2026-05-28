import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    let text;
    let body;
    try {
      text = await req.text();
      body = JSON.parse(text);
    } catch (e: any) {
      return NextResponse.json({ error: "Failed to parse request JSON", details: e.message, rawText: text }, { status: 400 });
    }
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      });
    } catch (e: any) {
      return NextResponse.json({ error: "Database error on findUnique", details: e.message }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
    } catch (e: any) {
      return NextResponse.json({ error: "Database error on create", details: e.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "User registered successfully", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
