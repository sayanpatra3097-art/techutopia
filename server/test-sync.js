import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

const secret = 'techutopia_jwt_secret_key_2026_secure';
const token = jwt.sign({ id: 'test-id', email: 'shreyasroy2023@gmail.com' }, secret);

async function test() {
  const res = await fetch('http://localhost:5000/api/admin/sync-sheet', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log(res.status);
  console.log(await res.text());
}
test();
