export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  // Hardcode salt for edge compatibility where process.env might be flaky
  const salt = "super-secret-rekonise-clone-key-12345";
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  // If it's an old bcrypt hash, we return false as bcrypt is disabled for edge performance
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$")) {
    return false;
  }
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}
