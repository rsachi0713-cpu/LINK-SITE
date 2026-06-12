import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { signUserId } from "@/lib/signUser";
import CreateClient from "./CreateClient";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const sig = signUserId((session.user as any).id);

  return <CreateClient userId={(session.user as any).id} signature={sig} />;
}
