import jwt from 'jsonwebtoken';

const token = "null";
try {
    jwt.verify(token, 'techutopia_jwt_secret_key_2026_secure');
} catch (e) {
    console.log(e.name, e.message);
}
