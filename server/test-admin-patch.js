import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'techutopia_jwt_secret_key_2026_secure';
const token = jwt.sign({ id: 'test-admin-id' }, secret);

async function test() {
  const res = await fetch('http://localhost:5000/api/admin/users/test-user-id/referral-code', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ referralCode: 'NEWCODE123' })
  });
  console.log(res.status);
  console.log(await res.text());
}
test();
