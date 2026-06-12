const fetch = require('node-fetch');
const crypto = require('crypto');

function signUserId(userId) {
  const secret = process.env.NEXTAUTH_SECRET || "fallback-secret";
  return crypto.createHmac("sha256", secret).update(userId).digest("hex");
}

async function run() {
  try {
    const userId = "test-user-123";
    const signature = signUserId(userId);
    
    console.log("Fetching /api/links with x-user-id:", userId);
    
    const res = await fetch('https://link-site.rsachi0713.workers.dev/api/links', {
      headers: {
        'x-user-id': userId,
        'x-signature': signature
      }
    });
    
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text.substring(0, 300));
  } catch (e) {
    console.error(e);
  }
}
run();
