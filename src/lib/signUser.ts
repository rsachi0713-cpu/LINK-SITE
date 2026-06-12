import crypto from "crypto";

export function signUserId(userId: string): string {
  const secret = process.env.NEXTAUTH_SECRET || "fallback-secret";
  return crypto.createHmac("sha256", secret).update(userId).digest("hex");
}

export function verifyUserId(userId: string, signature: string): boolean {
  const expected = signUserId(userId);
  return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
}
