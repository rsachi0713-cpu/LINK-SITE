async function testLive() {
  const res = await fetch("https://link-site.rsachi0713.workers.dev/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "testlive_hyperdrive1@example.com", password: "password123", name: "Test Live" })
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body:", text);
}
testLive();
