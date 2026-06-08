import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Link as LinkIcon, PlusCircle, ExternalLink, Activity, LogOut } from "lucide-react";

import DashboardClient from "./DashboardClient";

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = "https://link-site.rsachi0713.workers.dev";
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <DashboardClient user={session.user} />;
}
