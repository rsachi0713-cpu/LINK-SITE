fetch('http://localhost:3000/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'test', email: 'test6@test.com', password: 'password123' })
}).then(async r => {
  console.log(r.status);
  console.log(await r.text());
});
