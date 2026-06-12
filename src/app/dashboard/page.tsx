import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { signUserId } from "@/lib/signUser";
import DashboardClient from "./DashboardClient";

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = "https://link-site.rsachi0713.workers.dev";
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const sig = signUserId((session.user as any).id);

  return <DashboardClient user={session.user} signature={sig} />;
}
