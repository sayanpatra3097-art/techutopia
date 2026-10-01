import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
const server = app.listen(5001, async () => {
  try {
    const res = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'shreyasroy2023@gmail.com', password: 'wrong' })
    });
    const text = await res.text();
    console.log('Response:', text);
  } catch(e) {
    console.error(e);
  } finally {
    server.close();
  }
});
