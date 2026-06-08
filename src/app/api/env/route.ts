import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  let hasHyperdrive = false;
  let connectionString = null;
  try {
    const cf = (globalThis as any)[Symbol.for("__cloudflare-context__")];
    if (cf?.env?.HYPERDRIVE) {
      hasHyperdrive = true;
      connectionString = cf.env.HYPERDRIVE.connectionString || (cf.env.HYPERDRIVE as any).connectionString;
    }
  } catch (e: any) {}
  
  return NextResponse.json({
    hasHyperdrive,
    hasConnectionString: !!connectionString,
    connectionString: connectionString ? "exists" : "none"
  });
}
