import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function TestMemPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  try {
    const links = await prisma.link.findMany({
      where: { userId: (session.user as any).id },
      include: { steps: true },
      orderBy: { createdAt: "desc" },
    });
    
    return (
      <div style={{ color: "white", padding: "20px" }}>
        <h1>Test Mem Page</h1>
        <p>Links found: {links.length}</p>
      </div>
    );
  } catch (e: any) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h1>Error</h1>
        <p>{e.message}</p>
      </div>
    );
  }
}
