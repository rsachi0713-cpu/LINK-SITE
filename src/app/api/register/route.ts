import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

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
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const emailTrimmed = email.toLowerCase().trim();
    console.log("[REGISTER] Attempting to register:", emailTrimmed);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: emailTrimmed },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: emailTrimmed,
        password: hashedPassword,
        name: name || null,
      },
    });

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
