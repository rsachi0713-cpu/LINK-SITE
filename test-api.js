const fetch = require('node-fetch');

async function run() {
  try {
    // 1. Get CSRF token
    const csrfRes = await fetch('https://link-site.rsachi0713.workers.dev/api/auth/csrf');
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;
    const cookies = csrfRes.headers.raw()['set-cookie'] || [];
    let cookieString = cookies.map(c => c.split(';')[0]).join('; ');

    // 2. Register
    const email = `test-${Date.now()}@test.com`;
    await fetch('https://link-site.rsachi0713.workers.dev/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email, password: 'password123' })
    });

    // 3. Login
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

    const loginCookies = loginRes.headers.raw()['set-cookie'] || [];
    cookieString = loginCookies.map(c => c.split(';')[0]).join('; ');
    console.log("Cookie string:", cookieString);

    // 4. Fetch /api/links with cookie
    const linksRes = await fetch('https://link-site.rsachi0713.workers.dev/api/links', {
      headers: { 'Cookie': cookieString }
    });
    console.log("Status:", linksRes.status);
    const text = await linksRes.text();
    console.log("Response:", text.substring(0, 200));

  } catch (e) {
    console.error(e);
  }
}
run();
