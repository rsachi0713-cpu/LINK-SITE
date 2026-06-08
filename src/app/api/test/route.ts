import { NextResponse } from "next/server";

export async function GET() {
  throw new Error("Test error!");
  return NextResponse.json({ test: "ok" });
}
