const fetch = require('node-fetch');

async function run() {
  try {
    console.log("Fetching CSRF...");
    const csrfRes = await fetch('https://link-site.rsachi0713.workers.dev/api/auth/csrf');
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;
    const cookies = csrfRes.headers.raw()['set-cookie'] || [];
    let cookieString = cookies.map(c => c.split(';')[0]).join('; ');

    const email = `testmem-${Date.now()}@test.com`;
    console.log("Registering:", email);
    await fetch('https://link-site.rsachi0713.workers.dev/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email, password: 'password123' })
    });

    console.log("Logging in...");
    const loginRes = await fetch('https://link-site.rsachi0713.workers.dev/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookieString
      },
      body: new URLSearchParams({
        csrfToken,
        email,
        password: 'password123',
        json: 'true'
      }),
      redirect: 'manual'
    });

    // Extract next-auth.session-token
    const loginCookies = loginRes.headers.raw()['set-cookie'] || [];
    cookieString = loginCookies.map(c => c.split(';')[0]).join('; ');
    console.log("Got Cookie String:", cookieString.substring(0, 50) + "...");

    console.log("Fetching /dashboard/test-mem...");
    const memRes = await fetch('https://link-site.rsachi0713.workers.dev/dashboard/test-mem', {
      headers: { 'Cookie': cookieString }
    });
    
    console.log("Status:", memRes.status);
    const text = await memRes.text();
    console.log("Response:", text.substring(0, 300));
  } catch (e) {
    console.error(e);
  }
}
run();
